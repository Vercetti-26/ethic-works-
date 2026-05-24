"use client";
import React from "react";
import { HeroSection } from "@/components/ui/hero-section";
import { RadialOrbitalTimelineDemo } from "@/components/ui/radial-orbital-timeline";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import HoverFooter from "@/components/ui/hover-footer";

export default function BlogPage() {
  return (
    <main className="bg-black min-h-screen w-full relative">
      {/* Floating Back to Home navigation element */}
      <div className="fixed top-4 left-4 sm:top-8 sm:left-8 z-[100]">
        <Link
          href="/"
          className="flex items-center gap-2 bg-black/40 hover:bg-white/10 backdrop-blur-md text-white/80 hover:text-white rounded-full px-5 py-3 transition-all border border-white/10 hover:border-white/20 select-none shadow-lg text-sm"
        >
          <ArrowLeft size={16} />
          <span className="font-medium tracking-wide">Back to Home</span>
        </Link>
      </div>

      {/* Renders the interactive custom brand Blog Hero intro banner */}
      <HeroSection />

      {/* Renders the gorgeous high-fidelity orbital timeline of blog items */}
      <div className="relative z-10">
        <RadialOrbitalTimelineDemo />
      </div>

      {/* Footer copyright segment */}
      <div className="bg-black relative z-20 pb-16">
        <HoverFooter />
      </div>
    </main>
  );
}
