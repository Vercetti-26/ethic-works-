"use client";

import { ArrowRight, Briefcase } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import { EtheralShadow } from "@/components/ui/etheral-shadow";

const teamAvatars = [
    {
        initials: "JD",
        src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    },
    {
        initials: "HJ",
        src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    },
    {
        initials: "PI",
        src: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop",
    },
    {
        initials: "KD",
        src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    {
        initials: "LD",
        src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    },
];

const stats = [
    { emoji: "🚀", label: "IN CLIENT REVENUE GENERATED", value: "$5M+" },
    { emoji: "📈", label: "BUSINESSES LAUNCHED", value: "200+" },
    { emoji: "💰", label: "SAVED IN OPERATIONAL COSTS", value: "$500K+" },
];

function AvatarStack() {
    return (
        <div className="flex -space-x-3">
            {teamAvatars.map((member, i) => (
                <Avatar
                    className="size-13 border-2 border-primary bg-neutral-800"
                    key={member.initials}
                    style={{ zIndex: teamAvatars.length - i }}
                >
                    <AvatarImage alt={`Team member ${i + 1}`} src={member.src} />
                    <AvatarFallback className="bg-neutral-700 text-white text-xs">
                        {member.initials}
                    </AvatarFallback>
                </Avatar>
            ))}
        </div>
    );
}

function StatsMarquee() {
    return (
        <Marquee
            className="border-white/10 border-y bg-black/30 py-2 backdrop-blur-sm [--duration:30s] [--gap:2rem]"
            pauseOnHover
            repeat={4}
        >
            {stats.map((stat) => (
                <div
                    className="flex items-center gap-3 whitespace-nowrap"
                    key={stat.label}
                >
                    <span className="font-bold font-mono text-primary text-sm tracking-wide">
                        {stat.value}
                    </span>
                    <span className="font-medium font-mono text-sm text-white/70 uppercase tracking-[0.15em]">
                        {stat.label}
                    </span>
                    <span className="text-base">{stat.emoji}</span>
                </div>
            ))}
        </Marquee>
    );
}

export default function Hero() {
    return (
        <section className="relative flex h-screen w-full flex-col items-start justify-end bg-black">
            <div className="absolute top-8 left-8 z-20 flex items-center gap-3 text-white">
                <Briefcase className="w-8 h-8 text-primary" />
                <span className="text-2xl font-bold tracking-tight">Ethic Works</span>
            </div>

            <EtheralShadow
                color="rgba(128, 128, 128, 1)"
                animation={{ scale: 100, speed: 90 }}
                noise={{ opacity: 1, scale: 1.2 }}
                sizing="fill"
            />

            <div className="relative z-10 w-full max-w-4xl px-4 text-white sm:px-8 lg:px-16">
                <div className="space-y-4">
                    <AvatarStack />
                    <StatsMarquee />
                </div>
            </div>
            <div className="relative z-10 w-full px-4 pb-16 sm:px-8 sm:pb-24 lg:px-16 lg:pb-32">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
                    <div className="w-full space-y-4 sm:w-1/2">
                        <h1 className="font-medium text-4xl text-white leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                            We <span className="text-primary">think</span>, you{" "}
                            <span className="text-primary">grow</span>
                            <br />
                            <span className="text-white">&mdash; that&apos;s the deal</span>
                        </h1>
                        <Button className="rounded-none py-0 pr-0 font-normal text-black text-lg bg-white hover:bg-white/90" asChild>
                            <a href="/pricing">
                                <span className="px-4 py-2">Get Started</span>
                                <span className="border-neutral-500 border-l p-3 h-full flex items-center bg-white/50">
                                    <ArrowRight />
                                </span>
                            </a>
                        </Button>
                    </div>
                    <div className="w-full sm:w-1/2">
                        <p className="text-base text-primary italic sm:text-right md:text-2xl">
                            We take your big ideas and turn them into clear, winning
                            strategies. From setting up your company to scaling it worldwide,
                            we&apos;re here every step of the way.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
