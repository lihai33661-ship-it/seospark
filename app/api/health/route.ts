import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    hasApiKey: !!process.env.DEEPSEEK_API_KEY,
    keyPrefix: process.env.DEEPSEEK_API_KEY?.substring(0, 10) || "none",
  });
}
