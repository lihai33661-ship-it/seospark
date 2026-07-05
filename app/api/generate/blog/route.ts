/**
 * POST /api/generate/blog
 * 免费额度：3 篇/cookie
 */
import { NextRequest, NextResponse } from "next/server";
import { generateBlogPost } from "@/lib/ai/blog-generator";

const FREE_LIMIT = 3;

function readCount(req: NextRequest): number {
  const raw = req.cookies.get("spark_usage")?.value;
  return raw ? parseInt(raw) || 0 : 0;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topic, keyword, secondaryKeywords, audience, tone } = body;

    if (!topic || !keyword) {
      return NextResponse.json(
        { error: "Topic and keyword are required" },
        { status: 400 }
      );
    }

    const count = readCount(req);
    if (count >= FREE_LIMIT) {
      return NextResponse.json(
        { error: "Free limit reached. Upgrade to Pro.", quotaExceeded: true },
        { status: 402 }
      );
    }

    const result = await generateBlogPost({
      topic,
      keyword,
      secondaryKeywords: secondaryKeywords || [],
      audience: audience || "business professionals",
      tone: tone || "professional",
    });

    const newCount = count + 1;
    const remaining = FREE_LIMIT - newCount;

    const response = NextResponse.json({ ...result, remaining });
    response.cookies.set("spark_usage", String(newCount), {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
    });

    return response;
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Content generation failed. Please try again." },
      { status: 500 }
    );
  }
}
