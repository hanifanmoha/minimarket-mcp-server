import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { companies, brands, categories, products, transactions } from './data.js';

const mcpServer = new McpServer({
  name: "MCP Minimarket Server",
  version: "0.1.0",
},{
  capabilities: {}
})

const emptySchema = {}; // no input required

mcpServer.registerTool("list_companies",
  {
    title: "List Companies",
    description: "Return all companies master data",
    inputSchema: emptySchema
  },
  async () => ({
    content: [{ type: 'text', text: JSON.stringify(companies, null, 2) }]
  })
);

mcpServer.registerTool("list_brands",
  {
    title: "List Brands",
    description: "Return all brands master data",
    inputSchema: emptySchema
  },
  async () => ({
    content: [{ type: 'text', text: JSON.stringify(brands, null, 2) }]
  })
);

mcpServer.registerTool("list_categories",
  {
    title: "List Categories",
    description: "Return all product categories",
    inputSchema: emptySchema
  },
  async () => ({
    content: [{ type: 'text', text: JSON.stringify(categories, null, 2) }]
  })
);

mcpServer.registerTool("list_products",
  {
    title: "List Products",
    description: "Return all products master data",
    inputSchema: emptySchema
  },
  async () => ({
    content: [{ type: 'text', text: JSON.stringify(products, null, 2) }]
  })
);

mcpServer.registerTool("list_transactions",
  {
    title: "List Transactions",
    description: "Return all inventory transactions",
    inputSchema: emptySchema
  },
  async () => ({
    content: [{ type: 'text', text: JSON.stringify(transactions, null, 2) }]
  })
);

export { mcpServer };