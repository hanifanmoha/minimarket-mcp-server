import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { registerTodosTools } from './todos-tools.js';

const mcpServer = new McpServer({
  name: "MCP Todos Server",
  version: "0.1.0",
},{
  capabilities: {}
})

// Register todos CRUD tools
registerTodosTools(mcpServer);

export { mcpServer };