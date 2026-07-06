import { callAI } from "./shared";

const PROMPT = `You are a B2B sales expert. Write a cold email that gets replies.

Your Company: {{COMPANY}}
Your Product/Service: {{PRODUCT}}
Prospect Company: {{PROSPECT}}
Prospect Role: {{ROLE}}
What You Know About Them: {{RESEARCH}}
Your Value Proposition: {{VALUE}}

Write a cold email following this exact structure:

SUBJECT: (under 40 chars, lowercase preferred, no spam words. Curiosity-driven. Example: "quick question about [their company]" — not "Amazing opportunity!!!")

BODY (80-120 words):
- Line 1: PERSONALIZED HOOK. Reference something specific about THEM. Their recent launch, hiring, funding, podcast appearance, blog post. Prove you did your homework. No "I came across your profile."
- Lines 2-3: CONTEXT. Why you're reaching out to them specifically. Connect their situation to your solution in one sentence.
- Lines 4-5: VALUE. What's in it for them — not what your product does. "You'll get X" not "We offer X."
- Lines 6-7: CTA. Low-friction ask. "Worth a 10-min call?" or "Happy to share a 2-min Loom." Not "Let's schedule a demo."

RULES:
- This is B2B. Professional but human. Not corporate.
- No "hope this email finds you well"
- No "we are a leading provider of..."
- No "I'd love to pick your brain"
- One specific detail about THEIR company per email — minimum
- Assume they're busy. Earn their attention.
- Write like you're emailing a peer, not pitching a superior.

PS LINE (optional): Add social proof or a relevant stat. Keep it under 15 words.`;

export async function generateColdEmail(req: {
  company: string;
  product: string;
  prospect: string;
  role: string;
  research: string;
  value: string;
}): Promise<{ subject: string; body: string }> {
  const prompt = PROMPT
    .replace("{{COMPANY}}", req.company)
    .replace("{{PRODUCT}}", req.product)
    .replace("{{PROSPECT}}", req.prospect)
    .replace("{{ROLE}}", req.role || "decision maker")
    .replace("{{RESEARCH}}", req.research || "research their company before writing")
    .replace("{{VALUE}}", req.value || "save time and money");

  const raw = await callAI(prompt, 800, 0.9);
  if (!raw || raw.length < 50) throw new Error("Generation too short");

  const subjectMatch = raw.match(/(?:SUBJECT|Subject):\s*(.+)/i);
  const subject = subjectMatch?.[1]?.trim() || "Quick question";
  const body = raw.replace(/(?:SUBJECT|Subject):\s*.+/i, "").trim();

  return { subject, body: body || raw };
}
