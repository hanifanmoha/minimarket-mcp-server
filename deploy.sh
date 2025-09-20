#!/bin/bash

echo "🚀 Deploying MCP Minimarket Server to Vercel..."

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed. Installing..."
    npm install -g vercel
fi

# Deploy to production
echo "📦 Deploying to production..."
vercel --prod

echo "✅ Deployment complete!"
echo "🌐 Your MCP server is now live on Vercel"
echo ""
echo "📋 Next steps:"
echo "  1. Test your endpoints: curl https://your-domain.vercel.app/ping"
echo "  2. Check all API endpoints are working"
echo "  3. Test MCP functionality if needed"
echo ""
echo "🔗 Useful commands:"
echo "  vercel logs         - View deployment logs"
echo "  vercel domains      - Manage custom domains"
echo "  vercel env          - Manage environment variables"
