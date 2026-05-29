"use client";

interface InstagramEmbedProps {
  posts: string[]; // Instagram post URLs or shortcodes, e.g. "https://www.instagram.com/p/DXIGwFLEtSq/"
}

function extractShortcode(input: string): string {
  // Handles full URL or bare shortcode
  const match = input.match(/instagram\.com\/(?:p|reel)\/([A-Za-z0-9_-]+)/);
  return match ? match[1] : input;
}

export function InstagramEmbed({ posts }: InstagramEmbedProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="space-y-4">
      <p className="text-xs font-mono tracking-widest uppercase text-black/40">
        Content from @cueappoffical
      </p>
      <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
        {posts.map((post) => {
          const code = extractShortcode(post);
          return (
            <div
              key={code}
              className="flex-shrink-0 snap-start rounded-2xl overflow-hidden border border-black/8 shadow-sm bg-white"
              style={{ width: 340 }}
            >
              <iframe
                src={`https://www.instagram.com/p/${code}/embed/`}
                width="340"
                height="600"
                frameBorder="0"
                scrolling="no"
                allowTransparency
                title={`Instagram post ${code}`}
                className="block"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
