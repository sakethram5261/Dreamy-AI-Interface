import { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";

const MODEL = "mistralai/Mistral-7B-Instruct-v0.3";
const HF_KEY = import.meta.env.VITE_HF_API_KEY as string | undefined ?? "";

const PROMPTS = [
  "Explain something complex in simple words",
  "Help me write a short, punchy bio",
  "What should I know about learning to code?",
  "Give me a creative name for my project",
];

interface Msg { role: "user" | "assistant"; content: string; }

export function Home() {
  const [screen, setScreen] = useState<"welcome" | "chat">("welcome");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, loading]);

  useEffect(() => {
    if (screen === "chat") {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [screen]);

  const send = async (text: string) => {
    const t = text.trim();
    if (!t || loading) return;

    const next: Msg[] = [...msgs, { role: "user", content: t }];
    setMsgs(next);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const history = next
        .map((m) => m.role === "user" ? `[INST] ${m.content} [/INST]` : m.content)
        .join("\n");

      const res = await fetch(`https://api-inference.huggingface.co/models/${MODEL}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: history,
          parameters: { max_new_tokens: 512, temperature: 0.7, return_full_text: false },
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        if (res.status === 503) throw new Error("Model is warming up — wait a moment and try again.");
        throw new Error((err as { error?: string }).error ?? `Something went wrong (${res.status})`);
      }

      const data = await res.json();
      const text: string = Array.isArray(data) && data[0]?.generated_text
        ? data[0].generated_text
        : typeof data?.generated_text === "string"
        ? data.generated_text
        : "No response.";

      setMsgs((prev) => [...prev, { role: "assistant", content: text.trim() }]);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
  };

  return (
    <>
      {/* Background — pure CSS, zero JS */}
      <div className="bg-scene" aria-hidden>
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
      </div>

      {/* Welcome screen */}
      {screen === "welcome" && (
        <div className="welcome-screen screen-enter">
          <div className="logo-orb">
            <div className="logo-orb-inner" />
          </div>

          <h1 className="welcome-title">Meet Lumina</h1>
          <p className="welcome-sub">
            An AI that actually gets you. Ask it anything — it writes, thinks,
            explains, and creates alongside you.
          </p>

          <button className="start-btn" onClick={() => setScreen("chat")}>
            <span>Start chatting</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}

      {/* Chat screen */}
      {screen === "chat" && (
        <div className="chat-screen screen-enter">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-orb">
              <div className="chat-header-orb-inner" />
            </div>
            <span className="chat-header-name">Lumina AI</span>
            <span className="model-tag">{MODEL}</span>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {msgs.length === 0 && !loading && (
              <div className="chat-empty">
                <p className="chat-empty-title">What's on your mind?</p>
                <p className="chat-empty-sub">Pick a starter or write your own</p>
                <div className="prompt-chips">
                  {PROMPTS.map((p, i) => (
                    <button key={i} className="prompt-chip" onClick={() => send(p)}>{p}</button>
                  ))}
                </div>
              </div>
            )}

            {msgs.map((m, i) => (
              <div key={i} className={`msg-row ${m.role}`}>
                <div className={`msg-bubble ${m.role}`}>
                  {m.role === "assistant" && (
                    <div className="msg-label">
                      <span className="msg-label-dot" />
                      Lumina
                    </div>
                  )}
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="msg-row assistant">
                <div className="typing-bubble">
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                </div>
              </div>
            )}

            {error && <div className="chat-error">{error}</div>}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="chat-input-area">
            <div className="input-wrap">
              <input
                ref={inputRef}
                type="text"
                className="chat-input"
                placeholder="Say something..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                disabled={loading}
              />
              <button
                className="send-btn"
                onClick={() => send(input)}
                disabled={!input.trim() || loading}
              >
                {loading
                  ? <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                  : <Send size={16} />
                }
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
