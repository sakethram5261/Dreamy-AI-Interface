import { FadeIn } from "@/hooks/use-scroll-spy";

const points = [
  {
    title: "Adapts to how you work",
    desc: "You don't need to learn a new way of talking. Just write naturally — it picks up your style and follows along.",
  },
  {
    title: "No waiting around",
    desc: "Responses come through cleanly, without interruption. The interface stays out of the way so you can think.",
  },
  {
    title: "Connects ideas you hadn't linked",
    desc: "Give it a loose idea and it finds the angle you were missing. Not just recall — genuine synthesis.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-32 relative z-10 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-secondary/4 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Visual — performance-safe: no backdrop-blur inside spinning containers */}
          <div className="order-2 lg:order-1">
            <FadeIn>
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Glow behind — static, no animation cost */}
                <div className="absolute inset-0 m-auto w-48 h-48 rounded-full opacity-40" style={{
                  background: "radial-gradient(circle, hsl(var(--primary)/0.6) 0%, hsl(var(--secondary)/0.4) 50%, transparent 100%)",
                  filter: "blur(40px)",
                  animation: "pulse-glow 6s ease-in-out infinite",
                }} />

                {/* Centre orb — no backdrop-blur, just a solid glassy circle */}
                <div className="absolute inset-0 m-auto w-28 h-28 rounded-full border border-white/15 z-10 flex items-center justify-center"
                  style={{ background: "radial-gradient(circle, hsl(var(--primary)/0.15) 0%, transparent 70%)", boxShadow: "0 0 30px hsl(var(--primary)/0.2)" }}>
                  <div className="w-14 h-14 rounded-full" style={{ background: "radial-gradient(circle, hsl(var(--primary)/0.3) 0%, transparent 80%)" }} />
                </div>

                {/* Orbit ring 1 */}
                <div className="absolute inset-0" style={{ animation: "spin 22s linear infinite" }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center"
                    style={{ background: "hsl(var(--primary)/0.08)" }}>
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                </div>

                {/* Orbit ring 2 */}
                <div className="absolute inset-[10%]" style={{ animation: "spin 16s linear infinite reverse" }}>
                  <div className="absolute bottom-0 right-0 w-12 h-12 rounded-full border border-secondary/25 flex items-center justify-center"
                    style={{ background: "hsl(var(--secondary)/0.08)" }}>
                    <div className="w-2.5 h-2.5 rounded-full bg-secondary" />
                  </div>
                </div>

                {/* Orbit ring 3 */}
                <div className="absolute inset-[20%]" style={{ animation: "spin 12s linear infinite" }}>
                  <div className="absolute top-0 right-0 w-8 h-8 rounded-full border border-accent/25 flex items-center justify-center"
                    style={{ background: "hsl(var(--accent)/0.08)" }}>
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Made to feel effortless.<br />
                <span className="text-white/35">Not like software.</span>
              </h2>
            </FadeIn>

            <div className="space-y-8">
              {points.map((item, i) => (
                <FadeIn key={i} delay={i * 90}>
                  <div className="flex gap-4 group">
                    <div className="mt-1 flex-shrink-0 w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-primary/15 group-hover:border-primary/40">
                      <div className="w-2 h-2 rounded-full bg-white/40 group-hover:bg-primary transition-colors duration-300" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2 text-white group-hover:text-primary transition-colors duration-300">{item.title}</h4>
                      <p className="text-white/50 leading-relaxed group-hover:text-white/65 transition-colors duration-300">{item.desc}</p>
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
