import { createHTTPServer } from "./http-server.js";
import { mcpServer } from "./mcp-server.js";

const httpServer = createHTTPServer(mcpServer)

httpServer.listen(process.env.PORT || 3000, () => {
  console.log(`MCP Server is running on port ${process.env.PORT || 3000}`);
});