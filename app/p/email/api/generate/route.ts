import { NextRequest, NextResponse } from "next/server";
import { generateEmailSequence } from "@/lib/ai/email-sequence-generator";
import { checkRateLimit, getClientIP } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = getClientIP(req);
  const { allowed } = checkRateLimit(`email:${ip}`, 2);
  if (!allowed) return NextResponse.json({ error: "Free limit reached (2/day)." }, { status: 429 });

  try {
    const { product, audience, tone, benefit } = await req.json();
    if (!product) return NextResponse.json({ error: "Product name required." }, { status: 400 });
    const result = await generateEmailSequence({ product, audience, tone, benefit });
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
