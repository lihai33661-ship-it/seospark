/**
 * POST /api/generate/blog
 * 生成 SEO 博客文章
 */
import { NextRequest, NextResponse } from "next/server";
import { generateBlogPost } from "@/lib/ai/blog-generator";

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

    const result = await generateBlogPost({
      topic,
      keyword,
      secondaryKeywords: secondaryKeywords || [],
      audience: audience || "business professionals",
      tone: tone || "professional",
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Content generation failed. Please try again." },
      { status: 500 }
    );
  }
}
