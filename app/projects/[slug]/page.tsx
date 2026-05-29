import { projects } from "@/lib/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { InstagramEmbed } from "@/components/ui/instagram-embed";
import { ProjectHighlights } from "@/components/ui/project-highlights";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Back nav */}
      <div className="px-6 pt-10 max-w-5xl mx-auto">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-black/40 hover:text-black text-xs font-mono tracking-widest uppercase transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </Link>
      </div>

      <div className="py-12 px-6 max-w-5xl mx-auto space-y-12">

        {/* Header */}
        <div className="space-y-3">
          <p className="text-xs font-mono tracking-widest uppercase text-black/40">
            {project.category}
          </p>
          <h1 className="text-4xl font-bold tracking-tight">{project.title}</h1>
          {project.description && (
            <p className="text-base text-black/60 max-w-2xl leading-relaxed">
              {project.description}
            </p>
          )}
          {project.appStoreUrl && (
            <a
              href={project.appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-2 text-xs font-mono tracking-widest uppercase text-black/40 hover:text-black transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View on App Store
            </a>
          )}
        </div>

        {/* Embed — Canva, Spotify, etc. */}
        {project.embedUrl && (
          <div className="w-full rounded-2xl overflow-hidden border border-black/8 shadow-sm bg-gray-50">
            {project.embedHeight ? (
              <iframe
                src={project.embedUrl}
                width="100%"
                height={project.embedHeight}
                allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                loading="lazy"
                title={project.title}
                style={{ display: "block", border: "none", borderRadius: 10, width: "100%", maxWidth: 660, margin: "0 auto" }}
              />
            ) : (
              <div className="relative w-full" style={{ paddingBottom: project.embedAspectRatio ?? "56.25%" }}>
                <iframe
                  src={project.embedUrl}
                  className="absolute inset-0 w-full h-full"
                  allowFullScreen
                  allow="fullscreen"
                  title={project.title}
                />
              </div>
            )}
          </div>
        )}

        {/* Instagram embeds */}
        {project.instagramPosts && project.instagramPosts.length > 0 && (
          <InstagramEmbed posts={project.instagramPosts} />
        )}

        {project.highlights && project.highlights.length > 0 && (
          <ProjectHighlights highlights={project.highlights} />
        )}

        {/* Footer */}
        <div className="pt-4">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-black/40 hover:text-black text-xs font-mono tracking-widest uppercase transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All Work
          </Link>
        </div>

      </div>
    </main>
  );
}
