"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { Menu, X } from "lucide-react";

// Register GSAP Plugins safely
if (typeof window !== "undefined") {
    gsap.registerPlugin(CustomEase);
}

export function SterlingGateKineticNavigation() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Initial Setup & Hover Effects
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Create custom easing
        try {
            if (!gsap.parseEase("main")) {
                CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
                gsap.defaults({ ease: "main", duration: 0.7 });
            }
        } catch (e) {
            console.warn("CustomEase failed to load, falling back to default.", e);
            gsap.defaults({ ease: "power2.out", duration: 0.7 });
        }

        const ctx = gsap.context(() => {
            // Shape Hover
            const menuItems = containerRef.current!.querySelectorAll(".menu-list-item[data-shape]");
            const shapesContainer = containerRef.current!.querySelector(".ambient-background-shapes");

            menuItems.forEach((item) => {
                const shapeIndex = item.getAttribute("data-shape");
                const shape = shapesContainer ? shapesContainer.querySelector(`.bg-shape-${shapeIndex}`) : null;

                if (!shape) return;

                const shapeEls = shape.querySelectorAll(".shape-element");

                const onEnter = () => {
                    if (shapesContainer) {
                        shapesContainer.querySelectorAll(".bg-shape").forEach((s) => s.classList.remove("active"));
                    }
                    shape.classList.add("active");

                    gsap.fromTo(shapeEls,
                        { scale: 0.5, opacity: 0, rotation: -10 },
                        { scale: 1, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.08, ease: "back.out(1.7)", overwrite: "auto" }
                    );
                };

                const onLeave = () => {
                    gsap.to(shapeEls, {
                        scale: 0.8, opacity: 0, duration: 0.3, ease: "power2.in",
                        onComplete: () => shape.classList.remove("active"),
                        overwrite: "auto"
                    });
                };

                item.addEventListener("mouseenter", onEnter);
                item.addEventListener("mouseleave", onLeave);

                // @ts-expect-error: Property '_cleanup' does not exist on type 'Element'
                item._cleanup = () => {
                    item.removeEventListener("mouseenter", onEnter);
                    item.removeEventListener("mouseleave", onLeave);
                };
            });

        }, containerRef);

        return () => {
            ctx.revert();
            if (container) {
                const items = container.querySelectorAll(".menu-list-item[data-shape]");
                // @ts-expect-error: Property '_cleanup' does not exist on type 'Element'
                items.forEach((item) => item._cleanup && item._cleanup());
            }
        };
    }, []);

    // Menu Open/Close Animation Effect
    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            const navWrap = containerRef.current!.querySelector(".nav-overlay-wrapper");
            const menu = containerRef.current!.querySelector(".menu-content");
            const overlay = containerRef.current!.querySelector(".overlay");
            const bgPanels = containerRef.current!.querySelectorAll(".backdrop-layer");
            const menuLinks = containerRef.current!.querySelectorAll(".nav-link");
            const fadeTargets = containerRef.current!.querySelectorAll("[data-menu-fade]");

            const tl = gsap.timeline();

            if (isMenuOpen) {
                // OPEN
                if (navWrap) navWrap.setAttribute("data-nav", "open");

                tl.set(navWrap, { display: "block" })
                    .set(menu, { xPercent: 0 }, "<")
                    .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, "<")
                    .fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: 0.12, duration: 0.575 }, "<")
                    .fromTo(menuLinks, { yPercent: 140, rotate: 10, opacity: 0 }, { yPercent: 0, rotate: 0, opacity: 1, stagger: 0.05, duration: 0.6, ease: "power3.out" }, "<+=0.35");

                if (fadeTargets.length) {
                    tl.fromTo(fadeTargets, { autoAlpha: 0, yPercent: 50 }, { autoAlpha: 1, yPercent: 0, stagger: 0.04, clearProps: "all" }, "<+=0.2");
                }

            } else {
                // CLOSE
                if (navWrap) navWrap.setAttribute("data-nav", "closed");

                tl.to(menuLinks, { opacity: 0, yPercent: -20, duration: 0.2, stagger: 0.02 })
                    .to(bgPanels, { xPercent: 101, stagger: -0.1, duration: 0.4, ease: "power2.in" }, "<")
                    .to(overlay, { autoAlpha: 0, duration: 0.4 }, "<+=0.2")
                    .set(navWrap, { display: "none" });
            }

        }, containerRef);

        return () => ctx.revert();
    }, [isMenuOpen]);

    // keydown Escape handling
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isMenuOpen]);

    const toggleMenu = () => setIsMenuOpen(prev => !prev);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <div ref={containerRef} className="fixed top-0 right-0 z-50 pointer-events-none w-full">
            <div className="site-header-wrapper pointer-events-auto">
                <header className="header absolute top-8 right-8 z-[100]">
                    <button
                        role="button"
                        className="nav-close-btn flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full px-6 py-3 transition-colors border border-white/20"
                        onClick={toggleMenu}
                    >
                        <span className="font-medium tracking-wide uppercase text-sm">
                            {isMenuOpen ? "Close" : "Menu"}
                        </span>
                        <div className="icon-wrap w-5 h-5 flex items-center justify-center">
                            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </div>
                    </button>
                </header>
            </div>

            <section className="fullscreen-menu-container">
                <div data-nav="closed" className="nav-overlay-wrapper hidden fixed inset-0 z-40">
                    <div className="overlay absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto" onClick={closeMenu}></div>

                    <nav className="menu-content absolute top-0 right-0 w-full md:w-1/2 lg:w-[40vw] h-full bg-black pointer-events-auto overflow-hidden border-l border-white/10 shadow-2xl">
                        <div className="menu-bg absolute inset-0 z-0">
                            <div className="backdrop-layer first absolute inset-0 bg-zinc-900 translate-x-[101%]"></div>
                            <div className="backdrop-layer second absolute inset-0 bg-zinc-800 translate-x-[101%]"></div>
                            <div className="backdrop-layer absolute inset-0 bg-black translate-x-[101%]"></div>

                            {/* Abstract shapes container */}
                            <div className="ambient-background-shapes absolute inset-0 overflow-hidden opacity-50 pointer-events-none">
                                {/* Shape 1 */}
                                <svg className="bg-shape bg-shape-1 absolute inset-0 w-full h-full opacity-0 transition-opacity duration-300 [&.active]:opacity-100" viewBox="0 0 400 400" fill="none">
                                    <circle className="shape-element origin-center" cx="80" cy="120" r="40" fill="rgba(255,255,255,0.05)" />
                                    <circle className="shape-element origin-center" cx="300" cy="80" r="60" fill="rgba(255,255,255,0.08)" />
                                    <circle className="shape-element origin-center" cx="200" cy="300" r="80" fill="rgba(255,255,255,0.03)" />
                                </svg>

                                {/* Shape 2 */}
                                <svg className="bg-shape bg-shape-2 absolute inset-0 w-full h-full opacity-0 transition-opacity duration-300 [&.active]:opacity-100" viewBox="0 0 400 400" fill="none">
                                    <path className="shape-element origin-center" d="M0 200 Q100 100, 200 200 T 400 200" stroke="rgba(255,255,255,0.1)" strokeWidth="60" fill="none" />
                                    <path className="shape-element origin-center" d="M0 280 Q100 180, 200 280 T 400 280" stroke="rgba(255,255,255,0.05)" strokeWidth="40" fill="none" />
                                </svg>

                                {/* Shape 3 */}
                                <svg className="bg-shape bg-shape-3 absolute inset-0 w-full h-full opacity-0 transition-opacity duration-300 [&.active]:opacity-100" viewBox="0 0 400 400" fill="none">
                                    <circle className="shape-element origin-center" cx="150" cy="150" r="100" fill="rgba(255,255,255,0.04)" />
                                    <circle className="shape-element origin-center" cx="250" cy="250" r="80" fill="rgba(255,255,255,0.06)" />
                                </svg>

                                {/* Shape 4 */}
                                <svg className="bg-shape bg-shape-4 absolute inset-0 w-full h-full opacity-0 transition-opacity duration-300 [&.active]:opacity-100" viewBox="0 0 400 400" fill="none">
                                    <path className="shape-element origin-center" d="M100 100 Q150 50, 200 100 Q250 150, 200 200 Q150 250, 100 200 Q50 150, 100 100" fill="rgba(255,255,255,0.08)" />
                                </svg>

                                {/* Shape 5 */}
                                <svg className="bg-shape bg-shape-5 absolute inset-0 w-full h-full opacity-0 transition-opacity duration-300 [&.active]:opacity-100" viewBox="0 0 400 400" fill="none">
                                    <line className="shape-element origin-center" x1="0" y1="100" x2="300" y2="400" stroke="rgba(255,255,255,0.08)" strokeWidth="30" />
                                    <line className="shape-element origin-center" x1="100" y1="0" x2="400" y2="300" stroke="rgba(255,255,255,0.05)" strokeWidth="25" />
                                </svg>
                            </div>
                        </div>

                        <div className="menu-content-wrapper relative z-10 h-full flex items-center p-12 md:p-24">
                            <ul className="menu-list flex flex-col gap-6 w-full">
                                {['About us', 'Our work', 'Services', 'Blog', 'Contact us'].map((text, i) => (
                                    <li key={text} className="menu-list-item overflow-hidden" data-shape={i + 1}>
                                        <a href="#" className="nav-link block text-4xl md:text-6xl font-black text-white hover:text-white/70 transition-colors uppercase tracking-tight py-2 outline-none focus-visible:ring-2 focus-visible:ring-white">
                                            <p className="nav-link-text">{text}</p>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </nav>
                </div>
            </section>
        </div>
    );
}
