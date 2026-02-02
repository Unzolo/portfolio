"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
    {
        role: "Frontend Developer",
        company: "The Marble Jar",
        period: "2024 Oct - Present",
        desc: "Leading the development of scalable cloud architectures and mentoring junior developers. Implemented micro-frontend architecture which increased deployment speed by 40%.",
    },
    {
        role: "Full Stack Developer",
        company: "Identitie Enrichment Pvt Ltd",
        period: "2024 Apr - 2024 Oct",
        desc: "Built highly interactive user interfaces using React and GSAP. Focused on performance optimization and accessibility.",
    },
    {
        role: "Web Developer",
        company: "Freelance",
        period: "2023 Jun - 2024 Mar",
        desc: "Assisted in the development of various client projects using HTML, CSS, and JavaScript. Gained experience in responsive design and Git workflows.",
    },
];

export default function Experience() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const items = gsap.utils.toArray(".exp-item");

        items.forEach((item: any) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
                opacity: 0,
                x: -50,
                duration: 1,
                ease: "power3.out",
                clearProps: "all"
            });
        });
    }, { scope: container });

    return (
        <section id="experience" ref={container} className="section-container">
            <h2 className="text-4xl md:text-5xl mb-16">
                Work <span className="text-gradient">Experience</span>
            </h2>

            <div className="relative pl-8 md:pl-12">
                {/* Vertical Line */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-linear-to-b from-accent via-accent-secondary to-transparent" />

                {experiences.map((exp, index) => (
                    <div
                        key={index}
                        className="exp-item mb-16 relative"
                    >
                        {/* Dot on line */}
                        <div className="absolute -left-[2.35rem] md:-left-[3.35rem] top-2 w-3 h-3 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />

                        <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                            <div>
                                <h3 className="text-2xl font-bold">{exp.role}</h3>
                                <p className="text-accent font-medium text-lg">{exp.company}</p>
                            </div>
                            <span className="glass px-4 py-2 text-sm text-(--text-muted)">
                                {exp.period}
                            </span>
                        </div>

                        <p className="text-(--text-muted) max-w-3xl text-lg leading-relaxed">
                            {exp.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
