"use client";

import { motion } from "framer-motion";

interface HighlightItem {
  title: string;
  description: string;
}

interface ProjectHighlightsProps {
  highlights: HighlightItem[];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
    },
  },
};

export function ProjectHighlights({ highlights }: ProjectHighlightsProps) {
  return (
    <section className="space-y-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={containerVariants}
        className="space-y-4"
      >
        {highlights.map((highlight, index) => (
          <motion.div key={`${highlight.title}-${index}`} variants={itemVariants} className="space-y-1">
            <p className="text-sm font-semibold text-black">
              {String(index + 1).padStart(2, "0")}. {highlight.title}
            </p>
            <p className="text-sm leading-7 text-black/70">
              {highlight.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
