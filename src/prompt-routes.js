import express from 'express';
import { MultiServerMCPClient } from '@langchain/mcp-adapters';
import { ChatGroq } from '@langchain/groq';
import { createReactAgent } from '@langchain/langgraph/prebuilt';

const router = express.Router();

// POST /prompt - Send prompt to LangChain agent with MCP tools
router.post('/', async (req, res) => {
  try {
    const { prompt, user_id } = req.body;

    // Get base URL from environment
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    
    // Security: Validate referer to prevent unauthorized usage
    const referer = req.headers.referer || req.headers.origin;
    if (!referer || !referer.startsWith(baseUrl)) {
      const randomErrors = [
        'Service temporarily unavailable',
        'Invalid request format',
        'Authentication failed',
        'Rate limit exceeded',
        'Internal processing error'
      ];
      const randomError = randomErrors[Math.floor(Math.random() * randomErrors.length)];
      return res.status(403).json({
        success: false,
        error: randomError
      });
    }

    // Validate prompt
    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: 'Prompt is required'
      });
    }

    // Validate user_id - reject if empty
    if (!user_id) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      });
    }

    // Get GROQ API key from environment
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        error: 'GROQ API key not configured'
      });
    }

    // Create MCP client using stdio transport (internal, fast)
    const mcpClient = new MultiServerMCPClient({
      todos: {
        transport: 'stdio',
        command: 'node',
        args: [new URL('../src/mcp-stdio.js', import.meta.url).pathname]
      }
    });

    // Get MCP tools
    const tools = await mcpClient.getTools();
    console.log('Available MCP tools:', tools.map(t => t.name));

    // Create GROQ LLM instance
    const llm = new ChatGroq({
      apiKey: apiKey,
      model: 'openai/gpt-oss-120b', // Updated to current supported model
      temperature: 0.1
    });

    // Create LangChain agent with MCP tools
    const agent = await createReactAgent({
      llm: llm,
      tools: tools
    });

    // Add system context about the user and constraints
    const systemMessage = `You are a helpful todo management assistant. 
    The user's ID is: ${user_id}
    Important constraints:
    - Users can only have a maximum of 3 todos
    - To create new todos when at the limit, existing todos must be DELETED first (completing them doesn't free up space)
    - Always check current todos before creating new ones
    - Be helpful and informative about the todo management operations you perform`;

    // Execute the agent
    const result = await agent.invoke({
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: prompt }
      ]
    });

    // Extract the final response
    const response = result.messages[result.messages.length - 1].content;

    return res.json({
      success: true,
      prompt: prompt,
      response: response,
      user_id: user_id,
      tools_used: tools.length
    });

  } catch (error) {
    console.error('Error with LangChain MCP agent:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
