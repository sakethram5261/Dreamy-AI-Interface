import { FadeIn } from "@/hooks/use-scroll-spy";
import { Brain, Network, BookOpen, Zap } from "lucide-react";

const capabilities = [
  {
    title: "Writes, thinks, and creates",
    desc: "Drafts, summarises, translates, explains. Whether it's a quick answer or a long essay, it keeps up with however your brain works.",
    icon: <Brain className="w-8 h-8 text-primary" />,
  },
  {
    title: "Sees and understands together",
    desc: "Text and images, code and prose — it connects the dots across formats without losing the thread.",
    icon: <Network className="w-8 h-8 text-secondary" />,
  },
  {
    title: "Remembers everything you say",
    desc: "Long context means it holds onto the whole conversation. No repeating yourself, no losing context mid-chat.",
    icon: <BookOpen className="w-8 h-8 text-accent" />,
  },
  {
    title: "Answers as fast as you think",
    desc: "Runs directly on HuggingFace's infrastructure. No middlemen, no throttling — just fast, clean responses.",
    icon: <Zap className="w-8 h-8 text-primary" />,
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="flex flex-col items-center text-center mb-20">
            <h2 className="text-sm font-mono tracking-widest text-primary/80 uppercase mb-4">What it does</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">Built for real conversations</h3>
            <p className="max-w-2xl text-white/55 text-lg">
              Not a chatbot that gives you canned answers. A real model, with real depth, running on open-source infrastructure you can trust.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((cap, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="capability-card glass p-8 rounded-3xl group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                  {cap.icon}
                </div>

                <h4 className="text-xl font-semibold mb-3">{cap.title}</h4>
                <p className="text-white/55 leading-relaxed">{cap.desc}</p>

                <div className="mt-8 flex items-center gap-2 text-sm font-mono text-white/30 group-hover:text-primary transition-colors duration-300">
                  <span>Try it yourself</span>
                  <div className="w-4 h-px bg-current group-hover:w-8 transition-all duration-300" />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
