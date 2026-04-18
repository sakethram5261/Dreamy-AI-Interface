import { useState } from "react";
import { Link } from "wouter";
import { Key, CheckCircle2 } from "lucide-react";
import { HFKeyModal } from "@/components/HFKeyModal";
import { useHFKey } from "@/hooks/use-hf-key";

export function Navbar() {
  const [modalOpen, setModalOpen] = useState(false);
  const { hasKey } = useHFKey();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 backdrop-blur-md bg-background/30 border-b border-border/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center group-hover:bg-primary/40 transition-all duration-500 group-hover:scale-110">
              <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_theme(colors.primary.DEFAULT)]"></div>
            </div>
            <span className="font-bold text-xl tracking-tight text-white group-hover:text-primary transition-colors duration-300">Lumina AI</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#capabilities" className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-300">Capabilities</a>
            <a href="#interface" className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-300">Interface</a>
            <a href="#features" className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-300">Features</a>
          </nav>

          <div className="flex items-center gap-3">
            {/* HF Key Button */}
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 text-sm font-medium group"
              style={{
                borderColor: hasKey ? "rgba(34,197,94,0.4)" : "rgba(255,255,255,0.1)",
                background: hasKey ? "rgba(34,197,94,0.08)" : "rgba(255,255,255,0.04)",
                color: hasKey ? "rgb(134,239,172)" : "rgba(255,255,255,0.6)",
              }}
              data-testid="open-hf-key-modal"
            >
              {hasKey ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
              ) : (
                <Key className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">{hasKey ? "Key Active" : "HF API Key"}</span>
            </button>

            {/* Start Free button */}
            <button className="relative overflow-hidden rounded-full p-[1px] group">
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-70 group-hover:opacity-100 animate-[spin_3s_linear_infinite] transition-opacity duration-300"></span>
              <div className="relative bg-background/80 backdrop-blur-sm px-6 py-2 rounded-full flex items-center justify-center gap-2 transition-all duration-300 group-hover:bg-background/40">
                <span className="text-sm font-semibold text-white">Start Free</span>
              </div>
            </button>
          </div>
        </div>
      </header>

      <HFKeyModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
