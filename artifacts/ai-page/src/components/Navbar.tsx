import { Link } from "wouter";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-md bg-background/30 border-b border-border/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center transition-all duration-300 group-hover:bg-primary/35 group-hover:scale-105">
            <div className="w-3 h-3 rounded-full bg-primary" style={{ boxShadow: "0 0 10px hsl(var(--primary))" }} />
          </div>
          <span className="font-bold text-xl tracking-tight text-white group-hover:text-primary transition-colors duration-300">Lumina AI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#capabilities" className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200">What it does</a>
          <a href="#interface" className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200">Try it</a>
          <a href="#features" className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200">How it works</a>
        </nav>

        <button className="relative overflow-hidden rounded-full p-[1px] group">
          <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-60 group-hover:opacity-90 transition-opacity duration-300" style={{ animation: "spin 4s linear infinite" }} />
          <div className="relative bg-background/85 backdrop-blur-sm px-6 py-2 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-background/50">
            <span className="text-sm font-semibold text-white">Get started</span>
          </div>
        </button>
      </div>
    </header>
  );
}
