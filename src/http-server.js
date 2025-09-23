import { randomUUID } from "node:crypto";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express from "express";
import cors from "cors";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import todosRoutes from "./todos-routes.js";
import promptRoutes from "./prompt-routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function createHTTPServer(mcpServer) {
  const app = express();
  app.use(express.json());

  app.use(cors({
    origin: '*', // Configure appropriately for production, for example:
    // origin: ['https://your-remote-domain.com', 'https://your-other-remote-domain.com'],
    exposedHeaders: ['Mcp-Session-Id'],
    allowedHeaders: ['Content-Type', 'mcp-session-id'],
  }));

  // Mount todos routes
  app.use('/todos', todosRoutes);

  // Mount prompt routes  
  app.use('/prompt', promptRoutes);

  app.get("/", async (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
  });

  app.get("/ping", async (req, res) => {
    res.status(200).json({ status: "ok" });
  });

  app.post("/mcp", async (req, res) => {
    console.log("Creating new transport for request (stateless)");

    try {
      const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined,
      });
      res.on('close', () => {
        console.log('Request closed');
        transport.close();
        mcpServer.close();
      });
      await mcpServer.connect(transport);
      await transport.handleRequest(req, res, req.body);
    } catch (error) {
      console.error('Error handling MCP request:', error);
      if (!res.headersSent) {
        res.status(500).json({
          jsonrpc: '2.0',
          error: {
            code: -32603,
            message: 'Internal server error',
          },
          id: null,
        });
      }
    }


    // // Always create a fresh transport for each request
    // const transport = new StreamableHTTPServerTransport({
    //   sessionIdGenerator: () => randomUUID(),
    //   onsessioninitialized: (sessionId) => {
    //     console.log(`Session initialized: ${sessionId}`);
    //   }
    // });

    // // Connect and handle request immediately
    // await mcpServer.connect(transport);
    // await transport.handleRequest(req, res, req.body);
  });

  return app
}