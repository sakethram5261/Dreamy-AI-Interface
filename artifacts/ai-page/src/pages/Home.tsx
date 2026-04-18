import React from "react";
import { WaterBackground, ParticleLayer } from "@/components/Backgrounds";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { Capabilities } from "@/components/Capabilities";
import { ChatInterface } from "@/components/ChatInterface";
import { Features } from "@/components/Features";
import { Showcase } from "@/components/Showcase";
import { Footer } from "@/components/Footer";

export function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/30 selection:text-white">
      {/* Absolute base layers */}
      <WaterBackground />
      <ParticleLayer />
      
      {/* Content Layers */}
      <Navbar />
      <HeroSection />
      <Capabilities />
      <ChatInterface />
      <Features />
      <Showcase />
      <Footer />
    </main>
  );
}
