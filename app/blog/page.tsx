import Link from "next/link";

const POSTS = [
  {
    slug: "free-seo-audit-small-business",
    title: "Free SEO Audit for Small Business — Check Your Site's Score in 10 Seconds",
    excerpt: "Use our free SEO checker to audit any website instantly. See exactly what's hurting your Google rankings and how to fix it — no signup, no credit card.",
    date: "2026-07-18",
  },
  {
    slug: "automate-seo-content-saas",
    title: "How to Automate SEO Content for Your SaaS — A No-Fluff Guide for Indie Hackers",
    excerpt: "I spent 3 months building an automated SEO content system for my SaaS. Here's exactly how it works — the tools, the workflow, and what I'd do differently.",
    date: "2026-07-14",
  },
  {
    slug: "why-small-business-blogs-dont-rank",
    title: "I Analyzed 200 Small Business Blogs. Here's Why 96% Don't Rank on Google",
    excerpt: "I spent a weekend analyzing 200 small business blogs to find out why most never get any Google traffic. The answer surprised me — and it's not what you think.",
    date: "2026-07-14",
  },
  {
    slug: "seo-for-startups",
    title: "SEO for Startups — How to Get Your First 1000 Organic Visitors",
    excerpt: "Complete SEO strategy for early-stage startups. Keyword strategy, content velocity, and the AI tools that make organic traffic possible without a marketing budget.",
    date: "2026-07-08",
  },
  {
    slug: "content-marketing-strategy-small-business",
    title: "Content Marketing Strategy for Small Business (2026 Edition)",
    excerpt: "Step-by-step content marketing strategy for small businesses. Plan, create, and distribute blog content that ranks on Google without a full marketing team.",
    date: "2026-07-08",
  },
  {
    slug: "how-to-rank-on-google-2026",
    title: "How to Rank on Google in 2026: A Small Business Guide",
    excerpt: "Practical guide to Google ranking for small businesses. Learn EEAT signals, keyword strategy, and how to write content that actually shows up in search results.",
    date: "2026-07-08",
  },
  {
    slug: "organic-traffic-tips-2026",
    title: "How to Get Organic Traffic — 7 Strategies That Actually Work",
    excerpt: "7 proven strategies to increase organic website traffic without paid ads. SEO, content marketing, AI blog writing, and backlink building for small businesses.",
    date: "2026-07-08",
  },
  {
    slug: "ai-seo-trends-2026",
    title: "AI SEO Trends 2026: How AI Is Changing Google Rankings",
    excerpt: "The biggest AI SEO trends reshaping search. AI-generated content guidelines, EEAT evolution, and how small businesses can stay ahead of Google algorithm changes.",
    date: "2026-07-08",
  },
  {
    slug: "ai-writing-tools-for-small-business",
    title: "5 Best AI Blog Writers for Small Business — 2026 Comparison",
    excerpt: "Compare the best AI writing tools for small business SEO. ChatGPT, Jasper, Koala, and SEO Spark — features, pricing, and which one actually gets you found on Google.",
    date: "2026-07-08",
  },
  {
    slug: "best-free-blog-writing-tools",
    title: "Best Free Blog Writing Tools in 2026",
    excerpt: "Compare the best free blog writing tools. AI content generators, SEO scoring tools, and writing assistants — all with free tiers.",
    date: "2026-07-08",
  },
  {
    slug: "small-business-google-ranking-guide",
    title: "Small Business Guide to Google Rankings: What Matters in 2026",
    excerpt: "EEAT signals, keyword strategy, and content structure — the three things small businesses need to get right to show up on Google.",
    date: "2026-07-07",
  },
  {
    slug: "how-to-write-seo-content-small-business",
    title: "How to Write SEO Content for Your Small Business (Without Hiring a Writer)",
    excerpt: "A practical guide to writing blog posts that rank on Google — even if you're not a professional writer or SEO expert.",
    date: "2026-07-07",
  },
  {
    slug: "ai-seo-tools-comparison-2026",
    title: "ChatGPT vs SEO Writing Tools: What Actually Ranks on Google in 2026",
    excerpt: "We tested ChatGPT, Jasper, and SEO-specific AI writers. Here's which one produces content that actually shows up in search results.",
    date: "2026-07-07",
  },
  {
    slug: "what-is-eeat-seo",
    title: "What Is EEAT in SEO? A Simple Guide for Small Business Owners",
    excerpt: "Learn what Google EEAT signals mean for your small business website. How to demonstrate Experience, Expertise, Authoritativeness, and Trustworthiness in every article.",
    date: "2026-07-08",
  },
  {
    slug: "blog-writing-for-small-business-guide",
    title: "Blog Writing for Small Business: Get Found on Google Without a Marketing Team",
    excerpt: "Complete guide to blog writing for small business owners. Learn how to write SEO-optimized articles in 60 seconds — no marketing team, no $500/post budget required.",
    date: "2026-07-08",
  },
  {
    slug: "ai-vs-human-content-2026",
    title: "AI vs Human Writing in 2026: Can Google Tell the Difference?",
    excerpt: "Can Google detect AI-generated content? The truth about AI detection, EEAT signals, and how to make AI-written articles sound human and rank on Google.",
    date: "2026-07-08",
  },
  {
    slug: "free-seo-tools-small-business",
    title: "7 Free SEO Tools for Small Business That Actually Work in 2026",
    excerpt: "Don't pay for expensive SEO software. These 7 free tools cover keyword research, content writing, and analytics — everything a small business needs to rank.",
    date: "2026-07-08",
  },
  {
    slug: "how-to-write-meta-descriptions",
    title: "How to Write Meta Descriptions That Get Clicks",
    excerpt: "Learn how to write compelling meta descriptions that increase Google click-through rates. Templates, best practices, and AI-powered meta description generation.",
    date: "2026-07-08",
  },
  {
    slug: "blog-post-length-for-seo",
    title: "Blog Post Length for SEO: How Long Should Your Articles Be?",
    excerpt: "Does blog post length affect Google rankings? The truth about word count, depth, and what actually moves the needle for SEO — with data-backed recommendations.",
    date: "2026-07-08",
  },
  {
    slug: "keyword-research-small-business",
    title: "Keyword Research for Small Business: Find What Your Customers Search",
    excerpt: "Simple keyword research guide for small business owners. No expensive tools needed — learn how to find the search terms your customers use.",
    date: "2026-07-08",
  },
  {
    slug: "local-seo-small-business",
    title: "Local SEO for Small Business: Get Found in Your Neighborhood",
    excerpt: "Complete local SEO guide. Optimize your Google Business Profile, get local backlinks, and write location-specific blog content that ranks in local search.",
    date: "2026-07-08",
  },
  {
    slug: "how-often-should-business-blog",
    title: "How Often Should a Small Business Blog?",
    excerpt: "How many blog posts per week does your small business need to see SEO results? Data-backed publishing frequency guide with AI-powered workflow tips.",
    date: "2026-07-08",
  },
  {
    slug: "seo-mistakes-small-business",
    title: "7 SEO Mistakes Small Businesses Make (And How to Fix Them)",
    excerpt: "Most small businesses make the same SEO mistakes. Learn the 7 most common ones — from ignoring EEAT to keyword stuffing — and exactly how to fix each.",
    date: "2026-07-08",
  },
  {
    slug: "benefits-of-blogging-for-business",
    title: "Benefits of Blogging for Business: Why Your Small Business Needs a Blog",
    excerpt: "Discover why blogging is the highest-ROI marketing channel. Real data on traffic, leads, and customer trust — and how to start in 60 seconds with AI.",
    date: "2026-07-08",
  },
  {
    slug: "small-business-marketing-automation",
    title: "Marketing Automation for Small Business: 5 AI Tools That Save 10+ Hours Weekly",
    excerpt: "Small business marketing automation tools that save time and drive results. AI blog writing, email automation, social scheduling — automate the repetitive stuff.",
    date: "2026-07-08",
  },
  {
    slug: "content-writing-vs-copywriting",
    title: "Content Writing vs Copywriting: What Your Business Actually Needs",
    excerpt: "Content writing attracts. Copywriting converts. Learn the difference and how to use both for your small business marketing strategy.",
    date: "2026-07-08",
  },
  {
    slug: "evergreen-content-guide",
    title: "Evergreen Content: Write Blog Posts That Rank for Years",
    excerpt: "Evergreen content brings consistent traffic year after year. Learn what topics work best and how to structure timeless articles that don't expire.",
    date: "2026-07-08",
  },
  {
    slug: "blog-traffic-tips",
    title: "10 Proven Ways to Increase Blog Traffic (No Paid Ads Required)",
    excerpt: "10 proven strategies to increase your blog traffic without spending money on ads. SEO, social distribution, email marketing, and AI content creation.",
    date: "2026-07-08",
  },
  {
    slug: "content-distribution-strategy",
    title: "Content Distribution: What to Do After You Hit Publish",
    excerpt: "Publishing is only 20% of the work. Learn a complete content distribution strategy to get maximum reach from every blog post you write.",
    date: "2026-07-08",
  },
  {
    slug: "blog-topic-ideas-generator",
    title: "Blog Topic Ideas: 50+ Subjects Your Small Business Blog Should Cover",
    excerpt: "Stuck on what to write? Get 50+ blog topic ideas organized by format — plus a system for generating unlimited content ideas from customer questions.",
    date: "2026-07-08",
  },
  {
    slug: "content-marketing-roi",
    title: "Content Marketing ROI: Is Your Blog Actually Making Money?",
    excerpt: "How to calculate content marketing ROI for your small business. Track organic traffic, leads, conversions, and revenue from your SEO content investment.",
    date: "2026-07-08",
  },
  {
    slug: "blog-images-seo-guide",
    title: "Blog Images SEO: Optimize Your Images for Google Rankings",
    excerpt: "Learn how to optimize blog images for SEO. Alt text best practices, compression, WebP format, and how images affect your Google rankings.",
    date: "2026-07-08",
  },
  {
    slug: "online-business-tools-2026",
    title: "20+ Best Online Business Tools for 2026 (All Free or Affordable)",
    excerpt: "The ultimate list of online business tools. AI writing, SEO, email marketing, design, project management — all with free tiers for small business owners.",
    date: "2026-07-08",
  },
  {
    slug: "blog-content-calendar-template",
    title: "Blog Content Calendar: Plan 3 Months of SEO Content",
    excerpt: "Free blog content calendar template and planning guide. Learn how to plan 3 months of SEO-optimized blog content around your target keywords.",
    date: "2026-07-08",
  },
];

export const metadata = {
  title: "SEO Spark Blog — SEO Tips, AI Writing & Content Marketing for Small Business",
  description: "Practical SEO guides and AI writing tips for small business owners. Learn how to write content that ranks on Google, keyword strategy, content marketing, and more.",
};

export default function BlogIndex() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 sm:py-20">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">SEO Spark Blog</h1>
      <p className="text-gray-500 mb-2 text-lg">
        Practical SEO guides for small business owners. 34 articles on AI writing, Google rankings, and content marketing.
      </p>
      <p className="text-sm text-gray-400 mb-10">
        Want a specific topic covered? Email us at{" "}
        <a href="mailto:hello@seospark.net" className="text-blue-600 underline">hello@seospark.net</a>.
      </p>

      <div className="space-y-8">
        {POSTS.map((post) => (
          <article key={post.slug} className="border-b border-gray-100 pb-8">
            <p className="text-sm text-gray-400 mb-2">{post.date}</p>
            <Link href={`/blog/${post.slug}`} className="group">
              <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-500 leading-relaxed">{post.excerpt}</p>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
