"use client";

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface DisplayCardProps {
    className?: string;
    icon?: React.ReactNode;
    title?: string;
    description?: string;
    date?: string;
    iconClassName?: string;
    titleClassName?: string;
}

function DisplayCard({
    className,
    icon = <Sparkles className="size-4 text-blue-300" />,
    title = "Featured",
    description = "Discover amazing content",
    date = "Just now",
    iconClassName = "text-blue-500",
    titleClassName = "text-blue-500",
}: DisplayCardProps) {
    return (
        <div
            className={cn(
                "relative flex h-36 sm:w-[22rem] w-[17rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 bg-muted/70 backdrop-blur-sm px-4 py-3 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] sm:after:w-[20rem] after:w-[15rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] hover:border-white/20 hover:bg-muted [&>*]:flex [&>*]:items-center [&>*]:gap-2",
                className
            )}
        >
            <div>
                <span className={cn("relative inline-block rounded-full bg-blue-800 p-1", iconClassName)}>
                    {icon}
                </span>
                <p className={cn("text-base sm:text-lg font-medium", titleClassName)}>{title}</p>
            </div>
            <p className="truncate text-sm sm:text-lg">{description}</p>
            <p className="text-xs sm:text-muted-foreground">{date}</p>
        </div>
    );
}

interface DisplayCardsProps {
    cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
    const defaultCards = [
        {
            className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
        },
        {
            className: "[grid-area:stack] sm:translate-x-16 translate-x-6 sm:translate-y-10 translate-y-4 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
        },
        {
            className: "[grid-area:stack] sm:translate-x-32 translate-x-12 sm:translate-y-20 translate-y-8 hover:translate-y-10",
        },
    ];

    const displayCards = cards || defaultCards;

    return (
        <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
            {displayCards.map((cardProps, index) => (
                <DisplayCard key={index} {...cardProps} />
            ))}
        </div>
    );
}

const defaultDemoCards = [
    {
        icon: <Sparkles className="size-4 text-blue-300" />,
        title: "Featured",
        description: "Discover amazing content",
        date: "Just now",
        iconClassName: "text-blue-500",
        titleClassName: "text-blue-500",
        className:
            "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
        icon: <Sparkles className="size-4 text-blue-300" />,
        title: "Popular",
        description: "Trending this week",
        date: "2 days ago",
        iconClassName: "text-blue-500",
        titleClassName: "text-blue-500",
        className:
            "[grid-area:stack] sm:translate-x-12 translate-x-4 sm:translate-y-10 translate-y-4 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
        icon: <Sparkles className="size-4 text-blue-300" />,
        title: "New",
        description: "Latest updates and features",
        date: "Today",
        iconClassName: "text-blue-500",
        titleClassName: "text-blue-500",
        className:
            "[grid-area:stack] sm:translate-x-24 translate-x-8 sm:translate-y-20 translate-y-8 hover:translate-y-10",
    },
];

export function DisplayCardsDemo() {
    return (
        <div id="work" className="flex min-h-[400px] w-full items-center justify-center py-20 bg-black">
            <div className="w-full max-w-3xl">
                <DisplayCards cards={defaultDemoCards} />
            </div>
        </div>
    );
}
