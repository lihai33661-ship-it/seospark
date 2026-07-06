import { NextRequest, NextResponse } from "next/server";
import { generateProductDescription } from "@/lib/ai/product-description-generator";
import { checkRateLimit, getClientIP } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = getClientIP(req);
  const { allowed } = checkRateLimit(`product:${ip}`, 3);
  if (!allowed) return NextResponse.json({ error: "Free limit reached (3/day)." }, { status: 429 });

  try {
    const { name, category, features, customer, platform } = await req.json();
    if (!name) return NextResponse.json({ error: "Product name required." }, { status: 400 });
    const result = await generateProductDescription({ name, category, features, customer, platform });
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
