/**
 * FAQ Builder API
 * POST /p/faq/api/generate
 */
import { NextRequest, NextResponse } from "next/server";
import { generateFAQ } from "@/lib/ai/faq-generator";
import { checkRateLimit, getClientIP } from "@/lib/rate-limit";

const DAILY_LIMIT = 2; // FAQ is one-and-done — 2 tries is enough (test + refine)

export async function POST(req: NextRequest) {
  // Rate limit
  const ip = getClientIP(req);
  const { allowed } = checkRateLimit(`faq:${ip}`, DAILY_LIMIT);
  if (!allowed) {
    return NextResponse.json(
      { error: `Free daily limit reached (${DAILY_LIMIT}/day). Come back tomorrow, or email hello@seospark.net for beta access.` },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { url, audience } = body;

    if (!url) {
      return NextResponse.json(
        { error: "Website URL is required." },
        { status: 400 }
      );
    }

    // Validate URL format
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        throw new Error("Invalid protocol");
      }
    } catch {
      return NextResponse.json(
        { error: "Invalid URL. Please enter a full website address (e.g. https://example.com)." },
        { status: 400 }
      );
    }

    const result = await generateFAQ({
      url: parsedUrl.href,
      audience: audience?.trim() || "",
    });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("FAQ generation error:", err);
    return NextResponse.json(
      { error: err.message || "Generation failed. Please try again." },
      { status: 500 }
    );
  }
}

export const runtime = "nodejs";
