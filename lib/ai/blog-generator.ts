/**
 * 博客文章生成器
 * 调用 DeepSeek API（Anthropic 兼容接口）生成 SEO 优化的博客文章
 */
import Anthropic from "@anthropic-ai/sdk";
import { BLOG_GENERATION_PROMPT, SEO_ANALYSIS_PROMPT } from "./prompts";

const anthropic = new Anthropic({
  apiKey: process.env.DEEPSEEK_API_KEY || "",
  baseURL: "https://api.deepseek.com/anthropic",
});

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

/**
 * 解析 AI 原始输出，提取各部分
 */
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

/**
 * 生成博客文章
 */
export async function generateBlogPost(
  request: BlogRequest
): Promise<BlogResult> {
  const prompt = BLOG_GENERATION_PROMPT.replace("{{TOPIC}}", request.topic)
    .replace("{{KEYWORD}}", request.keyword)
    .replace(
      "{{SECONDARY_KEYWORDS}}",
      request.secondaryKeywords.join(", ") || "none"
    )
    .replace("{{AUDIENCE}}", request.audience || "general business audience")
    .replace("{{TONE}}", request.tone || "professional and helpful");

  const response = await anthropic.messages.create({
    model: "deepseek-v4-pro",
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  });

  // DeepSeek 返回可能夹 thinking 块，找 text 类型的 content
  const textBlock = response.content.find((c) => c.type === "text");
  const rawOutput = textBlock?.type === "text" ? textBlock.text : "";

  if (!rawOutput) {
    throw new Error("AI 生成失败，返回为空");
  }

  const { content, seoTitle, seoDescription, slug } = parseBlogOutput(rawOutput);

  // 提取标题（第一个 # 标题）
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch?.[1] || request.topic;

  // SEO 评分
  const seoScore = await analyzeSEO(content, request.keyword);

  return {
    title,
    content: content.replace(/^#\s+.+\n?/, "").trim(), // 去掉已提取的标题
    seoTitle: seoTitle || title,
    seoDescription,
    slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    seoScore,
  };
}

/**
 * SEO 评分
 */
async function analyzeSEO(content: string, keyword: string): Promise<number> {
  try {
    const prompt = SEO_ANALYSIS_PROMPT.replace("{{CONTENT}}", content).replace(
      "{{KEYWORD}}",
      keyword
    );

    const response = await anthropic.messages.create({
      model: "deepseek-v4-flash",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const textBlock = response.content.find((c) => c.type === "text");
    const text = textBlock?.type === "text" ? textBlock.text : "";

    const totalMatch = text.match(/TOTAL:\s*(\d+)/);
    const score = totalMatch ? parseInt(totalMatch[1]) : 35;

    return Math.min(score, 100);
  } catch {
    return 35; // 默认中等分
  }
}
