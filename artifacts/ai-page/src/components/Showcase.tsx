import { FadeIn } from "@/hooks/use-scroll-spy";

const tiles = [
  { label: "Write anything", size: "col-span-1 row-span-1 md:col-span-2 md:row-span-2" },
  { label: "Understand images", size: "col-span-1 row-span-1" },
  { label: "Help with code", size: "col-span-1 row-span-1" },
  { label: "Generate ideas", size: "col-span-1 row-span-1 md:col-span-2" },
];

const gradients = [
  "radial-gradient(ellipse at center, hsl(var(--primary)/0.25) 0%, transparent 65%)",
  "linear-gradient(135deg, hsl(var(--secondary)/0.18) 0%, transparent 70%)",
  "linear-gradient(225deg, hsl(var(--accent)/0.22) 0%, transparent 70%)",
  "conic-gradient(from 200deg at 70% 70%, hsl(var(--primary)/0.15), hsl(var(--secondary)/0.1), transparent)",
];

export function Showcase() {
  return (
    <section className="py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-4">See what's possible</h2>
            <p className="text-white/50 max-w-xl">
              A few of the things people use this for. The model doesn't limit itself to any one type of task.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-[680px] md:h-[540px]">
          {tiles.map((item, i) => (
            <FadeIn key={i} delay={i * 80} className={`${item.size} h-full`}>
              <div className="w-full h-full rounded-3xl glass border border-white/8 relative overflow-hidden group cursor-default">
                <div className="absolute inset-0 z-10 transition-transform duration-500 group-hover:scale-[1.03]"
                  style={{ background: gradients[i], opacity: 0.7 }} />

                <div className="absolute inset-0 z-20 flex items-end p-6">
                  <p className="text-lg font-semibold text-white/70 group-hover:text-white transition-colors duration-300">{item.label}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
