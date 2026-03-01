"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export function SmoothScrolling({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.1,
                duration: 1.5,
            }}
        >
            {/* @ts-expect-error: React 18/19 mismatch */}
            {children}
        </ReactLenis>
    );
}
