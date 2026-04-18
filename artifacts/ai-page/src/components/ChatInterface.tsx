import { useState, useRef, useEffect } from "react";
import { FadeIn } from "@/hooks/use-scroll-spy";
import { Send, Image as ImageIcon, Code, Loader2, AlertCircle } from "lucide-react";
import { useHFKey } from "@/hooks/use-hf-key";

const DEFAULT_MODEL = "mistralai/Mistral-7B-Instruct-v0.3";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SAMPLE_PROMPTS = [
  "Explain what makes a great poem in plain language...",
  "What would you tell someone starting to learn to code?",
  "Describe how the ocean works like I'm ten years old...",
  "Help me brainstorm names for a creative project...",
];

export function ChatInterface() {
  const { hfKey, hasKey } = useHFKey();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading || !hasKey) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const history = [...messages, userMsg]
        .map((m) => (m.role === "user" ? `[INST] ${m.content} [/INST]` : m.content))
        .join("\n");

      const res = await fetch(
        `https://api-inference.huggingface.co/models/${DEFAULT_MODEL}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${hfKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: history,
            parameters: { max_new_tokens: 512, temperature: 0.7, return_full_text: false },
          }),
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        if (res.status === 401) throw new Error("API key is invalid. Check your VITE_HF_API_KEY secret.");
        if (res.status === 503) throw new Error("Model is warming up — try again in a moment.");
        throw new Error((err as { error?: string }).error ?? `Error ${res.status}`);
      }

      const data = await res.json();
      const generated: string =
        Array.isArray(data) && data[0]?.generated_text
          ? data[0].generated_text
          : typeof data?.generated_text === "string"
          ? data.generated_text
          : "No response received.";

      setMessages((prev) => [...prev, { role: "assistant", content: generated.trim() }]);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <section id="interface" className="py-32 relative">
      <div className="max-w-5xl mx-auto px-6">

        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Talk to the model</h2>
            <p className="text-white/55 text-lg max-w-2xl mx-auto">
              Ask it anything. It doesn't need fancy prompts — just talk to it like a person.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={180}>
          <div className="glass-panel rounded-3xl overflow-hidden flex flex-col relative border border-white/8 shadow-[0_0_60px_rgba(0,240,255,0.04)] h-[580px] max-h-[80vh]">

            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            {/* Model info bar */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-white/[0.015]">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" style={{ animation: "pulse-glow 2.5s ease-in-out infinite" }} />
                <span className="text-xs font-mono text-white/35">{DEFAULT_MODEL}</span>
              </div>
              {!hasKey && (
                <span className="text-xs text-amber-400/70 flex items-center gap-1.5">
                  <AlertCircle className="w-3 h-3" />
                  Set VITE_HF_API_KEY in Secrets to enable chat
                </span>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 scrollbar-hide">
              {messages.length === 0 && !loading && (
                <>
                  <div className="flex justify-center mt-8 mb-5">
                    <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center"
                      style={{ animation: "pulse-glow 4s ease-in-out infinite", boxShadow: "0 0 25px hsl(var(--primary)/0.15)" }}>
                      <div className="w-5 h-5 rounded-full bg-primary" style={{ boxShadow: "0 0 12px hsl(var(--primary))" }} />
                    </div>
                  </div>

                  <div className="text-center max-w-sm mx-auto mb-4">
                    <h3 className="text-xl font-medium mb-2">What's on your mind?</h3>
                    <p className="text-sm text-white/45">
                      {hasKey ? "Pick a prompt below or write your own." : "The model is ready — just needs your API key to start."}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-auto">
                    {SAMPLE_PROMPTS.map((text, i) => (
                      <button
                        key={i}
                        onClick={() => sendMessage(text)}
                        disabled={!hasKey}
                        className="text-left px-4 py-3 rounded-2xl bg-white/4 hover:bg-white/8 border border-white/5 hover:border-primary/25 transition-all duration-250 text-sm text-white/70 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
                        data-testid={`sample-prompt-${i}`}
                      >
                        {text}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  data-testid={`message-${msg.role}-${i}`}>
                  <div className={`max-w-[80%] px-5 py-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-primary/18 border border-primary/25 text-white ml-12"
                      : "bg-white/4 border border-white/8 text-white/88 mr-12"
                  }`}>
                    {msg.role === "assistant" && (
                      <div className="flex items-center gap-2 mb-2 opacity-35">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-xs font-mono">Lumina</span>
                      </div>
                    )}
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="px-5 py-3.5 rounded-2xl bg-white/4 border border-white/8 text-white/45 flex items-center gap-3 text-sm">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    <span className="font-mono">thinking...</span>
                  </div>
                </div>
              )}

              {error && (
                <div className="px-5 py-3.5 rounded-2xl bg-red-500/8 border border-red-500/18 text-red-300 text-sm" data-testid="chat-error">
                  {error}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 md:p-5 bg-background/45 border-t border-white/5">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-secondary/15 to-accent/15 rounded-2xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-400" />
                <div className="relative flex items-center bg-background/75 border border-white/8 rounded-2xl p-2 group-focus-within:border-primary/40 transition-colors duration-300">
                  <button className="p-3 text-white/35 hover:text-white/70 transition-colors rounded-xl hover:bg-white/8" data-testid="attach-image-btn">
                    <ImageIcon className="w-4 h-4" />
                  </button>
                  <button className="p-3 text-white/35 hover:text-white/70 transition-colors rounded-xl hover:bg-white/8" data-testid="attach-code-btn">
                    <Code className="w-4 h-4" />
                  </button>

                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={hasKey ? "Say something..." : "API key not configured"}
                    className="flex-1 bg-transparent border-none outline-none px-4 text-white placeholder:text-white/25 font-medium text-sm"
                    data-testid="chat-input"
                    disabled={loading || !hasKey}
                  />

                  <button
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim() || loading || !hasKey}
                    className="p-3 bg-primary text-primary-foreground rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-35 disabled:scale-100 disabled:cursor-not-allowed"
                    style={{ boxShadow: input.trim() && hasKey ? "0 0 18px hsl(var(--primary)/0.35)" : "none" }}
                    data-testid="send-message-btn"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <p className="text-center mt-2.5 text-xs text-white/18 font-mono">
                {DEFAULT_MODEL} · HuggingFace Inference API
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
