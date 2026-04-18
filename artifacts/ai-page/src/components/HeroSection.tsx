import { FadeIn } from "@/hooks/use-scroll-spy";
import { Sparkles, Waves } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 z-10 text-center flex flex-col items-center">

        <FadeIn delay={100} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-mono font-medium text-primary uppercase tracking-widest">Now powered by HuggingFace</span>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[1.05]">
            Intelligence that <br />
            <span className="gradient-text italic font-serif pr-4">flows</span> with you.
          </h1>
        </FadeIn>

        <FadeIn delay={300} className="max-w-2xl mx-auto">
          <p className="text-lg md:text-xl text-white/55 mb-12 font-light leading-relaxed">
            A beautiful front-end for the world's best open-source models. Just bring your HuggingFace key and start a conversation.
          </p>
        </FadeIn>

        <FadeIn delay={400} className="flex flex-col sm:flex-row items-center gap-5">
          <a href="#interface">
            <button className="relative group px-8 py-4 rounded-full overflow-hidden bg-primary text-primary-foreground font-semibold text-lg transition-transform duration-200 hover:scale-105" style={{ boxShadow: "0 0 0 0 hsl(var(--primary)/0.4)" }}>
              <span className="relative z-10 flex items-center gap-2">
                Start talking <Waves className="w-5 h-5" />
              </span>
              <div className="absolute inset-0 bg-white/15 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-out" style={{ skewX: "12deg" }} />
            </button>
          </a>
          <a href="#capabilities">
            <button className="px-8 py-4 rounded-full font-semibold text-lg text-white border border-white/20 hover:bg-white/5 transition-all duration-200 hover:border-white/40">
              See what it can do
            </button>
          </a>
        </FadeIn>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
