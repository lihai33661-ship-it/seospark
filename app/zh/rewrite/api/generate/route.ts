import { NextRequest, NextResponse } from "next/server";
import { rewriteChineseContent } from "@/lib/ai/chinese-rewriter";
import { checkRateLimit, getClientIP } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = getClientIP(req);
  const { allowed } = checkRateLimit(`zh-rewrite:${ip}`, 5);
  if (!allowed) return NextResponse.json({ error: "今日免费次数已用完（5次/天），明天再来。" }, { status: 429 });

  try {
    const { content, platform, wordCount, style } = await req.json();
    if (!content || !platform) return NextResponse.json({ error: "请提供原始内容和目标平台。" }, { status: 400 });
    if (content.length < 20) return NextResponse.json({ error: "内容太短，请至少输入20个字。" }, { status: 400 });

    const result = await rewriteChineseContent({ content, platform, wordCount, style });
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
