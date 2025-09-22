import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { registerTodosTools } from './todos-tools.js';
import { registerMinimarketTools } from './minimarket-tools.js';

const mcpServer = new McpServer({
  name: "MCP Minimarket Server",
  version: "0.1.0",
},{
  capabilities: {}
})

// Register minimarket tools
// registerMinimarketTools(mcpServer);

// Register todos CRUD tools
registerTodosTools(mcpServer);

export { mcpServer };