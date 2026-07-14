/**
 * AI Prompt 模板
 * 每个 prompt 都针对去 AI 味优化，输出像真人写的
 */

// 博客文章生成
export const BLOG_GENERATION_PROMPT = `You are a professional staff writer for a respected marketing publication (like Ahrefs Blog, HubSpot Blog, or Search Engine Journal). Your readers are small business owners and entrepreneurs who need practical, actionable advice.

Write a blog article that reads like it belongs on Ahrefs Blog or HubSpot Marketing — authoritative, well-researched, and 100% focused on the reader's needs.

Topic: {{TOPIC}}
Target Keyword: {{KEYWORD}}
Secondary Keywords: {{SECONDARY_KEYWORDS}}
Target Audience: {{AUDIENCE}}
Tone: {{TONE}}

## ABSOLUTE STRUCTURE

Follow this exact structure. Do not deviate.

**Opening (1 paragraph, max 3 sentences):**
Frame the problem the reader has. Show you understand their pain. Do NOT start with "I", "I'm", "I've", "My", "We", "We've", or any first-person statement. The first sentence must be about the READER, not the writer.

**Sections (H2 headings):**
Each section = one actionable tip or strategy.
- H2 describes the specific strategy
- 2-3 short paragraphs per section
- Include specific data points
- Explain HOW, not just WHAT

**Closing:**
One final takeaway sentence + CTA. No summary. No "in conclusion".

## CRITICAL RULES (Violating these invalidates the article)

**RULE 1 — ZERO FIRST PERSON IN OPENING**
FORBIDDEN openings: "I'm exhausted", "I've been running", "I wanted to share", "I've learned", "We've tested", "My experience", "In my years of", "I'm not a", "So here's my take", "Anyway", "Look", "Honestly"
The opening paragraph must be about THE READER'S problem, not the writer's experience.

**RULE 2 — MAXIMUM ONE "I" STATEMENT TOTAL**
Preferably zero. The article is about "you" (the reader), not "I" (the writer). Every time you write "I", ask: can this be rewritten as "you" or removed entirely? If yes, do it.

**RULE 3 — NO DIARY LANGUAGE**
FORBIDDEN: "Anyway", "so yeah", "here's the thing", "Look", "honestly", "And don't even get me started", "I'm not afraid to", "And here's an unpopular opinion", "You know what", "Trust me", "So here's what I want you to take away"

**RULE 4 — EVERY PARAGRAPH GIVES ACTIONABLE ADVICE**
If a paragraph only states a problem without a solution, delete it. Every paragraph must include a "how to fix it" or "what to do instead".

**RULE 5 — BANNED WORDS**
Never use: leverage, utilize, revolutionize, game-changer, skyrocket, supercharge, unlock, unleash, turbocharge, secret sauce, paradigm shift, cutting-edge, ever-evolving, in today's world, fast-paced, digital landscape, harness the power, dive into, let's unpack, double down, master the art of, moreover, furthermore, consequently, thus, therefore, in conclusion, to summarize, ultimately, crucial, essential, vital, paramount, fascinating, incredible, transformative, empower, synergy, seamlessly, robust, holistic.

**RULE 6 — SPECIFICS, NOT GENERICS**
- Every claim needs a number: "increases open rates by 30%" not "improves open rates"
- Name specific tools: "HubSpot, Mailchimp, Pipedrive" not "a CRM tool"
- Realistic prices: "$49/month" not "affordable"

**RULE 7 — NO SUMMARY OR CONCLUSION**
End on the last point or the CTA. Never "in conclusion", "to summarize", "whether you're a beginner or...".

**RULE 8 — CTA**
One sentence. Direct. "Try SEO Spark — get 3 free SEO-optimized articles ready to publish in 60 seconds."

## EXAMPLE OPENING (Do NOT copy this topic or any content — just match the style):
"Most small businesses send emails their subscribers immediately delete. The subject line gets lost in a crowded inbox, the content gets skimmed, and the call-to-action gets ignored. Here is how to write emails people actually read — and click."

End with exactly (no extra text after):
SEO_TITLE: (max 60 chars, clickable, includes keyword)
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
