"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel";
import { HorizontalTimeline } from "@/components/ui/horizontal-timeline";
import { ProjectGallery } from "@/components/ui/project-gallery";
import { Testimonial } from "@/components/ui/testimonial";
import ShaderBackground from "@/components/ui/shader-background";

const SECTION_HEADING = "text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4";
const SECTION_SUB = "text-base text-muted-foreground max-w-2xl";
const SECTION_WRAP = "py-24 px-4 md:px-8";


export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* Sticky nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/70 backdrop-blur-md border-b border-white/8">
        <span className="text-white/90 font-mono text-xs tracking-[0.25em] uppercase select-none">JR Quint</span>
        <div className="flex items-center gap-5 md:gap-8">
          <a href="#work" className="text-white/40 hover:text-white text-xs font-mono tracking-widest uppercase transition-colors hidden sm:block">Work</a>
          <a href="#experience" className="text-white/40 hover:text-white text-xs font-mono tracking-widest uppercase transition-colors hidden sm:block">Experience</a>
          <a
            href="#contact"
            className="h-8 px-4 rounded-full bg-white text-black text-xs font-medium flex items-center transition-opacity hover:opacity-80"
          >
            Get in touch
          </a>
          <a
            href="https://www.linkedin.com/in/jrquint/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <svg className="w-3.5 h-3.5 text-white fill-current" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </nav>

      {/* Hero + Testimonials — one section with mesh gradient background */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 overflow-hidden pb-24">
        <MeshGradient
          className="absolute inset-0 w-full h-full"
          colors={["#000000", "#1a1a1a", "#333333", "#ffffff"]}
          speed={0.5}
        />
        <div className="relative z-10 max-w-3xl mx-auto pt-52">
          <p className="text-sm font-mono tracking-widest text-white/50 uppercase mb-6">
            Creative & Brand Strategy
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6">
            Hi, my name is JR.
          </h1>
          <p className="text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
            I shape brands, craft strategy, and build experiences that leave a lasting impression.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <a
              href="#work"
              className="h-11 px-6 rounded-full bg-white text-black text-sm font-medium flex items-center transition-opacity hover:opacity-80"
            >
              See my work
            </a>
            <a
              href="#contact"
              className="h-11 px-6 rounded-full border border-white/20 text-white text-sm font-medium flex items-center transition-colors hover:bg-white/10"
            >
              Get in touch
            </a>
          </div>

        </div>
        <div className="relative z-10 w-full mt-24">
          <TestimonialCarousel />
        </div>
      </section>

      {/* Projects */}
      <section id="work" className={`section-light ${SECTION_WRAP}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={SECTION_HEADING}>Selected work</h2>
            <p className={`${SECTION_SUB} mx-auto`}>
              A curated selection of projects where precision and thoughtful design come together.
            </p>
          </div>
          <ProjectGallery />
        </div>
      </section>

      {/* Timeline */}
      <section id="experience" className={`relative overflow-hidden ${SECTION_WRAP} border-t border-white/10`}>
        <ShaderBackground />
        <div className="relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Experience</h2>
            <p className="text-base text-white/50 max-w-2xl mx-auto">
              Wherever I land, I adjust, figure it out, and deliver. Here is the proof.
            </p>
          </div>
          <HorizontalTimeline />
        </div>
      </section>

      {/* Single featured testimonial */}
      <section className="section-light py-12 px-4 md:px-8 border-t border-black/10">
        <Testimonial
          quote="JR was hard-working, curious, and a fast learner. He performed strongly in project planning, and led his own project with other interns. He worked well with new tools, implementing AI recommendations and planning into his work, showing his initiative and desire to stay at the forefront of a changing environment. I'd be thrilled to work with JR again in the future and confident in his ability to solve any problem put in front of him."
          authorName="Nick Stoll"
          authorPosition="Manager, Strategy & Consulting at THE·TEAM"
          authorImage="/nick-stoll.jpeg"
        />
      </section>

      {/* Contact / Footer */}
      <footer id="contact" className="section-light border-t border-black/10 py-16 px-4 text-center">
        <p className="text-xs font-mono tracking-widest uppercase text-black/40 mb-4">Get in touch</p>
        <a
          href="mailto:jrquintbiz@gmail.com"
          className="text-2xl md:text-3xl font-bold text-black hover:text-black/60 transition-colors"
        >
          jrquintbiz@gmail.com
        </a>
        <p className="mt-10 text-sm text-muted-foreground">
          © {new Date().getFullYear()} JR Quint
        </p>
      </footer>
    </main>
  );
}
