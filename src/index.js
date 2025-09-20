// importing express so that vercel detect this project as function
import express from "express";
import { createHTTPServer } from "./http-server.js";
import { mcpServer } from "./mcp-server.js";

const app = createHTTPServer(mcpServer);

export default app;
