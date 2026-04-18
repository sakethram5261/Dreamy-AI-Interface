import React from "react";
import { FadeIn } from "@/hooks/use-scroll-spy";
import { Send, Image as ImageIcon, Code, Mic } from "lucide-react";

export function ChatInterface() {
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
            
            {/* Ambient inner glow */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            
            <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6 scrollbar-hide">
              {/* Welcome Message */}
              <div className="flex justify-center mt-10 mb-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.2)] animate-[pulse-glow_4s_ease-in-out_infinite]">
                  <div className="w-6 h-6 rounded-full bg-primary shadow-[0_0_15px_theme(colors.primary.DEFAULT)]"></div>
                </div>
              </div>
              
              <div className="text-center max-w-md mx-auto mb-auto">
                <h3 className="text-xl font-medium mb-2">How can I help you navigate?</h3>
                <p className="text-sm text-white/50">I am ready to process text, generate images, or analyze code.</p>
              </div>

              {/* Sample Prompts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-auto mb-4">
                {[
                  "Generate a bioluminescent ocean landscape...",
                  "Analyze the performance of this React component...",
                  "Write a poem about finding light in the dark...",
                  "Explain quantum entanglement simply..."
                ].map((text, i) => (
                  <button key={i} className="text-left px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-primary/30 transition-all duration-300 text-sm text-white/80 hover:text-white">
                    {text}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 md:p-6 bg-background/50 backdrop-blur-md border-t border-white/5">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-20 rounded-2xl blur-md transition-opacity duration-500 group-hover:opacity-40"></div>
                <div className="relative flex items-center bg-background/80 border border-white/10 rounded-2xl p-2 transition-colors duration-300 group-focus-within:border-primary/50">
                  <button className="p-3 text-white/50 hover:text-white transition-colors rounded-xl hover:bg-white/10">
                    <ImageIcon className="w-5 h-5" />
                  </button>
                  <button className="p-3 text-white/50 hover:text-white transition-colors rounded-xl hover:bg-white/10">
                    <Code className="w-5 h-5" />
                  </button>
                  
                  <input 
                    type="text" 
                    placeholder="Send a message into the deep..." 
                    className="flex-1 bg-transparent border-none outline-none px-4 text-white placeholder:text-white/30 font-medium"
                  />
                  
                  <button className="p-3 bg-primary text-primary-foreground rounded-xl hover:scale-105 transition-transform hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="text-center mt-3">
                <span className="text-xs text-white/30 font-mono">Placeholder UI ready for HuggingFace integration</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
