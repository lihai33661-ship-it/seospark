/**
 * AI Prompt 模板
 * 每个 prompt 都针对 SEO 效果优化，不只是"写一篇文章"
 */

// 博客文章生成
export const BLOG_GENERATION_PROMPT = `You are an expert SEO content writer. Today is July 2026. All facts, stats, and references must be accurate for 2026.

Write a high-quality, original blog post.

Topic: {{TOPIC}}
Target Keyword: {{KEYWORD}}
Secondary Keywords: {{SECONDARY_KEYWORDS}}
Target Audience: {{AUDIENCE}}
Tone: {{TONE}}

HARD REQUIREMENTS - VIOLATING ANY WILL FAIL:
1. LENGTH: Minimum 800 words. No fluff — every paragraph must say something.
2. TITLE: Use this exact format — a how-to or numbered list title under 60 chars. Make it specific. NOT generic like "Guide to X" or "What is X".
3. STATS: Include at least 3 real statistics with specific numbers and sources (e.g. "According to HubSpot's 2026 State of Marketing report..."). If you don't know the exact stat, DON'T make one up — instead use a concrete example with a real company name.
4. EXAMPLES: Include 2-3 specific company/product examples by name. Real companies. Not "a SaaS company" — name them.
5. STRUCTURE:
   - H2: Must be QUESTIONS your reader is actually asking
   - H3: Actionable sub-points under each H2
   - Every section must have a clear takeaway
6. VOICE: Write like a CMO sharing notes with a peer. Direct. No corporate speak. No "leverage", "utilize", "synergize". No "in today's fast-paced world".
7. ORIGINALITY: One section must contain a contrarian opinion or a "most people think X, but actually Y" moment.
8. YEAR: Always use 2026. Never reference 2025 or earlier as "current year".

End with:
SEO_TITLE: (exact search title, max 60 chars)
SEO_DESC: (meta description, 140-160 chars, include keyword)
SLUG: (url slug)

DO NOT use: "unlock", "revolutionize", "game-changer", "skyrocket", "supercharge", "in today's world", "ever-evolving landscape".`;

// 电商产品描述生成
export const PRODUCT_DESCRIPTION_PROMPT = `You are an e-commerce copywriter specializing in product descriptions that convert.

Product: {{PRODUCT}}
Category: {{CATEGORY}}
Target Keywords: {{KEYWORDS}}
Brand Voice: {{BRAND_VOICE}}

Write a product description that:
1. Opens with a pain-point question or vivid benefit statement
2. Lists 4-6 key features, each with the benefit to the customer (not just what it does, but what it means for THEM)
3. Includes social proof language (bestseller, customer favorite, etc.)
4. Answers the 3 objections buyers have before purchasing
5. Ends with urgency or scarcity call-to-action
6. Product title optimized for Amazon/Google Shopping (include key specs)
7. Total length: 250-400 words

SEO Metadata:
SEO_TITLE: (product title for search)
SEO_DESC: (150-char meta description)
KEYWORDS: (comma-separated list)`;

// 落地页文案生成
export const LANDING_PAGE_PROMPT = `You are a conversion copywriter. Write landing page copy.

Product/Service: {{PRODUCT}}
Unique Value Proposition: {{UVP}}
Target Customer: {{CUSTOMER}}
Desired Action: {{ACTION}}

Write:
1. Hero Section:
   - Headline (under 12 words, communicate UVP clearly)
   - Subheadline (under 20 words, expand on headline, add emotional hook)
   - CTA button text (action-oriented, 2-4 words)
2. Problem Section: State the pain in the customer's own words
3. Solution Section: How this product solves it, 3 key benefits
4. Social Proof Section: Testimonial format (even if placeholder), stats
5. Pricing Section: 3-tier pricing table with feature comparison
6. FAQ: 5 common objections + answers
7. Final CTA

Style: Direct. No marketing fluff. Every sentence earns its place.`;

// SEO 评分 prompt
export const SEO_ANALYSIS_PROMPT = `Analyze this content for SEO quality. Be strict.

Content:
{{CONTENT}}
Target Keyword: {{KEYWORD}}

Score each dimension from 1-10:

1. KEYWORD_PLACEMENT: Is the keyword in the title, first paragraph, at least one H2, and naturally throughout? (-2 if in title, -2 if in first 100 words)
2. READABILITY: Short paragraphs? Bullet points used? 8th-10th grade reading level? (-2 if sentences too complex)
3. STRUCTURE: Clear H2/H3 hierarchy? Each section has a point? (-2 if no structure)
4. CONTENT_DEPTH: Specific examples? Data? Or just generic advice? (-3 if generic)
5. ENGAGEMENT: Does it hook? Does it keep attention? Is the CTA clear?
6. AI_DETECTION: Any phrases that sound like AI? ("In today's world", "revolutionize", "unlock potential") (-3 per occurrence)

TOTAL: /60

Output format:
SCORES: (list each dimension with score)
TOTAL: X/60
AI_PHRASES_FOUND: (list any AI-sounding phrases, blank if none)
IMPROVEMENTS: (3 specific changes to improve score by 10+ points)
PASS_FAIL: (PASS if >= 42/60, FAIL if < 42)`;
