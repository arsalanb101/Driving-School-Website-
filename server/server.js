// server/server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';

const app = express();
app.use(cors());
app.use(express.json());

// Quick health route so visiting http://localhost:3001 shows something
app.get('/', (_req, res) => {
  res.send('Driving School Chat API is running. POST /api/chat');
});

// Verify the key is present (log ONLY a boolean once at startup)
console.log('OPENAI key loaded:', !!process.env.OPENAI_API_KEY);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/chat', async (req, res) => {
  try {
    const { text, history = [] } = req.body;
    console.log("Checkpoint hit");
    const messages = [
      { role: 'system', content: 'You are Driving School Support. Be brief, friendly, and helpful.' },
      ...history.map((m) => ({
        role: m.author === 'me' ? 'user' : 'assistant',
        content: m?.data?.text ?? '',
      })),
      { role: 'user', content: text },
    ];

    // Using the Chat Completions API with the v5 OpenAI SDK you installed
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      temperature: 1,
    });

    const reply = completion.choices?.[0]?.message?.content ?? 'Sorry, I had trouble replying.';
    res.json({ reply });
  } catch (err) {
    // Log the real error to the server console
    console.error('POST /api/chat error:', err?.response?.data || err);
    res.status(500).json({ reply: 'Server error. Please try again.' });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`API listening on http://localhost:${port}`));
