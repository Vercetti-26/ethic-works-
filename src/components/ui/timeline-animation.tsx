"use client"

import React from "react"
import { motion, useInView, Variants, HTMLMotionProps } from "framer-motion"

interface TimelineContentProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode
    animationNum: number
    timelineRef: React.RefObject<HTMLElement | null>
    customVariants?: {
        visible: (i: number) => Record<string, unknown>
        hidden: Record<string, unknown>
    }
    as?: React.ElementType
}

export const TimelineContent = React.forwardRef<HTMLElement, TimelineContentProps>(
    ({ children, animationNum, timelineRef, customVariants, as = "div", ...props }, ref) => {
        const defaultVariants: Variants = {
            hidden: { opacity: 0, y: 20 },
            visible: (i: number) => ({
                opacity: 1,
                y: 0,
                transition: {
                    delay: i * 0.1,
                    duration: 0.5,
                    ease: "easeOut",
                },
            }),
        }

        const variants = customVariants || defaultVariants
        const inView = useInView(timelineRef, { once: true, amount: 0.2 })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const MotionComponent = motion.create(as as any) as any
        return (
            <MotionComponent
                ref={ref}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                custom={animationNum}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                variants={variants as any}
                {...props}
            >
                {children}
            </MotionComponent>
        )
    }
)

TimelineContent.displayName = "TimelineContent"
