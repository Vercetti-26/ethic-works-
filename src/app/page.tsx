import Hero from "@/components/ui/demo";
import IntroScreen from "@/components/intro-screen";
import { TextRevealByWord } from "@/components/ui/text-reveal";
import { DisplayCardsDemo } from "@/components/ui/display-cards";
import { FeaturesDemo } from "@/components/ui/features-8";
import { TestimonialsDemo } from "@/components/ui/testimonial-v2";
import { RadialOrbitalTimelineDemo } from "@/components/ui/radial-orbital-timeline";
import HoverFooter from "@/components/ui/hover-footer";
import { MorphingTextDemo } from "@/components/ui/morphing-text";

export default function Home() {
  return (
    <main>
      <IntroScreen />
      <Hero />

      <div className="relative w-full bg-black">
        <div className="w-full max-w-5xl mx-auto px-4">
          <TextRevealByWord
            className="h-[100vh]"
            text="Find out more about our work"
          />
        </div>
      </div>

      <DisplayCardsDemo />
      <FeaturesDemo />
      <TestimonialsDemo />
      <RadialOrbitalTimelineDemo />
      <HoverFooter />
      <MorphingTextDemo />
    </main>
  );
}
