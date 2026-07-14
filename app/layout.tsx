import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SEO Spark — Free AI Blog Writer | Human-Like Articles in 60 Seconds | Get Found on Google",
  description:
    "AI blog writer that sounds human — not robotic. One keyword → publish-ready article in 60 seconds. LLM-powered, human-fine-tuned. ChatGPT writes words — we write premium content that ranks on Google. Free tier: 3 articles, no credit card.",
  keywords: [
    // AI / LLM 类
    "AI blog writer",
    "AI content generator",
    "LLM content writing",
    "AI writing assistant",
    "large language model writing",
    "GPT powered blog writer",
    "natural language generation",
    "AI article generator",
    // 人工调教 / 像人写的
    "human-like AI writer",
    "AI that writes like a human",
    "undetectable AI content",
    "natural sounding articles",
    "human quality AI writing",
    "AI content that passes AI detection",
    "realistic AI generated text",
    // 60秒 / 速度类
    "60 second blog post",
    "instant article generator",
    "fast content creation",
    "one click blog writer",
    "rapid blog generation",
    "automated article writing",
    // 精品文案 / 质量类
    "premium content generator",
    "high quality AI articles",
    "professional blog writer",
    "ready to publish content",
    "publish ready articles",
    // 用户需求 / 使用场景
    "get found on Google",
    "rank higher on Google",
    "blog writing for small business",
    "content marketing automation",
    "stop paying freelance writers",
    "cheaper than hiring a writer",
    "ChatGPT alternative for blogging",
    // 核心品牌
    "SEO Spark",
    "free SEO blog generator",
  ],
  openGraph: {
    title: "SEO Spark — Free AI Blog Writer | Human-Like Articles in 60 Seconds",
    description:
      "LLM-powered blog writer that sounds human. One keyword → publish-ready article with built-in SEO scoring. 3 free articles.",
    url: "https://seospark.net",
    siteName: "SEO Spark",
    type: "website",
    images: [
      {
        url: "https://seospark.net/opengraph-image",
        width: 1200,
        height: 630,
        alt: "SEO Spark — AI Blog Writer That Sounds Human, Ranks on Google",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Spark — AI Blog Writer | Human-Like, 60 Seconds, Ranks on Google",
    description:
      "AI that writes like a human. One keyword → publish-ready article. LLM-powered, human-fine-tuned. 3 free articles.",
    images: ["https://seospark.net/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" translate="no">
      <head>
        <meta name="waffo-verify" content="dc62beb2369b20dfc4071e5d6c3904ec" />
      </head>
      <body className="min-h-screen bg-white">{children}<Analytics />
        <script src="https://www.paypal.com/sdk/js?client-id=BAALIuslbSLAy66TdJFteD02EYYFVjmSAOWRcI1pUrbxQV9VQXKPL-lNghgoug6-oB32OVLFHUqlweqOSs&components=hosted-buttons&disable-funding=venmo&currency=USD"></script>
      </body>
    </html>
  );
}
