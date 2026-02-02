"use client";

import React from "react";

export default function Footer() {
    return (
        <footer className="py-12 px-6 border-t border-glass-border text-center text-[var(--text-muted)] text-sm">
            <div className="section-container !py-0 flex flex-col md:flex-row justify-between items-center gap-8">
                <p suppressHydrationWarning>© {new Date().getFullYear()} Muhammed Rafeeq. Designed with passion.</p>
                <p>Built with Next.js, Tailwind, GSAP & Lenis.</p>
                <div className="flex gap-8">
                    <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-foreground transition-colors">Terms</a>
                </div>
            </div>
        </footer>
    );
}
