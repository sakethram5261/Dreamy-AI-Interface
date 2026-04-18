import React from "react";
import { FadeIn } from "@/hooks/use-scroll-spy";

export function Features() {
  return (
    <section id="features" className="py-32 relative z-10 overflow-hidden">
      
      {/* Background ambient glow specific to this section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1">
            <FadeIn>
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Central Orb */}
                <div className="absolute inset-0 m-auto w-48 h-48 rounded-full bg-gradient-to-br from-primary via-secondary to-accent blur-xl animate-[pulse-glow_6s_ease-in-out_infinite] opacity-50"></div>
                <div className="absolute inset-0 m-auto w-32 h-32 rounded-full glass flex items-center justify-center border border-white/20 z-10 box-glow">
                  <div className="w-16 h-16 rounded-full bg-white/10 blur-sm"></div>
                </div>

                {/* Orbiting elements */}
                <div className="absolute inset-0 animate-[spin_20s_linear_infinite]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 glass rounded-full flex items-center justify-center border-primary/50 shadow-[0_0_15px_theme(colors.primary.DEFAULT)]">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                </div>
                
                <div className="absolute inset-0 animate-[spin_15s_linear_infinite_reverse]">
                  <div className="absolute bottom-10 right-10 w-16 h-16 glass rounded-full flex items-center justify-center border-secondary/50 shadow-[0_0_15px_theme(colors.secondary.DEFAULT)]">
                    <div className="w-3 h-3 rounded-full bg-secondary"></div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="order-1 lg:order-2">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Fluid Intelligence. <br/><span className="text-white/40">Zero friction.</span></h2>
            </FadeIn>

            <div className="space-y-8">
              {[
                { title: "Adaptive Interfaces", desc: "The UI shapes itself around your intent. Tools appear exactly when you need them, then dissolve back into the deep." },
                { title: "Continuous Flow", desc: "No loading spinners. No jarring state changes. Every interaction resolves with liquid smoothness." },
                { title: "Deep Synthesis", desc: "Connect disparate ideas. The model finds currents between seemingly unrelated concepts to generate novel solutions." }
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 100}>
                  <div className="flex gap-4 group">
                    <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 transition-colors duration-300">
                      <div className="w-2 h-2 rounded-full bg-white/40 group-hover:bg-primary transition-colors"></div>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2 text-white group-hover:text-primary transition-colors">{item.title}</h4>
                      <p className="text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">{item.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
