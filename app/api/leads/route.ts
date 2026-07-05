import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const lead = await prisma.lead.upsert({
      where: { email: email.toLowerCase().trim() },
      update: { createdAt: new Date() },
      create: { email: email.toLowerCase().trim() },
    });

    return NextResponse.json({ ok: true, id: lead.id });
  } catch (error) {
    console.error("Lead save error:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
