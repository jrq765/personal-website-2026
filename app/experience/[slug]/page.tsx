import { experiences } from "@/lib/experiences";
import { parseLocalDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { InstagramEmbed } from "@/components/ui/instagram-embed";

export function generateStaticParams() {
  return experiences.map((e) => ({ slug: e.slug }));
}

function formatDate(dateStr: string) {
  return parseLocalDate(dateStr).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exp = experiences.find((e) => e.slug === slug);
  if (!exp) notFound();

  return (
    <main className="min-h-screen bg-white text-black">

      {/* Back nav */}
      <div className="px-6 pt-10 max-w-2xl mx-auto">
        <Link
          href="/#experience"
          className="inline-flex items-center gap-2 text-black/40 hover:text-black text-xs font-mono tracking-widest uppercase transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </Link>
      </div>

      <div className="py-12 px-6 max-w-2xl mx-auto">

        {/* Logo + identity */}
        <div className="flex items-start gap-5 mb-10">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-black/8 shadow-sm">
            {exp.logo ? (
              <Image src={exp.logo} alt={exp.company} fill sizes="80px" className="object-cover" />
            ) : (
              <div className="w-full h-full bg-black/5 flex items-center justify-center">
                <span className="text-black font-bold text-2xl">{exp.logoPlaceholder}</span>
              </div>
            )}
          </div>
          <div className="pt-1">
            <h1 className="text-2xl font-bold text-black leading-tight">{exp.company}</h1>
            <p className="text-base text-black/50 mt-0.5">{exp.role}</p>
            <p className="text-xs font-mono text-black/30 mt-1.5 tracking-wide">
              {formatDate(exp.startDate)} – {formatDate(exp.endDate)} &middot; {exp.location}
            </p>
          </div>
        </div>

        {/* Brief paragraph */}
        <p className="text-base leading-relaxed text-black/70 mb-10 border-l-2 border-black/10 pl-5">
          {exp.brief}
        </p>

        {/* What I did */}
        <div className="space-y-5 mb-14">
          {exp.bullets.map((b, i) => (
            <div key={i} className="flex gap-4">
              <span className="text-black/20 font-mono text-xs mt-0.5 shrink-0 w-5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm leading-relaxed text-black/60">{b}</p>
            </div>
          ))}
        </div>

        {exp.instagramPosts && exp.instagramPosts.length > 0 && (
          <InstagramEmbed
            posts={exp.instagramPosts.map((p) => p.url)}
            attribution={exp.instagramPosts[0].attribution}
          />
        )}

      </div>
    </main>
  );
}
