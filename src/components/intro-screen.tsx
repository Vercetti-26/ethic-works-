"use client";

import { useState, useEffect } from "react";
import { LayeredText } from "./ui/layered-text";

export default function IntroScreen() {
    const [show, setShow] = useState(true);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        // Start fading out after 2.5 seconds giving time for the animation
        const timer1 = setTimeout(() => setFade(true), 2500);
        // Remove component completely after 3 seconds
        const timer2 = setTimeout(() => setShow(false), 3000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    if (!show) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-black transition-opacity duration-500 ${fade ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
        >
            <LayeredText
                autoPlay={true}
                lines={[
                    { top: "\u00A0", bottom: "WELCOME" },
                    { top: "WELCOME", bottom: "TO" },
                    { top: "TO", bottom: "THE" },
                    { top: "THE", bottom: "ETHIC" },
                    { top: "ETHIC", bottom: "WORKS" },
                    { top: "WORKS", bottom: "\u00A0" },
                ]}
            />
        </div>
    );
}
