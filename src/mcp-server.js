import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerTodosTools } from './todos-tools.js';

const mcpServer = new McpServer({
  name: "MCP Todos Server",
  version: "0.1.0",
},{
  capabilities: {}
})

// Register todos CRUD tools
registerTodosTools(mcpServer);

// Function to start stdio transport (for internal use)
export async function startStdioTransport() {
  const transport = new StdioServerTransport();
  await mcpServer.connect(transport);
  console.error("MCP server started on stdio transport");
}

export { mcpServer };