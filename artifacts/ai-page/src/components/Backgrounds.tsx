import { useMemo } from "react";

export function WaterBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1] bg-[#020612]">
      <div className="water-bg" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#040a18]/40 to-[#040a18] z-0" />
      <div className="orb bg-primary/15 w-[500px] h-[500px] top-[-8%] left-[-8%]" style={{ animationDelay: "0s" }} />
      <div className="orb bg-secondary/15 w-[420px] h-[420px] bottom-[12%] right-[-4%]" style={{ animationDelay: "-7s" }} />
      <div className="orb bg-accent/10 w-[550px] h-[550px] top-[40%] left-[28%]" style={{ animationDelay: "-14s" }} />
    </div>
  );
}

const PARTICLES = Array.from({ length: 12 }, (_, i) => {
  const seed = i * 137.508;
  const size = (seed % 4) + 2;
  const left = (seed * 1.618) % 100;
  const top = (seed * 2.414) % 100;
  const delay = -(seed % 10);
  const duration = (seed % 5) + 6;
  return { size, left, top, delay, duration };
});

export function ParticleLayer() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="particle"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
