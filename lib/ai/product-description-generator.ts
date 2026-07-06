import { callAI } from "./shared";

const PROMPT = `You are an e-commerce copywriter. Write a product description optimized for both conversion and search.

Product Name: {{NAME}}
Product Category: {{CATEGORY}}
Key Features: {{FEATURES}}
Target Customer: {{CUSTOMER}}
Platform: {{PLATFORM}}

Write a product description with:
1. TITLE: Product title optimized for {{PLATFORM}} search (include key specs)
2. HOOK: Open with the customer's pain point or desire. One sentence. Punchy.
3. BODY: 150-250 words. Include:
   - 4-6 key features, each followed by the BENEFIT to the customer
   - One mini customer scenario ("Imagine this: ...")
   - Social proof language (bestseller, customer favorite, etc.)
   - Answer the top 3 buyer objections without naming them
4. SPECS: Quick bullet list of key specs
5. SEO META: Title tag + meta description

RULES:
- No fluff. Every sentence sells or informs.
- Match the platform's tone (Amazon: benefit-heavy. Shopify: brand-led.)
- Include keywords naturally — don't stuff.
- Write at a 7th grade reading level. Short sentences. Scan-friendly.
- Never use: "unleash", "revolutionize", "game-changer", "elevate your", "take your X to the next level"`;

export async function generateProductDescription(req: {
  name: string;
  category: string;
  features: string;
  customer: string;
  platform: string;
}): Promise<{ title: string; body: string; specs: string; seoTitle: string; seoDesc: string }> {
  const prompt = PROMPT
    .replace("{{NAME}}", req.name)
    .replace("{{CATEGORY}}", req.category || "general")
    .replace("{{FEATURES}}", req.features || "high quality, durable, excellent value")
    .replace("{{CUSTOMER}}", req.customer || "online shoppers")
    .replace("{{PLATFORM}}", req.platform || "Amazon");

  const raw = await callAI(prompt, 1500, 0.8);
  if (!raw || raw.length < 100) throw new Error("Generation too short");

  const titleMatch = raw.match(/(?:TITLE|Title):\s*(.+)/i);
  const specsMatch = raw.match(/(?:SPECS|Specifications):\s*([\s\S]+?)(?=SEO|$)/i);
  const seoTitleMatch = raw.match(/(?:SEO TITLE|SEO_TITLE|Meta Title):\s*(.+)/i);
  const seoDescMatch = raw.match(/(?:SEO DESC|SEO_DESC|Meta Description):\s*(.+)/i);

  let body = raw
    .replace(/(?:TITLE|Title):\s*.+/i, "")
    .replace(/(?:SPECS|Specifications):\s*[\s\S]+?(?=SEO|$)/i, "")
    .replace(/(?:SEO TITLE|SEO_TITLE|Meta Title):\s*.+/i, "")
    .replace(/(?:SEO DESC|SEO_DESC|Meta Description):\s*.+/i, "")
    .trim();

  return {
    title: titleMatch?.[1]?.trim() || req.name,
    body: body || raw,
    specs: specsMatch?.[1]?.trim() || "",
    seoTitle: seoTitleMatch?.[1]?.trim() || req.name,
    seoDesc: seoDescMatch?.[1]?.trim() || "",
  };
}
