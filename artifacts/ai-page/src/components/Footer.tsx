import React from "react";
import { Link } from "wouter";
import { FadeIn } from "@/hooks/use-scroll-spy";

export function Footer() {
  return (
    <footer className="relative z-10 pt-32 pb-10 border-t border-white/5 overflow-hidden">
      
      {/* Bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="flex flex-col items-center text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to submerge?</h2>
            <button className="relative group px-10 py-5 rounded-full overflow-hidden bg-white text-background font-bold text-lg transition-transform hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              <span className="relative z-10">Initialize Sequence</span>
              <div className="absolute inset-0 bg-primary/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            </button>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-white/5 pt-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_theme(colors.primary.DEFAULT)]"></div>
              </div>
              <span className="font-bold text-lg tracking-tight text-white group-hover:text-primary transition-colors">Lumina AI</span>
            </Link>
            <p className="text-sm text-white/40">
              Intelligence from the deep. A fluid interface for next-generation models.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Models</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Language</a></li>
              <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Vision</a></li>
              <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Audio</a></li>
              <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Code</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors">API</a></li>
              <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors">HuggingFace Space</a></li>
              <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Research</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-8 text-xs text-white/30 font-mono">
          <p>© 2025 Lumina AI Interface. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
