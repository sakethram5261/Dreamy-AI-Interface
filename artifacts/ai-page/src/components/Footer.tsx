import { FadeIn } from "@/hooks/use-scroll-spy";

export function Footer() {
  return (
    <footer className="relative z-10 pt-24 pb-10 border-t border-white/5 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-primary/8 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="flex flex-col items-center text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">Ready to start?</h2>
            <p className="text-white/45 mb-10 text-lg max-w-md">Add your HuggingFace key, pick a model, and you're in.</p>
            <a href="#interface">
              <button className="px-10 py-4 rounded-full bg-white text-background font-bold text-lg transition-transform duration-200 hover:scale-105"
                style={{ boxShadow: "0 0 40px rgba(255,255,255,0.15)" }}>
                Open the chat
              </button>
            </a>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-white/5 pt-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <span className="font-bold text-lg tracking-tight text-white">Lumina AI</span>
            </div>
            <p className="text-sm text-white/35">
              A clean, fast interface for open-source AI models on HuggingFace.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white/80 text-sm">Models</h4>
            <ul className="space-y-2">
              {["Language", "Vision", "Audio", "Code"].map((m) => (
                <li key={m}><a href="#" className="text-sm text-white/40 hover:text-white transition-colors duration-200">{m}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white/80 text-sm">Resources</h4>
            <ul className="space-y-2">
              {["Documentation", "HuggingFace", "API reference", "Examples"].map((r) => (
                <li key={r}><a href="#" className="text-sm text-white/40 hover:text-white transition-colors duration-200">{r}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white/80 text-sm">About</h4>
            <ul className="space-y-2">
              {["Built with", "Open source", "Contact", "Status"].map((a) => (
                <li key={a}><a href="#" className="text-sm text-white/40 hover:text-white transition-colors duration-200">{a}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-8 text-xs text-white/25 font-mono">
          <p>© 2025 Lumina AI Interface</p>
          <div className="flex gap-5 mt-4 md:mt-0">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
