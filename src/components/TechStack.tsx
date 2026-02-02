"use client";

import React, { useRef } from "react";
import {
    Code2,
    Cpu,
    Database,
    Globe,
    Layout,
    Settings,
    Smartphone,
    Zap,
    Figma,
    Wind,
    Terminal,
    Server,
    GitBranch,
    Infinity,
    Layers,
    Box,
    RefreshCw
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const techCategories = [
    {
        title: "Frontend",
        techs: [
            { name: "Next.js", icon: Globe, color: "#fff" },
            { name: "React", icon: Layout, color: "#61DAFB" },
            { name: "TypeScript", icon: Code2, color: "#3178C6" },
            { name: "Tailwind CSS", icon: Wind, color: "#06B6D4" },
            { name: "Redux", icon: RefreshCw, color: "#764ABC" },
            { name: "Zustand", icon: Box, color: "#855AF2" },
        ]
    },
    {
        title: "Backend",
        techs: [
            { name: "Node.js", icon: Settings, color: "#339933" },
            { name: "Express.js", icon: Server, color: "#fff" },
            { name: "Python", icon: Terminal, color: "#3776AB" },
            { name: "GraphQL", icon: Zap, color: "#E10098" },
        ]
    },
    {
        title: "Database & DevOps",
        techs: [
            { name: "PostgreSQL", icon: Database, color: "#4169E1" },
            { name: "MongoDB", icon: Layers, color: "#47A248" },
            { name: "MySQL", icon: Database, color: "#4479A1" },
            { name: "CI/CD", icon: Infinity, color: "#F05032" },
            { name: "VPS Hosting", icon: Server, color: "#0088CC" },
            { name: "Git", icon: GitBranch, color: "#F05032" },
        ]
    },
    {
        title: "Animation & Tools",
        techs: [
            { name: "GSAP", icon: Cpu, color: "#88CE02" },
            { name: "Motion", icon: Zap, color: "#0055FF" },
            { name: "Figma", icon: Figma, color: "#F24E1E" },
            { name: "Git", icon: GitBranch, color: "#F05032" },
            { name: "React Native", icon: Smartphone, color: "#61DAFB" },
        ]
    }
];

export default function TechStack() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray(".tech-card");

        // Animate all cards with the same configuration for consistency
        gsap.from(cards, {
            scrollTrigger: {
                trigger: container.current,
                start: "top 85%",
                toggleActions: "play none none none",
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "power3.out",
            clearProps: "all" // Ensures no inline styles (like opacity) remain after animation
        });
    }, { scope: container });

    return (
        <section id="tech" ref={container} className="section-container">
            <div className="text-center mb-20 animate-fade-in">
                <h2 className="text-4xl md:text-6xl font-bold mb-4">
                    Expertise & <span className="text-gradient">Toolset</span>
                </h2>
                <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
                    Leveraging modern technologies to build high-performance,
                    scalable, and visually stunning digital products.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
                {techCategories.map((category, idx) => (
                    <div key={idx} className="flex flex-col gap-6">
                        <h3 className="text-xl font-bold uppercase tracking-widest text-accent pl-3 border-l-2 border-accent">
                            {category.title}
                        </h3>
                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                            {category.techs.map((tech, techIdx) => (
                                <div
                                    key={techIdx}
                                    className="tech-card glass group relative p-3 md:p-6 flex items-center gap-3 md:gap-4 overflow-hidden border border-white/10 hover:border-accent/50 transition-colors duration-300"
                                    style={{ opacity: 1 }} // Force initial opacity to 1
                                >
                                    {/* Hover Glow */}
                                    <div
                                        className="absolute -inset-1 opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-2xl"
                                        style={{ background: tech.color }}
                                    />

                                    <div
                                        className="relative z-10 p-3 rounded-xl bg-black/5 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300"
                                        style={{ color: tech.color }}
                                    >
                                        <tech.icon className="w-5 h-5 md:w-6 md:h-6" />
                                    </div>

                                    <div className="relative z-10">
                                        <h4 className="font-semibold text-xs md:text-lg text-foreground group-hover:text-accent transition-colors">
                                            {tech.name}
                                        </h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
