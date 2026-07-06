/**
 * FAQ Builder — AI FAQ generator from website content
 * Crawls a URL, extracts content, generates FAQ section
 */

const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY || "";
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const JINA_KEY = process.env.JINA_API_KEY || "";

export const FAQ_GENERATION_PROMPT = `You are an SEO and customer support expert. Generate a comprehensive FAQ section for a website.

WEBSITE NAME: {{SITE_NAME}}
WEBSITE DESCRIPTION: {{DESCRIPTION}}
WEBSITE CONTENT (extracted from site): {{CONTENT}}
TARGET AUDIENCE: {{AUDIENCE}}

Generate 10-15 FAQ questions and answers. Follow these rules:

1. QUESTIONS: Must be REAL questions customers actually ask. Search forums, Reddit, competitor sites to understand what people wonder about this type of product/service.
   - Mix of: pre-purchase questions, how-to questions, troubleshooting, pricing/policy questions
   - Each question should be phrased naturally — how a real person would type it into Google
   - Include 2-3 long-tail question variations that include specific details

2. ANSWERS:
   - 40-80 words each. Concise but complete.
   - Start with the direct answer, then add context.
   - Use the website's own terminology and brand voice.
   - Where relevant, subtly include keywords the question targets.
   - If a question has a nuanced answer, acknowledge the nuance ("It depends on X, but generally...")
   - Never say "contact support" as the only answer — always give the actual answer first.

3. FORMAT:
   - Use proper FAQ schema structure with Q: and A: prefixes
   - Group related questions under category headings

4. SEO OPTIMIZATION:
   - Questions should target real search queries (People Also Ask data)
   - Include natural keyword variations in answers
   - Keep answers scannable — use short paragraphs

Output format:
CATEGORY: [Category Name]
Q: [Question]
A: [Answer]

(Repeat for all questions)

End with:
FAQ_SCHEMA: (JSON-LD FAQ schema markup for all Q&A pairs)`;

interface FAQRequest {
  url: string;
  audience?: string;
}

export interface FAQResult {
  faqs: { category: string; question: string; answer: string }[];
  schema: string;
  siteName: string;
}

async function fetchPageContent(url: string): Promise<string> {
  // Try Jina AI reader first (handles JS-rendered pages)
  if (JINA_KEY) {
    try {
      const jinaRes = await fetch(`https://r.jina.ai/${url}`, {
        headers: { Authorization: `Bearer ${JINA_KEY}` },
        signal: AbortSignal.timeout(15000),
      });
      if (jinaRes.ok) {
        const text = await jinaRes.text();
        if (text && text.length > 200) {
          return text.substring(0, 8000);
        }
      }
    } catch {
      // Fall through to basic fetch
    }
  }

  // Fallback: basic fetch
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; SEO-Spark-FAQ/1.0)" },
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) throw new Error(`Failed to fetch URL: ${res.status}`);

  const html = await res.text();
  // Strip HTML tags, scripts, styles
  const text = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length < 100) throw new Error("Page content too short to analyze");

  return text.substring(0, 8000);
}

function extractSiteName(url: string, content: string): string {
  // Try to extract from title tag or URL
  const titleMatch = content.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) return titleMatch[1].trim();

  try {
    const hostname = new URL(url).hostname;
    return hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

async function callAI(prompt: string): Promise<string> {
  const res = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENROUTER_KEY}`,
      "HTTP-Referer": "https://seospark.net",
      "X-Title": "SEO Spark",
    },
    body: JSON.stringify({
      model: "meta-llama/llama-4-maverick",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2000,
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

export async function generateFAQ(request: FAQRequest): Promise<FAQResult> {
  // 1. Fetch page content
  const rawContent = await fetchPageContent(request.url);

  // 2. Extract site name
  const siteName = extractSiteName(request.url, rawContent);

  // 3. Generate description from first 500 chars
  const description = rawContent.substring(0, 500);

  // 4. Generate FAQs
  const prompt = FAQ_GENERATION_PROMPT
    .replace("{{SITE_NAME}}", siteName)
    .replace("{{DESCRIPTION}}", description)
    .replace("{{CONTENT}}", rawContent)
    .replace("{{AUDIENCE}}", request.audience || "website visitors and potential customers");

  const rawOutput = await callAI(prompt);

  if (!rawOutput || rawOutput.length < 100) {
    throw new Error("FAQ generation too short. Please try again.");
  }

  // 5. Parse output
  const faqs: { category: string; question: string; answer: string }[] = [];
  let currentCategory = "General";
  let schema = "";

  const lines = rawOutput.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    if (line.startsWith("CATEGORY:")) {
      currentCategory = line.replace("CATEGORY:", "").trim();
    } else if (line.startsWith("Q:") || line.startsWith("Q：")) {
      const question = line.replace(/^Q[：:]\s*/, "").trim();
      const answerLines: string[] = [];

      // Collect answer from following lines until next Q: or CATEGORY:
      let j = i + 1;
      while (j < lines.length) {
        const nextLine = lines[j].trim();
        if (nextLine.startsWith("Q:") || nextLine.startsWith("Q：") || nextLine.startsWith("CATEGORY:") || nextLine.startsWith("FAQ_SCHEMA:")) break;
        if (nextLine.startsWith("A:") || nextLine.startsWith("A：")) {
          answerLines.push(nextLine.replace(/^A[：:]\s*/, "").trim());
        } else if (answerLines.length > 0) {
          answerLines.push(nextLine);
        }
        j++;
      }
      i = j - 1;

      if (question && answerLines.length > 0) {
        faqs.push({
          category: currentCategory,
          question,
          answer: answerLines.join(" "),
        });
      }
    } else if (line.startsWith("FAQ_SCHEMA:")) {
      // Collect schema from following lines
      const schemaLines: string[] = [];
      let j = i + 1;
      while (j < lines.length) {
        schemaLines.push(lines[j]);
        j++;
      }
      schema = schemaLines.join("\n").trim();
    }
  }

  if (faqs.length === 0) {
    throw new Error("Could not parse FAQs from AI output. Please try again.");
  }

  return { faqs, schema, siteName };
}
