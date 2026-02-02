"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AvatarCanvas from "./AvatarCanvas";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Initial Entrance
        gsap.from(".hero-info > *", {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power4.out",
        });

        gsap.from(".hero-avatar", {
            scale: 0.8,
            opacity: 0,
            duration: 2,
            ease: "power3.out",
        });

        // SCROLL ANIMATION: Making the avatar follow the scroll with depth
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: "bottom top",
                scrub: 1.5, // Smoother follow
            }
        });

        tl.to(".hero-avatar", {
            y: 400,
            x: 100,
            rotationZ: 15,
            scale: 0.7,
            opacity: 0.3,
            filter: "blur(10px)",
        })
            .to(".hero-info", {
                y: 200,
                opacity: 0,
                scale: 0.9,
            }, 0);

    }, { scope: container });

    return (
        <section
            id="about"
            ref={container}
            className="section-container relative flex flex-col lg:flex-row items-center justify-between gap-8 pt-32 lg:pt-40 lg:min-h-[80vh]"
        >
            <div className="hero-info flex-1 z-10">
                <div className="flex items-center gap-3 mb-8">
                    <span className="w-12 h-px bg-accent"></span>
                    <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold font-outfit">
                        Available for New Projects
                    </span>
                </div>

                <h1 className="text-[clamp(2.5rem,6vw,4rem)] mb-8 font-black leading-none tracking-tighter">
                    Hi, I am <br />
                    <span className="text-gradient">Muhammed Rafeeq</span>
                </h1>

                <div className="max-w-xl">
                    <p className="text-foreground/70 text-base md:text-lg mb-8 leading-relaxed">
                        A Full Stack Developer obsessed with crafting
                        cutting-edge web experiences. I blend technical excellence with award-winning
                        design to build products that scale and delight.
                    </p>

                    <div className="grid grid-cols-2 gap-8 mb-8 border-l border-white/10 pl-8">
                        <div>
                            <h4 className="text-2xl font-black text-foreground mb-1">20+</h4>
                            <p className="text-foreground/50 text-[10px] uppercase tracking-widest font-bold">Projects Completed</p>
                        </div>
                        <div>
                            <h4 className="text-2xl font-black text-foreground mb-1">3+</h4>
                            <p className="text-foreground/50 text-[10px] uppercase tracking-widest font-bold">Years Experience</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-6 items-center">
                        <a
                            href="#contact"
                            className="group relative px-12 py-5 bg-foreground text-background font-black uppercase tracking-widest text-xs rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl shadow-accent/10"
                        >
                            <span className="relative z-10 underline decoration-2 decoration-accent underline-offset-4">Let&apos;s Talk</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* 3D Avatar Section - Only on Desktop */}
            <div className="hero-avatar hidden lg:block flex-1 w-full h-[450px] relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/5 blur-[100px] -z-10 animate-pulse" />
                <AvatarCanvas />

                <div className="absolute bottom-10 right-10 glass p-6 hidden md:block animate-bounce shadow-2xl">
                    <p className="text-[10px] text-accent font-bold uppercase tracking-widest mb-1">Current Focus</p>
                    <p className="text-sm font-bold">Full Stack & AI Architect</p>
                </div>
            </div>
        </section>
    );
}
