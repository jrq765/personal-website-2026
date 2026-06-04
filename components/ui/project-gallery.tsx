"use client";

import React from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const GenerativeArtCanvas = ({ isHovered }: { isHovered: boolean }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationFrameId: number;

    interface LineData {
      x: number;
      y: number;
      speed: number;
      angle: number;
      length: number;
      update(): void;
      draw(): void;
    }

    const lines: LineData[] = [];
    const numLines = 30;

    function createLine(): LineData {
      return {
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        speed: Math.random() * 0.5 + 0.1,
        angle: Math.random() * Math.PI * 2,
        length: Math.random() * 20 + 5,
        update() {
          this.x += Math.cos(this.angle) * this.speed;
          this.y += Math.sin(this.angle) * this.speed;
          if (this.x < 0 || this.x > canvas!.width || this.y < 0 || this.y > canvas!.height) {
            this.x = Math.random() * canvas!.width;
            this.y = Math.random() * canvas!.height;
          }
        },
        draw() {
          ctx!.beginPath();
          ctx!.moveTo(this.x, this.y);
          ctx!.lineTo(this.x - Math.cos(this.angle) * this.length, this.y - Math.sin(this.angle) * this.length);
          ctx!.strokeStyle = `rgba(255,255,255,${Math.random() * 0.25 + 0.05})`;
          ctx!.lineWidth = 1;
          ctx!.stroke();
        },
      };
    }

    canvas.width = 400;
    canvas.height = 400;
    for (let i = 0; i < numLines; i++) lines.push(createLine());

    const animate = () => {
      if (isHovered) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        lines.forEach((l) => { l.update(); l.draw(); });
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
    />
  );
};

import Link from "next/link";
import { projects } from "@/lib/projects";

interface GalleryItem {
  slug: string;
  title: string;
  category: string;
  image: string;
  imagePosition?: string;
  imageFit?: "cover" | "contain";
}

const GalleryCard = ({ item, index }: { item: GalleryItem; index: number }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      variants={{
        offscreen: { y: 50, opacity: 0 },
        onscreen: { y: 0, opacity: 1, transition: { type: "spring", bounce: 0.4, duration: 0.8, delay: index * 0.1 } },
      }}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.3 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative h-80 w-full rounded-2xl bg-card border border-border overflow-hidden cursor-pointer"
    >
      <div
        style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
        className="absolute inset-3 flex flex-col justify-end rounded-xl overflow-hidden"
      >
        {item.imageFit === "contain" && (
          <div className="absolute inset-0 bg-white" />
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={item.title}
          className={`absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-105 ${item.imageFit === "contain" ? "object-contain p-8" : "object-cover"}`}
          style={item.imagePosition ? { objectPosition: item.imagePosition } : undefined}
        />
        <GenerativeArtCanvas isHovered={isHovered} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative z-10 p-4">
          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="text-lg font-semibold text-white mb-0.5"
          >
            {item.title}
          </motion.h3>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.05 }}
            className="text-sm text-white/60"
          >
            {item.category}
          </motion.p>
        </div>
        <div className="absolute top-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>
    </motion.div>
  );
};

export function ProjectGallery({ className }: { className?: string }) {
  return (
    <div className={cn("w-full max-w-6xl mx-auto", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((item, index) => (
          <Link key={item.slug} href={`/projects/${item.slug}`}>
            <GalleryCard item={item} index={index} />
          </Link>
        ))}
      </div>
    </div>
  );
}
