import { NextRequest, NextResponse } from "next/server";
import { sequences, fillTemplate } from "@/lib/email/sequences";

const RESEND_KEY = process.env.RESEND_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const { sequenceName, contact } = await req.json();

    if (!sequenceName || !contact?.email) {
      return NextResponse.json({ error: "sequenceName and contact.email required" }, { status: 400 });
    }

    const sequence = sequences[sequenceName];
    if (!sequence) {
      return NextResponse.json({ error: `Sequence '${sequenceName}' not found` }, { status: 404 });
    }

    if (!RESEND_KEY) {
      return NextResponse.json({ error: "RESEND_API_KEY not configured" }, { status: 500 });
    }

    const vars = {
      name: contact.name || "there",
      business_name: contact.businessName || "your business",
      city: contact.city || "your area",
      product: contact.product || "your product",
    };

    // Send first email in sequence
    const step = sequence.steps[0];
    const emailBody = fillTemplate(step.body, vars);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Hai from SEO Spark <onboarding@resend.dev>",
        to: [contact.email],
        subject: fillTemplate(step.subject, vars),
        html: `<meta charset="utf-8"><div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; line-height: 1.6; color: #333;">${emailBody.replace(/\n\n/g, '</p><p style="margin: 1em 0;">').replace(/\n/g, '<br>')}</div>`,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      emailId: data.id,
      contact: contact.email,
      sequence: sequenceName,
      step: step.subject,
    });
  } catch (error) {
    console.error("Outreach error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
