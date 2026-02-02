"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [activeSection, setActiveSection] = useState("about");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        // Initial reveal animation
        gsap.from(navRef.current, {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
            delay: 0.5,
        });

        // Observer to update active section on scroll
        const sections = ["about", "tech", "experience", "projects", "contact"];
        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -70% 0px",
            threshold: 0,
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    // Animate mobile menu
    useEffect(() => {
        if (isMenuOpen) {
            gsap.to(menuRef.current, {
                clipPath: "circle(150% at 90% 10%)",
                duration: 0.8,
                ease: "power4.inOut",
            });
            gsap.fromTo(".mobile-link",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.3 }
            );
        } else {
            gsap.to(menuRef.current, {
                clipPath: "circle(0% at 90% 10%)",
                duration: 0.6,
                ease: "power4.inOut",
            });
        }
    }, [isMenuOpen]);

    const navLinks = [
        { name: "About", href: "#about", id: "about" },
        { name: "Tech", href: "#tech", id: "tech" },
        { name: "Experience", href: "#experience", id: "experience" },
        { name: "Projects", href: "#projects", id: "projects" },
        { name: "Contact", href: "#contact", id: "contact" },
    ];

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsMenuOpen(false);
        const targetId = href.replace("#", "");
        const elem = document.getElementById(targetId);
        if (elem) {
            elem.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <nav
                ref={navRef}
                className="fixed top-2 md:top-10 left-0 right-0 z-[1000] flex justify-center px-6"
            >
                <div className="glass flex items-center justify-between w-full max-w-5xl px-6 md:px-10 py-3 md:py-5">
                    {/* Modern Typewriter Logo */}
                    <a
                        href="#about"
                        onClick={(e) => handleScroll(e, "#about")}
                        onMouseEnter={(e) => {
                            const extra = e.currentTarget.querySelectorAll('.logo-char');
                            gsap.to(extra, {
                                opacity: 1,
                                display: 'inline-block',
                                stagger: 0.04,
                                duration: 0.1,
                                ease: "none"
                            });
                        }}
                        onMouseLeave={(e) => {
                            const extra = e.currentTarget.querySelectorAll('.logo-char');
                            gsap.to(extra, {
                                opacity: 0,
                                display: 'none',
                                duration: 0.1,
                                ease: "none"
                            });
                        }}
                        className="flex items-center group cursor-pointer"
                    >
                        <div className="flex items-center text-xl font-black tracking-tighter">
                            <span>M</span>
                            <span className="text-accent flex">
                                {"uhammed".split("").map((c, i) => (
                                    <span key={i} className="logo-char hidden opacity-0">{c}</span>
                                ))}
                            </span>
                            <span className="ml-1">R</span>
                            <span className="text-accent flex">
                                {"afeeq".split("").map((c, i) => (
                                    <span key={i} className="logo-char hidden opacity-0">{c}</span>
                                ))}
                            </span>
                            <span className="text-accent">.</span>
                        </div>
                    </a>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-10">
                        <ul className="flex items-center gap-10">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => handleScroll(e, link.href)}
                                        className={`text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:text-accent ${activeSection === link.id ? "text-accent" : "text-foreground/60"}`}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <ThemeToggle />
                    </div>

                    {/* Mobile Controls */}
                    <div className="flex md:hidden items-center gap-4">
                        <ThemeToggle />
                        <button
                            className="w-10 h-10 flex items-center justify-center glass rounded-full"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Fullscreen Menu */}
            <div
                ref={menuRef}
                style={{ clipPath: "circle(0% at 90% 10%)" }}
                className="fixed inset-0 z-[999] bg-background flex flex-col items-center justify-center md:hidden"
            >
                <div className="absolute top-0 left-0 w-full h-full bg-accent/5 blur-[120px] rounded-full translate-y-1/2 -z-10" />

                <ul className="flex flex-col items-center gap-8">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <a
                                href={link.href}
                                onClick={(e) => handleScroll(e, link.href)}
                                className="mobile-link text-4xl font-black tracking-tighter hover:text-accent transition-colors"
                            >
                                {link.name}<span className="text-accent">.</span>
                            </a>
                        </li>
                    ))}
                </ul>

                
            </div>
        </>
    );
}
