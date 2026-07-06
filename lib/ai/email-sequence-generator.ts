import { callAI } from "./shared";

const PROMPT = `You are an email marketing expert. Write a 5-email welcome/drip sequence.

Product/Service: {{PRODUCT}}
Target Audience: {{AUDIENCE}}
Brand Voice: {{TONE}}
Key Benefit: {{BENEFIT}}

Write 5 emails. Each email:
- Subject line (under 50 chars, curiosity-driven, not clickbait)
- Body (100-150 words, warm and personal)
- CTA (one clear action per email)

STRUCTURE:
Email 1 (Welcome): Deliver the lead magnet or welcome. Set expectations for what's coming.
Email 2 (Value): Teach something useful. No selling. Build credibility.
Email 3 (Social proof): Case study or testimonial. Show results others got.
Email 4 (Offer): Present your product as the natural solution. Overcome top objection.
Email 5 (Last chance): Urgency + recap value + final CTA. Not pushy — helpful.

RULES:
- Write like a real person emailing one person. Use "you" a lot. Use "I" sparingly.
- No "leverage", "revolutionize", "game-changer", "unlock"
- Every email must feel worth opening
- Vary sentence length. Short paragraphs. Mobile-friendly.
- If product is B2B SaaS: professional but warm. If e-commerce: casual and fun.

End with:
NOTES: (1-2 tips for customizing this sequence for their specific business)`;

export async function generateEmailSequence(req: {
  product: string;
  audience: string;
  tone: string;
  benefit: string;
}): Promise<{ emails: { subject: string; body: string; cta: string }[]; notes: string }> {
  const prompt = PROMPT
    .replace("{{PRODUCT}}", req.product)
    .replace("{{AUDIENCE}}", req.audience || "potential customers")
    .replace("{{TONE}}", req.tone || "warm and professional")
    .replace("{{BENEFIT}}", req.benefit || "solves a real problem");

  const raw = await callAI(prompt, 2500, 0.85);
  if (!raw || raw.length < 200) throw new Error("Generation too short");

  const emails: { subject: string; body: string; cta: string }[] = [];
  let notes = "";

  // Parse email blocks
  const blocks = raw.split(/Email \d[:\s]/i).filter(Boolean);
  for (const block of blocks) {
    const subjectMatch = block.match(/(?:Subject|SUBJECT):\s*(.+)/i);
    const ctaMatch = block.match(/(?:CTA|Call.to.Action):\s*(.+)/i);
    let body = block
      .replace(/(?:Subject|SUBJECT):\s*.+/i, "")
      .replace(/(?:CTA|Call.to.Action):\s*.+/i, "")
      .trim();
    if (body && body.length > 20) {
      emails.push({
        subject: subjectMatch?.[1]?.trim() || "Email from us",
        body,
        cta: ctaMatch?.[1]?.trim() || "Reply to this email",
      });
    }
  }

  // Fallback: split by double newlines if parsing failed
  if (emails.length < 2) {
    const parts = raw.split(/\n\n(?=Email|\d\.|Subject)/i).filter((p) => p.length > 30);
    for (let i = 0; i < Math.min(parts.length, 5); i++) {
      const subj = parts[i].match(/(?:Subject|SUBJECT):\s*(.+)/i);
      emails.push({
        subject: subj?.[1]?.trim() || `Email ${i + 1}`,
        body: parts[i].replace(/(?:Subject|SUBJECT):\s*.+/i, "").trim(),
        cta: "Reply or click through",
      });
    }
  }

  // Extract notes
  const notesMatch = raw.match(/NOTES:\s*([\s\S]+)$/i);
  if (notesMatch) notes = notesMatch[1].trim();

  return { emails: emails.slice(0, 5), notes };
}
