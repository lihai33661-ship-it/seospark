import { NextRequest, NextResponse } from "next/server";
import { generateBlogPost } from "@/lib/ai/blog-generator";

const LIMIT = 3;

export async function POST(req: NextRequest) {
  try {
    const { keyword, topic } = await req.json();
    if (!keyword) {
      return NextResponse.json({ error: "Keyword required" }, { status: 400 });
    }

    // Cookie quota
    const cookie = req.cookies.get("shopify_used")?.value;
    const used = cookie ? parseInt(cookie) || 0 : 0;
    if (used >= LIMIT) {
      return NextResponse.json(
        { error: "Free limit reached", quotaExceeded: true },
        { status: 402 }
      );
    }

    const result = await generateBlogPost({
      topic: topic || keyword,
      keyword,
      secondaryKeywords: [],
      audience: "online shoppers and customers",
      tone: "informative and engaging",
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Generation failed" },
      { status: 500 }
    );
  }
}
