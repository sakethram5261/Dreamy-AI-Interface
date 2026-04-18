import { useState, useRef, useEffect } from "react";
import { FadeIn } from "@/hooks/use-scroll-spy";
import { Send, Image as ImageIcon, Code, Key, Loader2 } from "lucide-react";
import { useHFKey } from "@/hooks/use-hf-key";
import { HFKeyModal } from "@/components/HFKeyModal";

const DEFAULT_MODEL = "mistralai/Mistral-7B-Instruct-v0.3";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SAMPLE_PROMPTS = [
  "Generate a bioluminescent ocean landscape description...",
  "Explain quantum entanglement simply...",
  "Write a poem about finding light in the dark...",
  "What are the most powerful open-source AI models?",
];

export function ChatInterface() {
  const { hfKey, hasKey } = useHFKey();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [keyModalOpen, setKeyModalOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    if (!hasKey) {
      setKeyModalOpen(true);
      return;
    }

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
            parameters: {
              max_new_tokens: 512,
              temperature: 0.7,
              return_full_text: false,
            },
          }),
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        if (res.status === 401) throw new Error("Invalid API key. Please check your HuggingFace token.");
        if (res.status === 503) throw new Error("Model is loading, please try again in a moment.");
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
            <h2 className="text-3xl md:text-5xl font-bold mb-4">A Portal to the Deep</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Interact with state-of-the-art models in an environment designed for flow.
              The interface fades away, leaving only you and the intelligence.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="glass-panel rounded-3xl overflow-hidden flex flex-col relative border border-white/10 shadow-[0_0_50px_rgba(0,240,255,0.05)] h-[600px] max-h-[80vh]">

            {/* Top glow line */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            {/* Model badge */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-[pulse-glow_2s_ease-in-out_infinite]" />
                <span className="text-xs font-mono text-white/40">{DEFAULT_MODEL}</span>
              </div>
              {!hasKey && (
                <button
                  onClick={() => setKeyModalOpen(true)}
                  className="flex items-center gap-1.5 text-xs text-amber-400/80 hover:text-amber-400 transition-colors"
                  data-testid="set-key-prompt"
                >
                  <Key className="w-3 h-3" />
                  Set API Key to chat
                </button>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 scrollbar-hide">
              {messages.length === 0 && !loading && (
                <>
                  <div className="flex justify-center mt-8 mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.2)] animate-[pulse-glow_4s_ease-in-out_infinite]">
                      <div className="w-6 h-6 rounded-full bg-primary shadow-[0_0_15px_theme(colors.primary.DEFAULT)]" />
                    </div>
                  </div>

                  <div className="text-center max-w-md mx-auto mb-4">
                    <h3 className="text-xl font-medium mb-2">How can I help you navigate?</h3>
                    <p className="text-sm text-white/50">
                      {hasKey
                        ? "Ready to dive in. Type a message or choose a prompt below."
                        : "Add your HuggingFace API key to start chatting."}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-auto">
                    {SAMPLE_PROMPTS.map((text, i) => (
                      <button
                        key={i}
                        onClick={() => sendMessage(text)}
                        className="text-left px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-primary/30 transition-all duration-300 text-sm text-white/80 hover:text-white"
                        data-testid={`sample-prompt-${i}`}
                      >
                        {text}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  data-testid={`message-${msg.role}-${i}`}
                >
                  <div
                    className={`max-w-[80%] px-5 py-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-primary/20 border border-primary/30 text-white ml-12"
                        : "bg-white/5 border border-white/10 text-white/90 mr-12"
                    }`}
                  >
                    {msg.role === "assistant" && (
                      <div className="flex items-center gap-2 mb-2 opacity-40">
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
                  <div className="px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white/50 flex items-center gap-3 text-sm">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    <span className="font-mono">thinking in the deep...</span>
                  </div>
                </div>
              )}

              {error && (
                <div className="px-5 py-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm" data-testid="chat-error">
                  {error}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 md:p-6 bg-background/50 backdrop-blur-md border-t border-white/5">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-20 rounded-2xl blur-md transition-opacity duration-500 group-hover:opacity-40" />
                <div className="relative flex items-center bg-background/80 border border-white/10 rounded-2xl p-2 transition-colors duration-300 group-focus-within:border-primary/50">
                  <button className="p-3 text-white/50 hover:text-white transition-colors rounded-xl hover:bg-white/10" data-testid="attach-image-btn">
                    <ImageIcon className="w-5 h-5" />
                  </button>
                  <button className="p-3 text-white/50 hover:text-white transition-colors rounded-xl hover:bg-white/10" data-testid="attach-code-btn">
                    <Code className="w-5 h-5" />
                  </button>

                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={hasKey ? "Send a message into the deep..." : "Set your HF key to begin..."}
                    className="flex-1 bg-transparent border-none outline-none px-4 text-white placeholder:text-white/30 font-medium"
                    data-testid="chat-input"
                    disabled={loading}
                  />

                  <button
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim() || loading}
                    className="p-3 bg-primary text-primary-foreground rounded-xl hover:scale-105 transition-transform hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] disabled:opacity-40 disabled:scale-100 disabled:cursor-not-allowed"
                    data-testid="send-message-btn"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div className="text-center mt-3">
                <span className="text-xs text-white/20 font-mono">
                  Powered by HuggingFace Inference API · {DEFAULT_MODEL}
                </span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      <HFKeyModal isOpen={keyModalOpen} onClose={() => setKeyModalOpen(false)} />
    </section>
  );
}
