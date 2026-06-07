"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, animate } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { experiences } from "@/lib/experiences";
import { Slider } from "@/components/ui/interfaces-slider";
import { parseLocalDate } from "@/lib/utils";

const START_MS = parseLocalDate("2023-10-01").getTime();
const END_MS   = parseLocalDate("2026-06-01").getTime();
const TOTAL_MS = END_MS - START_MS;
const INNER_MULT = 3;

function rawPos(dateStr: string): number {
  return Math.max(0, Math.min(1, (parseLocalDate(dateStr).getTime() - START_MS) / TOTAL_MS));
}

// Spread bubbles at midpoints to avoid icon overlap
function buildPositions(sorted: (typeof experiences)[number][]): Record<string, number> {
  const MIN_GAP = 0.085;
  const out: Record<string, number> = {};
  for (let i = 0; i < sorted.length; i++) {
    const mid = (rawPos(sorted[i].startDate) + rawPos(sorted[i].endDate)) / 2;
    let pos = mid;
    for (let j = 0; j < i; j++) {
      if (Math.abs(pos - out[sorted[j].slug]) < MIN_GAP) {
        pos = out[sorted[j].slug] + MIN_GAP;
      }
    }
    out[sorted[i].slug] = Math.min(0.98, Math.max(0.015, pos));
  }
  return out;
}

// Stack overlapping same-side brackets at increasing heights
function buildBracketHeights(sorted: (typeof experiences)[number][]): Record<string, number> {
  const BASE = 18;
  const STEP = 16;
  const heights: Record<string, number> = {};
  sorted.forEach((exp, i) => {
    const isAbove = i % 2 === 0;
    const s = rawPos(exp.startDate);
    const e = rawPos(exp.endDate);
    let bh = BASE;
    sorted.forEach((other, j) => {
      if (j >= i) return;
      if ((j % 2 === 0) !== isAbove) return;
      const os = rawPos(other.startDate);
      const oe = rawPos(other.endDate);
      if (s < oe && e > os) bh = Math.max(bh, heights[other.slug] + STEP);
    });
    heights[exp.slug] = bh;
  });
  return heights;
}

const BRACKET_COLORS = [
  "#7A9BAE", "#C4855A", "#7AA67E", "#9B7FA6",
  "#C49A3C", "#5A9E9A", "#B07878", "#B8A050",
  "#7878B8", "#B87840", "#6A9E6A", "#7888B0",
];

const AXIS_LABELS = [
  { label: "Oct '23", date: "2023-10-01" },
  { label: "Jan '24", date: "2024-01-01" },
  { label: "Jul '24", date: "2024-07-01" },
  { label: "Jan '25", date: "2025-01-01" },
  { label: "Jul '25", date: "2025-07-01" },
  { label: "Jan '26", date: "2026-01-01" },
  { label: "Now",     date: "2026-05-01" },
];

const CENTER_Y = 260;
const BUBBLE_R = 36;
const STEM_GAP = 10;
const ABOVE_Y  = CENTER_Y - 115;
const BELOW_Y  = CENTER_Y + 115;

export function HorizontalTimeline() {
  const wrapRef      = useRef<HTMLDivElement>(null);
  const scrollRef    = useRef<HTMLDivElement>(null);
  const isInView     = useInView(wrapRef, { once: true, margin: "-10%" });
  const [containerW, setContainerW] = useState(0);
  const [progress,   setProgress]   = useState(0);
  const [scrollPos,  setScrollPos]  = useState(0);
  const [animDone,   setAnimDone]   = useState(false);
  const [hovered,    setHovered]    = useState<string | null>(null);

  const sorted = [...experiences]
    .filter(e => e.slug !== "sales-club" && e.slug !== "oregon-innovation-s2")
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  const positions      = buildPositions(sorted);
  const bracketHeights = buildBracketHeights(sorted);

  useEffect(() => {
    const update = () => { if (wrapRef.current) setContainerW(wrapRef.current.offsetWidth); };
    update();
    const ro = new ResizeObserver(update);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  const innerW   = containerW * INNER_MULT;
  const maxShift = innerW - containerW;

  useEffect(() => {
    if (!isInView || containerW === 0) return;
    const ctrl = animate(0, 1, {
      duration: 3.5,
      ease: [0.04, 0.5, 0.65, 1],
      onUpdate: (v) => {
        setProgress(v);
        setScrollPos(v);
        if (scrollRef.current) scrollRef.current.scrollLeft = v * maxShift;
      },
      onComplete: () => {
        setProgress(1);
        setScrollPos(1);
        if (scrollRef.current) scrollRef.current.scrollLeft = maxShift;
        setAnimDone(true);
      },
    });
    return () => ctrl.stop();
  }, [isInView, containerW, maxShift]);

  const currentDate = new Date(START_MS + progress * TOTAL_MS);

  function handleSliderChange(v: number) {
    if (!animDone) return;
    setScrollPos(v);
    if (scrollRef.current) scrollRef.current.scrollLeft = v * maxShift;
  }

  function handleScroll() {
    if (!animDone || !scrollRef.current) return;
    const v = scrollRef.current.scrollLeft / Math.max(1, maxShift);
    setScrollPos(Math.min(1, Math.max(0, v)));
  }

  return (
    <div ref={wrapRef} className="relative w-full">
      <p className="text-center font-mono text-white/30 text-xs tracking-[0.3em] mb-10 h-4 select-none">
        {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" }).toUpperCase()}
      </p>

      {/* Outer shell clips the scrollbar off the bottom */}
      <div className="relative" style={{ height: 520, overflow: "hidden" }}>

      {/* Scroll container — overflow-x-auto enables native touch scrolling on mobile */}
      <div
        ref={scrollRef}
        className="relative timeline-scroll"
        style={{ height: 540, overflowX: "auto", overflowY: "hidden" }}
        onScroll={handleScroll}
      >
        <div style={{ width: innerW || "300%", height: "100%", position: "relative" }}>

          {/* Base track line */}
          <div className="absolute left-0 right-0 h-px bg-white/25" style={{ top: CENTER_Y }} />

          {/* Animated playhead */}
          <div
            className="absolute left-0 h-px bg-white/70"
            style={{ top: CENTER_Y, width: `${progress * 100}%`, transition: "none" }}
          />

          {/* Axis date labels */}
          {AXIS_LABELS.map((m) => {
            const x = rawPos(m.date) * innerW;
            return (
              <div key={m.label} className="absolute" style={{ left: x, top: CENTER_Y + 10 }}>
                <span className="text-white/40 text-xs font-mono -translate-x-1/2 block whitespace-nowrap select-none">
                  {m.label}
                </span>
              </div>
            );
          })}

          {/* ── PASS 1: Brackets — anchored at raw start/end dates on the axis ── */}
          {sorted.map((exp, i) => {
            const startRaw = rawPos(exp.startDate);
            const endRaw   = Math.min(0.995, rawPos(exp.endDate));
            const bx       = startRaw * innerW;
            const bw       = (endRaw - startRaw) * innerW;
            if (bw < 2) return null;

            const BH      = bracketHeights[exp.slug];
            const isAbove = i % 2 === 0;
            const color   = BRACKET_COLORS[i % BRACKET_COLORS.length];
            const visible = progress >= startRaw - 0.012;
            const fill    = !visible ? 0 : Math.min(1, (progress - startRaw) / Math.max(0.001, endRaw - startRaw));
            const op      = Math.min(1, fill * 1.4);

            const svgTop = isAbove ? CENTER_Y - BH : CENTER_Y;
            const R = 7;
            const pathD = isAbove
              ? `M 0 ${BH} L 0 ${R} Q 0 0 ${R} 0 L ${bw - R} 0 Q ${bw} 0 ${bw} ${R} L ${bw} ${BH}`
              : `M 0 0 L 0 ${BH - R} Q 0 ${BH} ${R} ${BH} L ${bw - R} ${BH} Q ${bw} ${BH} ${bw} ${BH - R} L ${bw} 0`;

            return (
              <svg
                key={`bracket-${exp.slug}`}
                className="absolute pointer-events-none"
                style={{ left: bx, top: svgTop, width: bw, height: BH, overflow: "visible" }}
              >
                <path
                  d={pathD}
                  fill="none"
                  stroke={color}
                  strokeOpacity={op * 0.75}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            );
          })}

          {/* ── PASS 2: Bubbles — at spread midpoints, stem connects to bracket ── */}
          {sorted.map((exp, i) => {
            const pos      = positions[exp.slug];
            const x        = pos * innerW;
            const isAbove  = i % 2 === 0;
            const bubbleY  = isAbove ? ABOVE_Y : BELOW_Y;
            const startRaw = rawPos(exp.startDate);
            const endRaw   = Math.min(0.995, rawPos(exp.endDate));
            const visible  = progress >= startRaw - 0.012;
            const fill     = !visible ? 0 : Math.min(1, (progress - startRaw) / Math.max(0.001, endRaw - startRaw));
            const BH       = bracketHeights[exp.slug];
            const color    = BRACKET_COLORS[i % BRACKET_COLORS.length];

            // Stem stops at bracket edge, not the axis
            const stemTop = isAbove ? bubbleY + BUBBLE_R + STEM_GAP : CENTER_Y + BH;
            const stemH   = isAbove
              ? Math.max(0, (CENTER_Y - BH) - (bubbleY + BUBBLE_R + STEM_GAP))
              : Math.max(0, (bubbleY - BUBBLE_R - STEM_GAP) - (CENTER_Y + BH));

            return (
              <div key={exp.slug} className="absolute" style={{ left: x, top: 0 }}>
                {/* Stem */}
                <motion.div
                  className="absolute w-px"
                  style={{ left: 0, top: stemTop, height: Math.max(0, stemH), transformOrigin: isAbove ? "bottom" : "top", background: color, opacity: 0.5 }}
                  initial={{ scaleY: 0 }}
                  animate={visible ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.2 }}
                />

                {/* Bubble */}
                <motion.div
                  className="absolute"
                  style={{ left: -BUBBLE_R, top: bubbleY - BUBBLE_R }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={visible ? { scale: 1, opacity: 1 } : {}}
                  transition={{ type: "spring", stiffness: 450, damping: 26 }}
                >
                  <Link href={`/experience/${exp.slug}`}>
                    <div
                      className="group relative"
                      onMouseEnter={() => setHovered(exp.slug)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <div className="relative w-[72px] h-[72px] rounded-2xl overflow-hidden flex items-center justify-center bg-white/8 border border-white/15 cursor-pointer transition-all duration-200 hover:scale-105 hover:border-white/40">
                        {exp.logo ? (
                          <Image src={exp.logo} alt={exp.company} fill sizes="72px" className="object-cover" />
                        ) : (
                          <span className="text-white/70 font-bold text-lg select-none">{exp.logoPlaceholder}</span>
                        )}
                      </div>

                      {/* Label */}
                      <div className={`absolute w-24 text-center pointer-events-none select-none ${
                        isAbove ? "bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2" : "top-[calc(100%+10px)] left-1/2 -translate-x-1/2"
                      }`}>
                        <p className="text-white text-xs font-semibold leading-tight truncate">{exp.company}</p>
                        <p className="text-white/60 text-[10px] mt-0.5 leading-tight truncate">{exp.role.split(",")[0].trim()}</p>
                      </div>

                      {/* Hover card */}
                      {hovered === exp.slug && (
                        <motion.div
                          initial={{ opacity: 0, y: isAbove ? -6 : 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.15 }}
                          className={`absolute w-72 bg-black border border-white/15 rounded-2xl p-4 z-50 shadow-2xl ${
                            isAbove ? "top-[calc(100%+12px)] left-0" : "bottom-[calc(100%+12px)] left-0"
                          }`}
                        >
                          <p className="text-white text-sm font-semibold mb-0.5">{exp.company}</p>
                          <p className="text-white/50 text-xs mb-0.5">{exp.role}</p>
                          <p className="text-white/30 text-[10px] font-mono mb-2">
                            {parseLocalDate(exp.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })} – {parseLocalDate(exp.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                          </p>
                          <p className="text-white/40 text-xs leading-relaxed">{exp.brief}</p>
                          <p className="text-white/20 text-[10px] mt-3 tracking-widest font-mono">CLICK TO EXPLORE →</p>
                        </motion.div>
                      )}

                      {/* Subtle color dot matching bracket color */}
                      <div
                        className="absolute bottom-1.5 right-1.5 w-2 h-2 rounded-full"
                        style={{ background: BRACKET_COLORS[i % BRACKET_COLORS.length], opacity: fill * 0.8 }}
                      />
                    </div>
                  </Link>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Fade edges sit on the outer shell so they aren't scrolled */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent z-10" />
      </div>{/* end outer shell */}

      {/* Slider — hidden on mobile since native scroll handles it */}
      <div className="hidden md:flex mt-8 px-12 items-center gap-5">
        <span className="text-white/20 text-[10px] font-mono tracking-widest select-none whitespace-nowrap">← OLDER</span>
        <Slider
          min={0}
          max={100}
          step={1}
          value={[Math.round(scrollPos * 100)]}
          onValueChange={([v]) => handleSliderChange(v / 100)}
          disabled={!animDone}
          className="flex-1"
        />
        <span className="text-white/20 text-[10px] font-mono tracking-widest select-none whitespace-nowrap">RECENT →</span>
      </div>

      {/* Mobile scroll hint */}
      <p className="md:hidden text-center text-white/20 text-[10px] font-mono tracking-widest mt-6 select-none">
        SWIPE TO EXPLORE
      </p>
    </div>
  );
}
