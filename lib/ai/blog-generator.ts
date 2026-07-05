/**
 * 博客文章生成器
 * OpenRouter API → Claude Sonnet
 */
import { BLOG_GENERATION_PROMPT } from "./prompts";

const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY || "";
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

interface BlogRequest {
  topic: string;
  keyword: string;
  secondaryKeywords: string[];
  audience: string;
  tone: string;
}

interface BlogResult {
  title: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  slug: string;
  seoScore: number;
}

function parseBlogOutput(raw: string): {
  content: string;
  seoTitle: string;
  seoDescription: string;
  slug: string;
} {
  const content = raw
    .replace(/^SEO_TITLE:.*$/gm, "")
    .replace(/^SEO_DESC:.*$/gm, "")
    .replace(/^SLUG:.*$/gm, "")
    .replace(/^KEYWORD_DENSITY:.*$/gm, "")
    .trim();
  const seoTitleMatch = raw.match(/^SEO_TITLE:\s*(.+)$/m);
  const seoDescMatch = raw.match(/^SEO_DESC:\s*(.+)$/m);
  const slugMatch = raw.match(/^SLUG:\s*(.+)$/m);
  return {
    content,
    seoTitle: seoTitleMatch?.[1]?.trim() || "",
    seoDescription: seoDescMatch?.[1]?.trim() || "",
    slug: slugMatch?.[1]?.trim() || "",
  };
}

async function callClaude(prompt: string): Promise<string> {
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
      max_tokens: 3000,
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

interface SEOScoreInput {
  content: string;
  keyword: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
}

function calculateSEOScore(input: SEOScoreInput): number {
  const { content, keyword, title, seoTitle, seoDescription } = input;
  const keywordLower = keyword.toLowerCase();
  const bodyLower = content.toLowerCase();
  const wordCount = content.split(/\s+/).length;
  const sentences = content.split(/[.!?]+/).filter(Boolean);

  // 1. Keyword in title (20%)
  let score = 0;
  if (title.toLowerCase().includes(keywordLower)) score += 20;

  // 2. Keyword in first 100 words (15%)
  const first100 = bodyLower.split(/\s+/).slice(0, 100).join(" ");
  if (first100.includes(keywordLower)) score += 15;

  // 3. Content length — 800+ words (15%)
  if (wordCount >= 800) score += 15;
  else if (wordCount >= 500) score += 8;

  // 4. Heading structure — has H2s (15%)
  const h2Count = (content.match(/^##\s/gm) || []).length;
  if (h2Count >= 4) score += 15;
  else if (h2Count >= 2) score += 8;
  else if (h2Count >= 1) score += 4;

  // 5. Readability — avg sentence length (10%)
  const avgWordsPerSentence = wordCount / Math.max(sentences.length, 1);
  if (avgWordsPerSentence <= 20) score += 10;
  else if (avgWordsPerSentence <= 25) score += 5;

  // 6. Meta completeness (10%)
  if (seoTitle.length >= 20 && seoTitle.length <= 60) score += 5;
  if (seoDescription.length >= 50 && seoDescription.length <= 160) score += 5;

  // 7. Keyword density 1-3% (10%)
  const keywordOccurrences = (bodyLower.match(new RegExp(keywordLower.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length;
  const density = (keywordOccurrences / Math.max(wordCount, 1)) * 100;
  if (density >= 1 && density <= 3) score += 10;
  else if (density > 0.5 && density < 5) score += 5;

  // 8. AI fluff detector — penalty (up to -5)
  const fluffPhrases = [
    "in today's", "fast-paced world", "ever-evolving landscape",
    "unlock", "revolutionize", "game-changer", "skyrocket", "supercharge",
    "leverage", "utilize", "synergize", "robust", "cutting-edge",
  ];
  const fluffCount = fluffPhrases.filter((p) => bodyLower.includes(p)).length;
  score -= Math.min(fluffCount * 3, 5);

  return Math.max(0, Math.min(100, Math.round(score)));
}

export interface StreamEvent {
  type: "chunk" | "done";
  content?: string;
  title?: string;
  seoTitle?: string;
  seoDescription?: string;
  slug?: string;
  seoScore?: number;
}

export async function* streamBlogPost(
  request: BlogRequest
): AsyncGenerator<StreamEvent> {
  const prompt = BLOG_GENERATION_PROMPT
    .replace("{{TOPIC}}", request.topic)
    .replace("{{KEYWORD}}", request.keyword)
    .replace("{{SECONDARY_KEYWORDS}}", request.secondaryKeywords.join(", ") || "none")
    .replace("{{AUDIENCE}}", request.audience || "small business owners")
    .replace("{{TONE}}", request.tone || "professional and direct");

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
      max_tokens: 3000,
      temperature: 0.7,
      stream: true,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter error ${res.status}: ${err}`);
  }

  let fullText = "";
  const reader = res.body?.getReader();
  if (!reader) throw new Error("No response body");

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const data = line.slice(6);
      if (data === "[DONE]") continue;

      try {
        const parsed = JSON.parse(data);
        const delta = parsed.choices?.[0]?.delta?.content;
        if (delta) {
          fullText += delta;
          yield { type: "chunk", content: delta };
        }
      } catch {
        // skip unparseable lines
      }
    }
  }

  if (!fullText || fullText.length < 200) {
    throw new Error("AI generation too short. Please try again.");
  }

  const { content, seoTitle, seoDescription, slug } = parseBlogOutput(fullText);
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch?.[1] || request.topic;

  const seoScore = calculateSEOScore({
    content,
    keyword: request.keyword,
    title,
    seoTitle,
    seoDescription,
  });

  yield {
    type: "done",
    title,
    content: content.replace(/^#\s+.+\n?/, "").trim(),
    seoTitle: seoTitle || title,
    seoDescription,
    slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    seoScore,
  };
}

export async function generateBlogPost(
  request: BlogRequest
): Promise<BlogResult> {
  const prompt = BLOG_GENERATION_PROMPT
    .replace("{{TOPIC}}", request.topic)
    .replace("{{KEYWORD}}", request.keyword)
    .replace("{{SECONDARY_KEYWORDS}}", request.secondaryKeywords.join(", ") || "none")
    .replace("{{AUDIENCE}}", request.audience || "small business owners")
    .replace("{{TONE}}", request.tone || "professional and direct");

  const rawOutput = await callClaude(prompt);

  if (!rawOutput || rawOutput.length < 200) {
    throw new Error("AI generation too short. Please try again.");
  }

  const { content, seoTitle, seoDescription, slug } = parseBlogOutput(rawOutput);
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch?.[1] || request.topic;

  const seoScore = calculateSEOScore({
    content,
    keyword: request.keyword,
    title,
    seoTitle,
    seoDescription,
  });

  return {
    title,
    content: content.replace(/^#\s+.+\n?/, "").trim(),
    seoTitle: seoTitle || title,
    seoDescription,
    slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    seoScore,
  };
}
