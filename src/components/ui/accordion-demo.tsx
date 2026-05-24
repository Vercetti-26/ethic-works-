"use client";
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

const items = [
  {
    id: "1",
    title: "What makes Ethic Works different?",
    content:
      "Ethic Works merges award-winning designs with high-fidelity, production-grade engineering. We build fast, beautiful, and accessible web experiences from design to deployment.",
  },
  {
    id: "2",
    title: "How do you handle custom system development?",
    content:
      "We build tailored solutions utilizing cutting-edge technologies like React, Next.js, and Framer Motion. We enforce architectural precision, surgical code quality, and rich, responsive aesthetics.",
  },
  {
    id: "3",
    title: "Are your platforms optimized for speed and scale?",
    content:
      "Yes, absolutely. By leveraging modern static rendering, dynamic caching, and lightweight layouts, we build extremely lightweight pages that offer sub-second load times globally.",
  },
  {
    id: "4",
    title: "How secure and accessible are your creations?",
    content:
      "All systems conform to industry-standard accessibility parameters (WAI-ARIA compliance) and are fortified with highly secure API routes and deployment practices.",
  },
];

export function AccordionDemo() {
  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-16 md:py-24 border-t border-neutral-900 bg-black text-white relative z-20">
      <div className="text-center mb-12">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#3ca2fa] mb-2 block">
          Frequently Asked Questions
        </span>
        <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
          Common Questions
        </h3>
        <p className="mt-4 text-neutral-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          Here is a quick look at how we build and scale platforms with surgical precision.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Accordion type="single" collapsible className="w-full space-y-4" defaultValue="1">
          {items.map((item) => (
            <AccordionItem
              value={item.id}
              key={item.id}
              className="border border-neutral-800 bg-neutral-950/40 rounded-xl px-5 py-2 transition-colors hover:border-neutral-700"
            >
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-3 text-left text-base font-semibold leading-7 transition-all [&>svg]:text-[#3ca2fa] [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&>svg]:-order-1 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0 [&[data-state=open]>svg]:rotate-180 gap-4">
                  {item.title}
                  <Plus
                    size={16}
                    strokeWidth={2}
                    className="shrink-0 opacity-80 transition-transform duration-200"
                    aria-hidden="true"
                  />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="pb-3 pt-2 text-sm text-neutral-400 leading-relaxed border-t border-neutral-900/50 mt-2">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
