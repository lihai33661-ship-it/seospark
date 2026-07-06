import { NextRequest, NextResponse } from "next/server";
import { generateBlogPost } from "@/lib/ai/blog-generator";

const SECRET = process.env.INTERNAL_API_SECRET || "seospark-internal-2026";

export async function POST(req: NextRequest) {
  const auth = req.headers.get("x-api-key");
  if (auth !== SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { keyword, topic, audience, tone } = await req.json();
    if (!keyword) {
      return NextResponse.json({ error: "Keyword required" }, { status: 400 });
    }

    const result = await generateBlogPost({
      topic: topic || keyword,
      keyword,
      secondaryKeywords: [],
      audience: audience || "online shoppers",
      tone: tone || "informative and engaging",
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Generation failed" },
      { status: 500 }
    );
  }
}
