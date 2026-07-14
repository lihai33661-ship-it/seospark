/**
 * Proposal Generator — AI pitch writer for freelancers
 * OpenRouter primary → SiliconFlow fallback
 */
import { callAI } from "./shared";

export const PROPOSAL_PROMPT = `You are a top-earning freelancer on Upwork who wins 40% of proposals. You write pitches that get interviews.

Write a winning proposal for the following job:

JOB TITLE: {{TITLE}}
JOB DESCRIPTION: {{DESCRIPTION}}
CLIENT NAME: {{CLIENT}}
FREELANCER SKILLS: {{SKILLS}}
FREELANCER NAME: {{NAME}}

STRUCTURE:
1. HOOK (first 2 lines): Reference something SPECIFIC from their job post. Show you actually read it. Do NOT say "I read your job posting" — just prove it by what you say next.
2. WHY ME: One paragraph. Connect your specific skills to their specific problem. Use concrete past project examples. No generic "I'm passionate about" or "I'm a hard worker."
3. MY APPROACH: 3 bullet points — how you'd tackle this project, step by step. Be specific enough that they can picture working with you.
4. QUESTIONS: Ask 1-2 smart questions about the project. This shows expertise and starts a conversation. Bad: "What's your budget?" Good: "Are you targeting iOS 18's new widget system or keeping it compatible with iOS 17?"
5. CTA: End with a low-friction next step. "Happy to hop on a 10-min call" or "I can send over a quick Loom video walking through my approach."

RULES:
- Max 250 words. Tight > long. Clients skim.
- Zero fluff words: no "passionate", "synergy", "leverage", "game-changer"
- Write like a human, not a template. Every proposal should feel custom.
- Match the client's tone: if they're casual, be casual. If they're formal, be formal.
- If client name is blank, don't force a greeting — just launch into the hook.

CRITICAL ANTI-PATTERNS TO AVOID:
- "Dear Sir/Madam" or any generic greeting
- "I am writing to express my interest in..."
- "I believe I am the perfect fit for this role"
- "I have X years of experience in..."
- Listing skills without connecting them to the client's problem
- Proposals that could be sent to ANY job posting`;

interface ProposalRequest {
  title: string;
  description: string;
  client?: string;
  skills?: string;
  name?: string;
}

export interface ProposalResult {
  content: string;
  subjectLine: string;
}

export async function generateProposal(
  request: ProposalRequest
): Promise<ProposalResult> {
  const prompt = PROPOSAL_PROMPT
    .replace("{{TITLE}}", request.title)
    .replace("{{DESCRIPTION}}", request.description)
    .replace("{{CLIENT}}", request.client || "")
    .replace("{{SKILLS}}", request.skills || "see portfolio")
    .replace("{{NAME}}", request.name || "");

  const rawOutput = await callAI(prompt);

  if (!rawOutput || rawOutput.length < 50) {
    throw new Error("Generation too short. Please try again.");
  }

  // Extract subject line from first line or generate one
  const lines = rawOutput.trim().split("\n");
  let subjectLine = "";
  let content = rawOutput.trim();

  // Try to extract subject line if it starts with "Subject:" or similar
  const subjectMatch = rawOutput.match(/^(?:Subject|SUBJECT|subject):\s*(.+)$/m);
  if (subjectMatch) {
    subjectLine = subjectMatch[1].trim();
    content = rawOutput.replace(/^(?:Subject|SUBJECT|subject):\s*.+\n?/m, "").trim();
  } else if (lines[0] && lines[0].length < 80 && !lines[0].startsWith("Hi") && !lines[0].startsWith("Hello") && !lines[0].startsWith("Hey") && !lines[0].startsWith("Dear")) {
    // First line might be a subject if it's short and not a greeting
    subjectLine = lines[0].trim();
    content = lines.slice(1).join("\n").trim();
  } else {
    subjectLine = `Re: ${request.title}`;
  }

  return { content, subjectLine };
}
