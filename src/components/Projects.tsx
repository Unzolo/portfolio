"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: "Unzolo",
        category: "Travel Community Platform",
        image: "/images/unzolo-app.png",
        description: "A comprehensive travel community application building bridges between travelers. Users can discover nearby trips, list their own camping events, and join global adventures while connecting with like-minded explorers.",
        tags: ["PostgreSQL", "Express", "React", "Node.js"],
        github: "",
        demo: "https://unzolo.com"
    },
    {
        title: "Unzolo CRM",
        category: "Travel Operations Suite",
        image: "/images/unzolo-crm.png",
        description: "A powerful CRM designed specifically for travel operators to streamline their workflow, manage large-scale bookings, and maintain customer relationships with specialized travel-tech features.",
        tags: ["Next.js", "PostgreSQL", "Node.js", "Tailwind"],
        github: "",
        demo: "https://crmportal.unzolo.com"
    },
    {
        title: "Identitie Landing Page",
        category: "Creative Marketing Page",
        image: "/images/identitie-landing.png",
        description: "A high-end landing page built for Identitie, featuring sophisticated GSAP animations, smooth parallax effects, and a premium visual aesthetic to showcase their brand mission.",
        tags: ["Next.js", "GSAP", "Tailwind CSS"],
        github: "",
        demo: "https://identitie.in"
    },
];

const ProjectImage = ({ src, title }: { src: string, title: string }) => {
    const [hasError, setHasError] = React.useState(false);

    if (hasError || !src) {
        return (
            <div className="w-full aspect-[16/10] flex items-center justify-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl group-hover:border-accent/30 transition-colors duration-500">
                <div className="text-center p-8">
                    <div className="w-16 h-1 w-full bg-accent/20 mx-auto mb-6 rounded-full overflow-hidden">
                        <div className="h-full bg-accent w-1/3 animate-[slide_2s_infinite]" />
                    </div>
                    <h3 className="text-3xl font-black opacity-20 uppercase tracking-tighter mb-2 select-none group-hover:opacity-40 transition-opacity">
                        {title}
                    </h3>
                    <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent/50 group-hover:text-accent transition-colors">
                        Snapshot Pending
                    </p>
                </div>
            </div>
        );
    }

    return (
        <Image
            src={src}
            alt={title}
            width={800}
            height={500}
            className="w-full h-auto block transition-transform duration-700 group-hover:scale-110"
            onError={() => setHasError(true)}
        />
    );
};

export default function Projects() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray(".project-card");

        cards.forEach((card: any, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                delay: index * 0.1,
                ease: "power2.out",
                clearProps: "all"
            });
        });
    }, { scope: container });

    return (
        <section id="projects" ref={container} className="section-container">
            <h2 className="text-4xl md:text-5xl mb-16 text-right">
                Selected <span className="text-gradient">Experience</span>
            </h2>

            <div className="flex flex-col gap-24 md:gap-32">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className={`project-card flex flex-col gap-10 items-center ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                            }`}
                    >
                        <div className="flex-1 w-full relative rounded-2xl overflow-hidden glass group cursor-help">
                            <ProjectImage src={project.image} title={project.title} />

                            {/* Overlay for aesthetic depth */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </div>

                        <div className="flex-1 w-full">
                            <p className="text-accent font-semibold uppercase tracking-widest text-xs mb-2">
                                {project.category}
                            </p>
                            <h3 className="text-3xl md:text-4xl font-bold mb-6">{project.title}</h3>
                            <p className="text-(--text-muted) text-lg mb-8 leading-relaxed">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-3 mb-8">
                                {project.tags.map(tag => (
                                    <span key={tag} className="glass px-4 py-1 text-xs">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-8">
                                {project.github && (
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-semibold hover:text-accent transition-colors">
                                        <Github size={20} /> Code
                                    </a>
                                )}
                                {project.demo && (
                                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-semibold hover:text-accent transition-colors">
                                        <ExternalLink size={20} /> Live Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
