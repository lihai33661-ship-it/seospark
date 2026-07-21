import { NextRequest, NextResponse } from "next/server";
import { generateYouTubeSEO } from "@/lib/ai/youtube-seo-generator";
import { checkRateLimit, getClientIP } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = getClientIP(req);
  const { allowed } = checkRateLimit(`youtube:${ip}`, 2);
  if (!allowed) return NextResponse.json({ error: "Free limit reached (2/day)." }, { status: 429 });

  try {
    const { topic, audience, length } = await req.json();
    if (!topic) return NextResponse.json({ error: "Video topic required." }, { status: 400 });
    const result = await generateYouTubeSEO({ topic, audience, length });
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
