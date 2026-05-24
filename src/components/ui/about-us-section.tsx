"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { GoogleGeminiEffect } from "./google-gemini-effect";
import { Shield, Eye, Compass, Zap } from "lucide-react";

export function AboutUsSection() {
  const ref = useRef<HTMLDivElement>(null);

  // Track the scroll progress of the entire container (250vh height)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Transform functions for the Gemini lines
  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.7], [0.1, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.7], [0.08, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.7], [0.05, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.7], [0.02, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.7], [0, 1.2]);

  // Header fade transitions
  const headerOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const headerScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.9]);

  // Content cards reveal transitions
  const cardsOpacity = useTransform(scrollYProgress, [0.35, 0.55, 0.95], [0, 1, 1]);
  const cardsY = useTransform(scrollYProgress, [0.35, 0.55], [100, 0]);

  const coreValues = [
    {
      icon: <Shield className="w-8 h-8 text-cyan-400" />,
      title: "Uncompromising Integrity",
      description: "We lead with absolute honesty and ethics. We build solutions that are transparent, secure, and genuinely scale our client's assets."
    },
    {
      icon: <Eye className="w-8 h-8 text-purple-400" />,
      title: "Vivid Vision",
      description: "We transform ambiguous concepts into definitive blueprints. Our designs aren't just aesthetic; they are designed for massive utility."
    },
    {
      icon: <Compass className="w-8 h-8 text-amber-400" />,
      title: "Ethical Precision",
      description: "Our systems run on surgical accuracy. We implement robust, bug-free, and high-performance applications designed to stand the test of time."
    },
    {
      icon: <Zap className="w-8 h-8 text-rose-400" />,
      title: "Unstoppable Momentum",
      description: "We optimize for continuous, seamless growth. From local operations to worldwide systems, we are with you at every stage of execution."
    }
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="relative h-[260vh] bg-black w-full overflow-clip flex flex-col justify-start items-center border-t border-neutral-900"
    >
      {/* Dynamic Gemini scroll paths overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <GoogleGeminiEffect
          pathLengths={[
            pathLengthFirst,
            pathLengthSecond,
            pathLengthThird,
            pathLengthFourth,
            pathLengthFifth,
          ]}
          className="absolute inset-0 top-1/4"
        />
      </div>

      {/* Intro Header (Visible on start of scroll) */}
      <motion.div
        style={{ opacity: headerOpacity, scale: headerScale }}
        className="sticky top-28 z-20 flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-6 h-screen select-none pointer-events-none"
      >
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400 mb-4 bg-cyan-950/40 border border-cyan-800/40 px-4 py-1.5 rounded-full backdrop-blur-md">
          Who We Are
        </span>
        <h2 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white leading-none">
          We think, <br className="md:hidden" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-rose-400">
            you grow.
          </span>
        </h2>
        <p className="mt-6 text-base md:text-xl text-neutral-400 max-w-2xl leading-relaxed">
          Ethic Works is a state-of-the-art tech incubator and design studio. We specialize in transforming complex systems into hyper-optimized, beautiful products.
        </p>
        <div className="mt-8 flex gap-4 pointer-events-auto">
          <a
            href="#values"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({
                top: window.scrollY + window.innerHeight * 1.3,
                behavior: "smooth"
              });
            }}
            className="px-6 py-3 font-medium text-black bg-white rounded-full hover:bg-neutral-200 transition-colors shadow-xl text-sm"
          >
            Read Our Core Values
          </a>
        </div>
      </motion.div>

      {/* Core Values Section (Reveals as user scrolls down further) */}
      <motion.div
        id="values"
        style={{ opacity: cardsOpacity, y: cardsY }}
        className="sticky top-12 md:top-24 z-20 w-full max-w-6xl mx-auto px-6 py-20 flex flex-col justify-center min-h-screen"
      >
        <div className="text-center md:text-left mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-purple-400 mb-2 block">
            Our Foundation
          </span>
          <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Built on Core Principles
          </h3>
          <p className="mt-4 text-neutral-400 max-w-xl text-sm md:text-base leading-relaxed">
            We operate at the intersection of stunning visuals, optimal clean code, and unwavering transparency to build products that command industry authority.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {coreValues.map((value, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col gap-4 p-6 md:p-8 bg-neutral-950/70 border border-neutral-900 rounded-2xl hover:border-neutral-800 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.02)] backdrop-blur-md overflow-hidden"
            >
              {/* Subtle accent hover indicator */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              
              <div className="p-3 bg-neutral-900/50 rounded-xl w-fit border border-neutral-800 group-hover:scale-110 transition-transform duration-300">
                {value.icon}
              </div>
              <h4 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                {value.title}
              </h4>
              <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
