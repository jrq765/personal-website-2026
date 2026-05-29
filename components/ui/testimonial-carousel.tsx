"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Testimonial {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  linkedinUrl?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "JR Quint",
    title: "Creative & Brand Strategy",
    description:
      "Brands don't win because of their product. They win because of their story. I've built one from scratch, raised funding to back it, and spent the first half of this year at THE·TEAM doing the research and analysis that helps brands figure out where they actually stand and where they should go next.",
    imageUrl: "/headshot.jpg",
    linkedinUrl: "https://www.linkedin.com/in/jrquint/",
  },
];

export interface TestimonialCarouselProps {
  className?: string;
}

export function TestimonialCarousel({ className }: TestimonialCarouselProps) {
  const [currentIndex] = useState(0);


  const current = testimonials[currentIndex];

  const socialLinks = [
    { url: current.linkedinUrl, label: "LinkedIn", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  ];

  return (
    <div className={cn("w-full max-w-5xl mx-auto px-4", className)}>
      {/* Desktop layout */}
      <div className="hidden md:flex relative items-center">
        <div className="w-[470px] h-[470px] rounded-3xl overflow-hidden bg-muted flex-shrink-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.imageUrl}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <Image
                src={current.imageUrl}
                alt={current.name}
                width={470}
                height={470}
                className="w-full h-full object-cover"
                draggable={false}
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="bg-card border border-border rounded-3xl shadow-2xl p-8 ml-[-80px] z-10 max-w-xl flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">{current.name}</h2>
                <p className="text-sm font-medium text-muted-foreground">{current.title}</p>
              </div>
              <p className="text-foreground/80 text-base leading-relaxed mb-8">{current.description}</p>
              <div className="flex space-x-3">
                {socialLinks.map(({ path, url, label }) => (
                  <Link
                    key={label}
                    href={url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 bg-muted border border-border rounded-full flex items-center justify-center transition-colors hover:bg-muted/60 hover:scale-105 cursor-pointer"
                    aria-label={label}
                  >
                    <svg className="w-4 h-4 text-foreground fill-current" viewBox="0 0 24 24"><path d={path} /></svg>
                  </Link>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden max-w-sm mx-auto text-center">
        <div className="w-full aspect-square bg-muted rounded-3xl overflow-hidden mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.imageUrl}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <Image
                src={current.imageUrl}
                alt={current.name}
                width={400}
                height={400}
                className="w-full h-full object-cover"
                draggable={false}
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <h2 className="text-xl font-bold text-foreground mb-2">{current.name}</h2>
              <p className="text-sm font-medium text-muted-foreground mb-4">{current.title}</p>
              <p className="text-foreground/80 text-sm leading-relaxed mb-6">{current.description}</p>
              <div className="flex justify-center space-x-3">
                {socialLinks.map(({ path, url, label }) => (
                  <Link
                    key={label}
                    href={url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 bg-muted border border-border rounded-full flex items-center justify-center transition-colors hover:bg-muted/60 cursor-pointer"
                    aria-label={label}
                  >
                    <svg className="w-4 h-4 text-foreground fill-current" viewBox="0 0 24 24"><path d={path} /></svg>
                  </Link>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
