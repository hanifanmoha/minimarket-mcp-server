import { randomUUID } from "node:crypto";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express from "express";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import * as data from "./data.js";

export function createHTTPServer(mcpServer) {
  const app = express();
  app.use(express.json());

  const transports = {}

  app.get("/", async (req, res) => {
    res.status(200).send("MCP Server is running. You can connect to /mcp endpoint.");
  });

  app.get("/ping", async (req, res) => {
    res.status(200).json({ status: "ok" });
  });

  app.get("/companies", async (req, res) => {
    res.status(200).json(data.companies);
  });

  app.get("/companies/:id", async (req, res) => {
    const company = data.companies.find(c => c.id === req.params.id);
    if (company) {
      res.status(200).json(company);
    } else {
      res.status(404).json({ error: "Company not found" });
    }
  });

  app.get("/brands", async (req, res) => {
    res.status(200).json(data.brands);
  });

  // brand by id
  app.get("/brands/:id", async (req, res) => {
    const brand = data.brands.find(b => b.id === req.params.id);
    if (brand) {
      res.status(200).json(brand);
    } else {
      res.status(404).json({ error: "Brand not found" });
    }
  });

  app.get("/categories", async (req, res) => {
    res.status(200).json(data.categories);
  });

  // category by id
  app.get("/categories/:id", async (req, res) => {
    const category = data.categories.find(c => c.id === req.params.id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  });

  app.get("/products", async (req, res) => {
    res.status(200).json(data.products);
  });

  // product by id
  app.get("/products/:id", async (req, res) => {
    const product = data.products.find(p => p.id === req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  });

  app.get("/transactions", async (req, res) => {
    res.status(200).json(data.transactions);
  });

  // transaction by id
  app.get("/transactions/:id", async (req, res) => {
    const transaction = data.transactions.find(t => t.id === req.params.id);
    if (transaction) {
      res.status(200).json(transaction);
    } else {
      res.status(404).json({ error: "Transaction not found" });
    }
  });

  app.post("/mcp", async (req, res) => {

    const sessionId = req.headers['mcp-session-id']
    let transport;

    if (sessionId && transports[sessionId]) {
      console.log(`Using existing transport for session ID: ${sessionId}`);
      transport = transports[sessionId];
    } else if (!sessionId && isInitializeRequest(req.body)) {
      console.log("Creating new transport for new session");
      transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: () => randomUUID(),
        onsessioninitialized: (sessionId) => {
          transports[sessionId] = transport;
        }
      });

      transport.onclose = () => {
        if (transport.sessionId) {
          delete transports[transport.sessionId];
        }
      };

      console.log(`New session initialized with ID: ${transport.sessionId}`);
      await mcpServer.connect(transport);
    } else {
      console.log(`No valid session. Session ID provided: ${sessionId}`);
      res.status(400).json({
        jsonrpc: '2.0',
        error: {
          code: -32000,
          message: 'Bad Request: No valid session ID provided',
        },
        id: null,
      });

      return
    }

    await transport.handleRequest(req, res, req.body);

  })

  const handleSessionRequest = async (req, res) => {
    const sessionId = req.headers['mcp-session-id']
    if (!sessionId || !transports[sessionId]) {
      res.status(400).send('Invalid or missing session ID');
      return;
    }

    const transport = transports[sessionId];
    await transport.handleRequest(req, res);
  };

  // Handle GET requests for server-to-client notifications via SSE
  app.get('/mcp', handleSessionRequest);

  // Handle DELETE requests for session termination
  app.delete('/mcp', handleSessionRequest);
  
  return app
}