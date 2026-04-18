import React from 'react';

export function WaterBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1] bg-[#020612]">
      <div className="water-bg"></div>
      {/* Deep ocean lighting layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#040a18]/50 to-[#040a18] z-0"></div>
      
      {/* Slow moving ambient orbs */}
      <div className="orb bg-primary/20 w-[600px] h-[600px] top-[-10%] left-[-10%]" style={{ animationDelay: '0s' }}></div>
      <div className="orb bg-secondary/20 w-[500px] h-[500px] bottom-[10%] right-[-5%]" style={{ animationDelay: '-5s' }}></div>
      <div className="orb bg-accent/20 w-[700px] h-[700px] top-[40%] left-[30%]" style={{ animationDelay: '-10s' }}></div>
    </div>
  );
}

export function ParticleLayer() {
  // Static array of particles to avoid re-renders and keep count low
  const particles = Array.from({ length: 15 }).map((_, i) => {
    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const delay = Math.random() * -10;
    const duration = Math.random() * 5 + 5;
    
    return (
      <div
        key={i}
        className="particle"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${left}%`,
          top: `${top}%`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
        }}
      />
    );
  });

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
      {particles}
    </div>
  );
}
