import { Router, type IRouter, type Request, type Response } from "express";
import OpenAI from "openai";

const router: IRouter = Router();

const client = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
});

interface ChatBody {
  messages?: Array<{ role: string; content: string }>;
}

router.post("/chat", async (req: Request, res: Response) => {
  const { messages } = req.body as ChatBody;

  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: "messages array is required." });
    return;
  }

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages as OpenAI.Chat.ChatCompletionMessageParam[],
      max_tokens: 512,
      temperature: 0.7,
    });

    const text = completion.choices[0]?.message?.content ?? "";
    res.json({ text: text.trim() });
  } catch (err) {
    req.log.error({ err }, "AI completion failed");
    res.status(502).json({ error: "Could not reach AI service. Please try again." });
  }
});

export default router;
