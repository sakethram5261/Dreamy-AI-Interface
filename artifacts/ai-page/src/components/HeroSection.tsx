import React from "react";
import { FadeIn } from "@/hooks/use-scroll-spy";
import { Bot, Sparkles, Zap, BrainCircuit, Waves, Layers } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 z-10 text-center flex flex-col items-center">
        
        <FadeIn delay={100} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md animate-[pulse-glow_4s_ease-in-out_infinite]">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-mono font-medium text-primary uppercase tracking-widest">Lumina 2.0 is now live</span>
          </div>
        </FadeIn>
        
        <FadeIn delay={200}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[1.1]">
            Intelligence that <br/>
            <span className="gradient-text italic font-serif pr-4">flows</span> with you.
          </h1>
        </FadeIn>
        
        <FadeIn delay={300} className="max-w-2xl mx-auto">
          <p className="text-lg md:text-xl text-white/60 mb-12 font-light leading-relaxed">
            Dive into a boundless ocean of knowledge. An AI experience designed to feel fluid, natural, and breathtakingly alive. Connect with HuggingFace models through an interface that breathes.
          </p>
        </FadeIn>
        
        <FadeIn delay={400} className="flex flex-col sm:flex-row items-center gap-6">
          <button className="relative group px-8 py-4 rounded-full overflow-hidden bg-primary text-primary-foreground font-semibold text-lg transition-transform hover:scale-105 hover:box-glow-strong">
            <span className="relative z-10 flex items-center gap-2">
              Dive In <Waves className="w-5 h-5" />
            </span>
            <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out skew-x-12"></div>
          </button>
          
          <button className="px-8 py-4 rounded-full font-semibold text-lg text-white border border-white/20 hover:bg-white/5 transition-all duration-300 hover:border-white/50 backdrop-blur-sm">
            View Capabilities
          </button>
        </FadeIn>

      </div>
      
      {/* Bottom fade out gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
    </section>
  );
}
