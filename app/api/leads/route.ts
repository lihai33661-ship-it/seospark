import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const RESEND_KEY = process.env.RESEND_API_KEY || "";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    // Save to DB
    const lead = await prisma.lead.upsert({
      where: { email: email.toLowerCase().trim() },
      update: { createdAt: new Date() },
      create: { email: email.toLowerCase().trim() },
    });

    // Send email notification immediately - bypasses DB persistence issue
    if (RESEND_KEY) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${RESEND_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "SEO Spark <hello@seospark.net>",
            to: ["lihai33661@gmail.com"],
            subject: `=?UTF-8?B?${Buffer.from(`🔥 New Lead: ${email}`).toString('base64')}?=`,
            html: `<meta charset="utf-8"><p><strong>New lead captured!</strong></p><p>Email: ${email}</p><p>Time: ${new Date().toISOString()}</p><p>Source: SEO Spark quota exceeded form</p>`,
          }),
        });
        console.log(`Lead notification sent for ${email}`);
      } catch (notifyErr) {
        console.error("Notify error:", notifyErr);
      }
    }

    return NextResponse.json({ ok: true, id: lead.id });
  } catch (error) {
    console.error("Lead save error:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
