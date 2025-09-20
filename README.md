# MCP Minimarket Server

A Model Context Protocol (MCP) server for minimarket data with HTTP API endpoints.

## Features

- HTTP REST API endpoints for companies, brands, categories, products, and transactions
- MCP protocol support for AI assistants
- Session management for MCP connections

## API Endpoints

- `GET /ping` - Health check
- `GET /companies` - List all companies
- `GET /companies/:id` - Get company by ID
- `GET /brands` - List all brands
- `GET /brands/:id` - Get brand by ID
- `GET /categories` - List all categories
- `GET /categories/:id` - Get category by ID
- `GET /products` - List all products
- `GET /products/:id` - Get product by ID
- `GET /transactions` - List all transactions
- `GET /transactions/:id` - Get transaction by ID
- `POST /mcp` - MCP protocol endpoint

## MCP Tools

- `list_companies` - Return all companies master data
- `list_brands` - Return all brands master data
- `list_categories` - Return all product categories
- `list_products` - Return all products master data
- `list_transactions` - Return all inventory transactions

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
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
├── api/
│   └── index.js          # Vercel serverless function entry point
├── src/
│   ├── data.js          # Sample data
│   ├── http-server.js   # Express server setup
│   ├── index.js         # Local development entry point
│   └── mcp-server.js    # MCP server configuration
├── package.json
├── vercel.json          # Vercel configuration
└── README.md
```

## Testing the Deployment

Once deployed, you can test your endpoints:

```bash
# Health check
curl https://your-project-name.vercel.app/ping

# Get all products
curl https://your-project-name.vercel.app/products

# Get specific company
curl https://your-project-name.vercel.app/companies/1
```
