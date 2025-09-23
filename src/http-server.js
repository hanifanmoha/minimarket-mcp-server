import { randomUUID } from "node:crypto";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express from "express";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import todosRoutes from "./todos-routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function createHTTPServer(mcpServer) {
  const app = express();
  app.use(express.json());

  const transports = {}

  // Mount todos routes
  app.use('/todos', todosRoutes);

  app.get("/", async (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
  });

  app.get("/ping", async (req, res) => {
    res.status(200).json({ status: "ok" });
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