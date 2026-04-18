import React from "react";
import { FadeIn } from "@/hooks/use-scroll-spy";
import { Brain, Cpu, Network, Database } from "lucide-react";

export function Capabilities() {
  const capabilities = [
    {
      title: "Neural Language Processing",
      desc: "Context-aware generation that understands nuance, tone, and deep intent across dozens of languages.",
      icon: <Brain className="w-8 h-8 text-primary" />
    },
    {
      title: "Multimodal Synthesis",
      desc: "Seamless translation between text, image, and audio spaces. A unified architecture for all senses.",
      icon: <Network className="w-8 h-8 text-secondary" />
    },
    {
      title: "Deep Context Window",
      desc: "Retains and references vast amounts of information, holding entire codebases or books in active memory.",
      icon: <Database className="w-8 h-8 text-accent" />
    },
    {
      title: "Real-time Inference",
      desc: "Optimized tensor operations delivering millisecond response times without sacrificing output quality.",
      icon: <Cpu className="w-8 h-8 text-primary" />
    }
  ];

  return (
    <section id="capabilities" className="py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="flex flex-col items-center text-center mb-20">
            <h2 className="text-sm font-mono tracking-widest text-primary uppercase mb-4">Core Architecture</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">Cognitive Depth</h3>
            <p className="max-w-2xl text-white/60 text-lg">
              Powered by advanced neural architectures, Lumina flows through complex problems with fluid grace. 
              Designed to connect directly to HuggingFace spaces.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((cap, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="glass p-8 rounded-3xl group hover:bg-white/5 transition-colors duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 group-hover:box-glow">
                  {cap.icon}
                </div>
                
                <h4 className="text-2xl font-semibold mb-3">{cap.title}</h4>
                <p className="text-white/60 leading-relaxed">
                  {cap.desc}
                </p>
                
                <div className="mt-8 flex items-center gap-2 text-sm font-mono text-white/40 group-hover:text-primary transition-colors">
                  <span>Explore Model</span>
                  <div className="w-4 h-px bg-current group-hover:w-8 transition-all duration-300"></div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
