import { NextResponse } from "next/server";

export interface InstagramReel {
  id: string;
  media_type: string;
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
}

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    return NextResponse.json({ error: "INSTAGRAM_ACCESS_TOKEN not set" }, { status: 500 });
  }

  try {
    const fields = "id,media_type,media_url,thumbnail_url,permalink,caption,timestamp";
    const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${token}`;
    const res = await fetch(url, { next: { revalidate: 3600 } }); // cache 1 hour

    if (!res.ok) {
      const err = await res.json();
      return NextResponse.json({ error: err }, { status: res.status });
    }

    const data = await res.json();

    // Return only VIDEO (Reels) items
    const reels: InstagramReel[] = (data.data ?? []).filter(
      (item: InstagramReel) => item.media_type === "VIDEO"
    );

    return NextResponse.json({ reels });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
