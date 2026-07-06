/**
 * Proposal Generator API
 * POST /p/proposal/api/generate
 */
import { NextRequest, NextResponse } from "next/server";
import { generateProposal } from "@/lib/ai/proposal-generator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, client, skills, name } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Job title and description are required." },
        { status: 400 }
      );
    }

    if (description.length < 50) {
      return NextResponse.json(
        { error: "Job description too short. Please paste the full job post." },
        { status: 400 }
      );
    }

    const result = await generateProposal({
      title: title.trim(),
      description: description.trim(),
      client: client?.trim() || "",
      skills: skills?.trim() || "",
      name: name?.trim() || "",
    });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("Proposal generation error:", err);
    return NextResponse.json(
      { error: err.message || "Generation failed. Please try again." },
      { status: 500 }
    );
  }
}

export const runtime = "nodejs";
