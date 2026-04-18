import type { VercelRequest, VercelResponse } from "@vercel/node";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GROQ_API_KEY is not configured." });
  }

  const { messages } = req.body as { messages?: Message[] };

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages array is required." });
  }

  const systemMessage: Message = {
    role: "system",
    content:
      "You are Lumina, a helpful, thoughtful, and articulate AI assistant. Keep your answers clear, friendly, and genuinely useful. Be concise unless depth is needed.",
  };

  try {
    const groqRes = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [systemMessage, ...messages],
        max_tokens: 1024,
        temperature: 0.7,
        stream: true,
      }),
    });

    if (!groqRes.ok) {
      const err = await groqRes.json().catch(() => ({}));
      return res
        .status(groqRes.status)
        .json({ error: (err as { error?: { message?: string } }).error?.message ?? "Groq API error" });
    }

    // Stream the response back to the client
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");

    const reader = groqRes.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      return res.status(500).json({ error: "No response body from Groq." });
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n").filter((l) => l.trim());

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6);
          if (data === "[DONE]") {
            res.write("data: [DONE]\n\n");
            continue;
          }
          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              res.write(`data: ${JSON.stringify({ text: delta })}\n\n`);
            }
          } catch {
            // skip malformed chunk
          }
        }
      }
    }

    res.end();
  } catch (err) {
    console.error("Groq error:", err);
    if (!res.headersSent) {
      res.status(502).json({ error: "Could not reach AI service. Please try again." });
    } else {
      res.end();
    }
  }
}

