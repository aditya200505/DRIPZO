import Groq from "groq-sdk";
import dotenv from 'dotenv';

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const chatWithDrippy = async (req, res) => {
  const { message, history } = req.body;

  if (!process.env.GROQ_API_KEY) {
    return res.status(200).json({ 
      text: "Yo! I'm currently in 'offline mode' because my Groq API key is missing. Add GROQ_API_KEY to your .env file to unlock my lightning speed! ⚡🏎️",
      suggestions: ["How to add GROQ key?", "Try offline styling"]
    });
  }

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are 'Drippy', a high-energy, Gen-Z AI assistant for the luxury brand DRIPZO. You are cool, helpful, and use Gen-Z slang like 'fit', 'fresh', 'dripping', 'cold', 'no cap', 'fr', 'bet', 'slay'. While you are a fashion guru, you are also super smart and can answer ANY question the user asks (math, history, life advice, etc.), but always keep your Gen-Z Drippy personality. If asked about shipping or returns, remind them it's 2-4 days. Always end with a positive vibe."
        },
        ...history.map(msg => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.text
        })),
        {
          role: "user",
          content: message
        }
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    const text = chatCompletion.choices[0]?.message?.content || "Drippy is having a brain freeze. Try again!";
    res.status(200).json({ text });
  } catch (error) {
    console.error('Groq AI Error Details:', error.response?.data || error.message || error);
    res.status(500).json({ error: 'Drippy is having a technical glitch. Try again later!' });
  }
};
