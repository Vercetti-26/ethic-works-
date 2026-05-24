"use client";
import React from "react";
import { AboutUsSection } from "@/components/ui/about-us-section";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { AccordionDemo } from "@/components/ui/accordion-demo";

export default function AboutPage() {
  return (
    <main className="bg-black min-h-screen w-full relative">
      {/* Floating Back to Home button for premium navigation control */}
      <div className="fixed top-4 left-4 sm:top-8 sm:left-8 z-[100]">
        <Link
          href="/"
          className="flex items-center gap-2 bg-black/40 hover:bg-white/10 backdrop-blur-md text-white/80 hover:text-white rounded-full px-5 py-3 transition-all border border-white/10 hover:border-white/20 select-none shadow-lg text-sm"
        >
          <ArrowLeft size={16} />
          <span className="font-medium tracking-wide">Back to Home</span>
        </Link>
      </div>

      {/* Renders the full scroll-driven About Us section */}
      <AboutUsSection />

      {/* Accordion FAQ Footer for the About page */}
      <div className="bg-black relative z-20 pb-16">
        <AccordionDemo />
        <div className="text-center text-xs text-neutral-600 mt-8 border-t border-neutral-900/50 pt-8 max-w-2xl mx-auto">
          &copy; {new Date().getFullYear()} Ethic Works. Built with precision and ethical aesthetics.
        </div>
      </div>
    </main>
  );
}
