#!/usr/bin/env node

// MCP Server for stdio transport (internal LangChain use)
import { startStdioTransport } from './mcp-server.js';

// Start the stdio transport
startStdioTransport().catch(console.error);
