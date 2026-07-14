/**
 * AI Prompt 模板
 * 每个 prompt 都针对去 AI 味优化，输出像真人写的
 */

// 博客文章生成
export const BLOG_GENERATION_PROMPT = `You are writing a blog post for a marketing publication like Ahrefs Blog or HubSpot Blog. The topic is "{{TOPIC}}", targeting the keyword "{{KEYWORD}}".

YOUR FIRST PARAGRAPH MUST BE THE FOLLOWING TEXT. COPY IT EXACTLY. DO NOT CHANGE A SINGLE WORD:

"Most {{AUDIENCE}} spend time on marketing tactics that don't deliver results. The problem isn't effort — it's following advice designed for Fortune 500 companies with different audiences and budgets. Here is what actually works."

AFTER the opening above, write 4-6 H2 sections. Each section covers one actionable tip. Follow these rules:

1. Write about "you" (the reader), not "I" or "we". Zero first-person. Every time you write "I", stop and rewrite.
2. Short paragraphs (2-3 sentences). Use bullet points where helpful.
3. Every tip needs a specific number or data point. Name real tools (Mailchimp, HubSpot, Pipedrive). Give real prices.
4. H2s are descriptive: "How to Build a List That Converts" not "Building Your List".
5. After the H2 sections, write ONE sentence as a closing takeaway. Then the CTA exactly: "Try SEO Spark — get 3 free SEO-optimized articles ready to publish in 60 seconds."
6. BANNED PHRASES: "I'm exhausted", "I've been", "My experience", "Here's the thing", "Look", "honestly", "you know what", "Anyway", "And don't even get me started", "I'm not afraid to", "unpopular opinion", "garbage", "Let's be real", "The bottom line", "At the end of the day", "It's that simple", "Trust me".

End with exactly (no extra text after the CTA):
SEO_TITLE: (max 60 chars, includes keyword, makes someone click)
SEO_DESC: (140-160 chars, includes keyword, describes value, makes someone click)
SLUG: (short url slug, use hyphens)`;

// 电商产品描述生成
export const PRODUCT_DESCRIPTION_PROMPT = `You are a product copywriter. Write a product description that sells.

Product: {{PRODUCT}}
Category: {{CATEGORY}}
Target Keywords: {{KEYWORDS}}
Brand Voice: {{BRAND_VOICE}}

Rules:
1. Open with a pain question or benefit statement. Sharp. 1 sentence.
2. 4-6 features, each with what it means for the customer.
3. Social proof: "our bestseller" or "customers keep coming back for".
4. Answer 3 objections buyers have before purchasing.
5. CTA with urgency.
6. Length: 200-350 words.

SEO:
SEO_TITLE:
SEO_DESC:
KEYWORDS:`;

// 落地页文案生成
export const LANDING_PAGE_PROMPT = `You are a conversion copywriter.

Product/Service: {{PRODUCT}}
Unique Value Proposition: {{UVP}}
Target Customer: {{CUSTOMER}}
Desired Action: {{ACTION}}

Write:
1. Hero: Headline (under 12 words), subheadline (under 20), CTA (2-4 words)
2. Problem section: in customer's own words
3. Solution: 3 key benefits
4. Social proof: testimonial format + stats
5. Pricing: 3-tier table
6. FAQ: 5 objections with short answers
7. Final CTA

Style: Direct. No fluff. Every word earns its place.`;

// SEO 评分 prompt
export const SEO_ANALYSIS_PROMPT = `Analyze this content for SEO. Be strict.

Content:
{{CONTENT}}
Target Keyword: {{KEYWORD}}

Score 1-10 for each:
1. KEYWORD_PLACEMENT: In title? First 100 words? At least one H2?
2. READABILITY: Short paragraphs? Bullet lists? 8th-10th grade level?
3. STRUCTURE: Clear H2/H3 hierarchy? Each section has a point?
4. CONTENT_DEPTH: Real examples? Data? Or just generic advice?
5. ENGAGEMENT: Does it hook? Does it keep attention?
6. AI_DETECTION: Any AI-sounding phrases? (-2 per occurrence)

Output:
SCORES: (each dimension with score)
TOTAL: X/60
AI_PHRASES_FOUND: (list any AI phrases found)
IMPROVEMENTS: (3 specific fixes)
PASS_FAIL: (PASS if >= 42/60)`;
