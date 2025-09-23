# MCP Todos Server

A Model Context Protocol (MCP) server that provides todo management functionality with HTTP API endpoints and MCP protocol support.

## Features

- **Todo Management**: Full CRUD operations for todo items with user-based organization
- **HTTP REST API**: RESTful endpoints for all functionality
- **MCP Protocol Support**: AI assistant integration via Model Context Protocol
- **Session Management**: Persistent MCP connections with session handling

## HTTP API Endpoints

### Core Endpoints
- `GET /` - Server status and connection info
- `GET /ping` - Health check endpoint
- `POST /mcp` - MCP protocol endpoint for AI assistants
- `GET /mcp` - Server-to-client notifications via SSE
- `DELETE /mcp` - Session termination

### Todo API
- `GET /todos` - List all todos (with optional user filtering)
- `POST /todos` - Create a new todo
- `GET /todos/:id` - Get todo by ID
- `PUT /todos/:id` - Update todo by ID
- `DELETE /todos/:id` - Delete todo by ID
- `PATCH /todos/:id/complete` - Mark todo as completed
- `PATCH /todos/:id/reopen` - Mark todo as incomplete

## MCP Tools

### Todo Management Tools
- `generate_user_id` - Generate a new unique user ID for todo management
- `create_todo` - Create a new todo item with title, user_id, and completion status
- `get_todos_by_user` - Get all todos for a specific user ID
- `update_todo` - Update an existing todo's title or completion status
- `complete_todo` - Mark a specific todo as completed
- `reopen_todo` - Mark a completed todo as incomplete
- `delete_todo` - Delete a todo by ID

## Local Development

```bash
# Install dependencies
npm install

# Start development server with MCP inspector
npm run dev

# Start development server only
npm run start:dev

# Start production server
npm start
```

The development server includes the MCP Inspector for debugging MCP connections and testing tools.

## Todo Management

### Creating Todos
Todos are organized by user ID. Each todo has:
- `id`: Unique identifier (UUID)
- `title`: Todo description
- `user_id`: UUID of the user who owns the todo
- `is_complete`: Boolean completion status
- `created_at`: ISO timestamp of creation
- `updated_at`: ISO timestamp of last update

### Example Usage
```bash
# Generate a new user ID
curl -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"tools/call","params":{"name":"generate_user_id","arguments":{}},"id":1}'

# Create a todo
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn MCP protocol","user_id":"your-user-id-here"}'

# List todos for a user
curl http://localhost:3000/todos?user_id=your-user-id-here

# Complete a todo
curl -X PATCH http://localhost:3000/todos/todo-id-here/complete
```

## Deployment to Vercel

### Prerequisites

1. Install Vercel CLI: `npm install -g vercel`
2. Login to Vercel: `vercel login`

### Deploy

1. Initialize Vercel project:
   ```bash
   vercel
   ```

2. Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? Select your account/team
   - Link to existing project? **No** (for first deployment)
   - Project name: Accept default or enter custom name
   - Directory: **./** (current directory)
   - Override settings? **No**

3. Your project will be deployed and you'll get a URL like: `https://your-project-name.vercel.app`

### Environment Variables

If you need to set environment variables, you can do so in the Vercel dashboard or via CLI:

```bash
vercel env add VARIABLE_NAME
```

### Subsequent Deployments

For future deployments, simply run:

```bash
vercel --prod
```

## Project Structure

```
├── src/
│   ├── server.js           # Production server entry point
│   ├── index.js            # Main application module
│   ├── index.html          # Web interface for the server
│   ├── http-server.js      # Express server with MCP integration
│   ├── mcp-server.js       # MCP server configuration and setup
│   ├── todos-db.js         # In-memory todo database manager
│   ├── todos-routes.js     # HTTP routes for todo API
│   ├── todos-tools.js      # MCP tools for todo management
│   ├── todos.js            # Todo data models and utilities
│   └── todo-examples.js    # Example todo data
├── package.json            # Project configuration and dependencies
├── task.md                 # Development task tracking
├── test.rest              # HTTP API testing file
├── deploy.sh              # Deployment script
└── README.md              # Project documentation
```

## Testing the Server

Once running, you can test the endpoints:

```bash
# Health check
curl http://localhost:3000/ping

# Server info
curl http://localhost:3000/

# List all todos
curl http://localhost:3000/todos

# Get todos for specific user
curl "http://localhost:3000/todos?user_id=your-user-id"

# Create a new todo
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test todo","user_id":"test-user-id"}'
```

## MCP Integration

This server implements the Model Context Protocol, allowing AI assistants to:
- Manage todo items programmatically
- Maintain persistent sessions
- Use structured tools with validation

### Connecting via MCP
The server provides an HTTP transport for MCP at the `/mcp` endpoint. AI assistants can connect using the MCP HTTP transport protocol with proper session management.

## Dependencies

- **@modelcontextprotocol/sdk**: MCP protocol implementation
- **express**: Web framework for HTTP API
- **zod**: Schema validation for MCP tools
- **cors**: Cross-origin resource sharing
- **body-parser**: HTTP request parsing
- **dotenv**: Environment variable management

## Development Tools

- **nodemon**: Auto-restart during development
- **concurrently**: Run multiple processes simultaneously
- **@modelcontextprotocol/inspector**: MCP debugging interface
