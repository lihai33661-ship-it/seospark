import { NextRequest, NextResponse } from "next/server";
import { generateColdEmail } from "@/lib/ai/cold-email-generator";
import { checkRateLimit, getClientIP } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = getClientIP(req);
  const { allowed } = checkRateLimit(`coldemail:${ip}`, 5);
  if (!allowed) return NextResponse.json({ error: "Free limit reached (5/day)." }, { status: 429 });

  try {
    const { company, product, prospect, role, research, value } = await req.json();
    if (!prospect || !product) return NextResponse.json({ error: "Prospect company and your product required." }, { status: 400 });
    const result = await generateColdEmail({ company, product, prospect, role, research, value });
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
