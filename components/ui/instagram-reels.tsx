"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import type { InstagramReel } from "@/app/api/instagram/route";

export function InstagramReels() {
  const [reels, setReels] = useState<InstagramReel[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    fetch("/api/instagram")
      .then((r) => r.json())
      .then((data) => {
        if (data.reels) {
          setReels(data.reels);
          setStatus("ready");
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "loading") {
    return (
      <div className="w-full rounded-2xl border border-black/8 bg-gray-50 flex items-center justify-center py-20">
        <p className="text-xs font-mono tracking-widest uppercase text-black/25 animate-pulse">
          Loading reels…
        </p>
      </div>
    );
  }

  if (status === "error" || reels.length === 0) {
    return (
      <div className="w-full rounded-2xl border border-dashed border-black/12 bg-gray-50 flex flex-col items-center justify-center gap-2 py-16 text-center">
        <p className="text-xs font-mono tracking-widest uppercase text-black/25">
          {status === "error" ? "Couldn't load reels. Check your access token." : "No reels found"}
        </p>
      </div>
    );
  }

  return (
    <div
      className="w-full overflow-hidden"
      style={{
        maskImage: "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
      }}
    >
      <div className="flex gap-4 py-2 instagram-scroll-track">
        {[...reels, ...reels].map((reel, i) => (
          <a
            key={`${reel.id}-${i}`}
            href={reel.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex-shrink-0 w-44 md:w-52 relative rounded-2xl overflow-hidden border border-black/8 shadow-sm bg-black aspect-[9/16]"
          >
            {/* Thumbnail — prefer thumbnail_url, fall back to poster frame */}
            <img
              src={reel.thumbnail_url ?? reel.media_url}
              alt={reel.caption ?? "Reel"}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200 flex items-center justify-center">
              <ExternalLink className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
