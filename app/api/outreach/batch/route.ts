import { NextRequest, NextResponse } from "next/server";
import { getLeadsBySequence } from "@/lib/email/leads";
import { sequences, fillTemplate } from "@/lib/email/sequences";

const RESEND_KEY = process.env.RESEND_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const { sequenceName, dryRun } = await req.json();

    if (!sequenceName || !sequences[sequenceName]) {
      return NextResponse.json({ error: `Sequence '${sequenceName}' not found` }, { status: 400 });
    }

    const leads = getLeadsBySequence(sequenceName);
    const sequence = sequences[sequenceName];
    const step0 = sequence.steps[0];
    const results: { email: string; status: string; id?: string; error?: string }[] = [];

    for (const lead of leads) {
      const vars = {
        name: lead.name || "there",
        business_name: lead.businessName,
        city: lead.city || "your area",
        product: lead.businessName,
      };

      if (dryRun) {
        results.push({ email: lead.email, status: "dry-run" });
        continue;
      }

      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${RESEND_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Hai from SEO Spark <onboarding@resend.dev>",
            to: [lead.email],
            subject: fillTemplate(step0.subject, vars),
            html: `<meta charset="utf-8"><div style="font-family: sans-serif; max-width: 600px; margin:0 auto; padding:20px; line-height:1.6;">${fillTemplate(step0.body, vars).replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</div>`,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          results.push({ email: lead.email, status: "sent", id: data.id });
        } else {
          results.push({ email: lead.email, status: "failed", error: JSON.stringify(data) });
        }
      } catch (err: any) {
        results.push({ email: lead.email, status: "error", error: err.message });
      }
    }

    return NextResponse.json({
      sequence: sequenceName,
      total: leads.length,
      sent: results.filter(r => r.status === "sent").length,
      failed: results.filter(r => r.status === "failed" || r.status === "error").length,
      dryRun: !!dryRun,
      results,
    });
  } catch (error) {
    console.error("Batch outreach error:", error);
    return NextResponse.json({ error: "Batch outreach failed" }, { status: 500 });
  }
}
