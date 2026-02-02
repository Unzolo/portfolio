"use client";

import React, { useState } from "react";
import { MessageCircle, Instagram, Linkedin, Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function Contact() {
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const response = await fetch("/api/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", message: "" });
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                throw new Error("Failed to send");
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
            setTimeout(() => setStatus("idle"), 5000);
        }
    };

    return (
        <section id="contact" className="section-container">
            <div className="glass p-6 md:p-20 rounded-[2rem] text-center">
                <h2 className="text-4xl md:text-6xl font-bold mb-4">
                    Let&apos;s <span className="text-gradient">Connect</span>
                </h2>
                <p className="text-(--text-muted) text-lg md:text-xl max-w-2xl mx-auto mb-12">
                    I&apos;m currently open to new opportunities and collaborations.
                    Feel free to reach out if you have a project in mind or just want to say hi!
                </p>

                <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 mb-16">
                    <a
                        href="https://wa.me/917994028594?text=Hi%20Muhammed,%20I%20saw%20your%20portfolio..."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-8 py-4 rounded-full bg-[#25D366] text-white font-bold hover:opacity-90 transition-opacity"
                    >
                        <MessageCircle size={20} /> Chat on WhatsApp
                    </a>

                    <div className="flex gap-4">
                        {[
                            { Icon: Linkedin, href: "https://www.linkedin.com/in/muhammed-rafeeq-259804255/" },
                            { Icon: Instagram, href: "https://instagram.com/muhammedrafeeqvr" },
                        ].map((social, i) => (
                            <a
                                key={i}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="glass w-14 h-14 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                            >
                                <social.Icon size={20} />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="max-w-2xl mx-auto">
                    <div className="glass p-8 md:p-12 rounded-3xl text-left">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest opacity-60 ml-2">Name</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="glass w-full px-6 py-4 rounded-2xl outline-none focus:border-accent transition-colors"
                                        suppressHydrationWarning
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest opacity-60 ml-2">Email</label>
                                    <input
                                        required
                                        type="email"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="glass w-full px-6 py-4 rounded-2xl outline-none focus:border-accent transition-colors"
                                        suppressHydrationWarning
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest opacity-60 ml-2">Message</label>
                                <textarea
                                    required
                                    rows={4}
                                    placeholder="Tell me about your project..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="glass w-full px-6 py-4 rounded-2xl outline-none focus:border-accent transition-colors resize-none"
                                    suppressHydrationWarning
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === "sending"}
                                className="w-full bg-accent hover:bg-opacity-90 text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-sm"
                                suppressHydrationWarning
                            >
                                {status === "sending" ? (
                                    "Sending Message..."
                                ) : status === "success" ? (
                                    <>Message Sent <CheckCircle2 size={18} /></>
                                ) : status === "error" ? (
                                    <>Error Sending <AlertCircle size={18} /></>
                                ) : (
                                    <>Send Message <Send size={18} /></>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
