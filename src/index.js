import { createHTTPServer } from "./http-server.js";
import { mcpServer } from "./mcp-server.js";

const app = createHTTPServer(mcpServer);

export default app;
