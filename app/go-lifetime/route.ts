import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log(`PAYPAL_CLICK: Lifetime plan - ${new Date().toISOString()}`);

  const RESEND_KEY = process.env.RESEND_API_KEY || "";
  if (RESEND_KEY) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Authorization": `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "SEO Spark <hello@seospark.net>",
          to: ["lihai33661@gmail.com"],
          subject: "💰💰💰 PayPal Click: LIFETIME Plan",
          html: `<p>Someone clicked the <strong>LIFETIME</strong> plan button!</p><p>Time: ${new Date().toISOString()}</p><p>Referrer: ${req.headers.get("referer") || "direct"}</p>`,
        }),
      });
    } catch {}
  }

  return NextResponse.redirect("https://www.paypal.com/ncp/payment/TYFEEFMRPHYP4");
}
