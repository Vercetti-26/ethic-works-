import PricingSection6 from "@/components/ui/pricing-section-4";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PricingPage() {
    return (
        <main className="relative">
            <Link
                href="/"
                className="absolute top-8 left-8 z-[100] flex items-center gap-2 text-white/70 hover:text-white transition-colors bg-neutral-900/50 p-2 rounded-full backdrop-blur-md border border-white/10 hover:bg-neutral-800/80"
            >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium pr-2 text-sm">Back Home</span>
            </Link>
            <PricingSection6 />
        </main>
    );
}
