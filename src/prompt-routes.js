import express from 'express';

const router = express.Router();

// POST /prompt - Send prompt to GROQ and return response
router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;

    // Validate prompt
    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: 'Prompt is required'
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

    // Prepare request body for GROQ
    const body = {
      model: "openai/gpt-oss-20b",
      messages: [
        { role: "user", content: prompt },
      ]
    };

    // Call GROQ API
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!groqRes.ok) {
      throw new Error(`GROQ API error: ${groqRes.status} ${groqRes.statusText}`);
    }

    const data = await groqRes.json();
    console.log('GROQ response:', data);

    const response = data.choices?.[0]?.message?.content || '';

    return res.json({
      success: true,
      prompt: prompt,
      response: response,
      usage: data.usage || null
    });

  } catch (error) {
    console.error('Error calling GROQ API:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
