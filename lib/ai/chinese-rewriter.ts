/**
 * 中文内容改写引擎
 * 输入原始内容 + 目标平台 → 输出适配该平台风格的改写内容
 */
import { callAI } from "./shared";

const REWRITE_PROMPT = `你是一个专业的中文内容运营专家。将以下内容改写为适合【{{PLATFORM}}】发布的版本。

原始内容：
{{CONTENT}}

改写要求：
- 平台：{{PLATFORM}}
- 字数：{{WORD_COUNT}}字左右
- 风格：{{STYLE}}

你只需要为【{{PLATFORM}}】这一个平台改写，不要生成其他平台的版本。

平台风格指南（仅参考对应平台）：
- 小红书：短句为主，大量分段，emoji点缀，口语化，像闺蜜分享。标题要有吸引力。带2-3个相关标签。
- 公众号：标题抓人，开头引入场景或提问，正文有干货有观点，段落分明。适合深度阅读。结尾引导互动（点赞/在看/转发）。
- 知乎：专业理性，有逻辑结构，引数据或案例佐证。开头直接回答问题。可适当使用"谢邀"体但不强制。
- 抖音/短视频脚本：口语化，节奏快，前3秒必须有钩子。适合口播。标记画面切换和音效提示。

重要：严格遵守以上平台风格，让改写后的内容看起来像是该平台的原生内容。

改写原则：
1. 保留原内容的【核心信息和数据】，不编造
2. 调整【表达方式】以匹配平台用户阅读习惯
3. 增加【平台特有的互动元素】（标签/引导语/emoji等）
4. 如果原内容太长，精炼要点；如果太短，扩充细节
5. 标题必须重写为平台爆款风格

输出格式：
TITLE: （平台适配的标题）
BODY: （改写后的正文）
TAGS: （推荐标签，3-5个）`;

interface RewriteRequest {
  content: string;
  platform: string;
  wordCount?: number;
  style?: string;
}

export async function rewriteChineseContent(req: RewriteRequest): Promise<{
  title: string;
  body: string;
  tags: string;
}> {
  const prompt = REWRITE_PROMPT
    .replace("{{PLATFORM}}", req.platform)
    .replace("{{CONTENT}}", req.content)
    .replace("{{WORD_COUNT}}", String(req.wordCount || 500))
    .replace("{{STYLE}}", req.style || "自动匹配平台风格");

  const raw = await callAI(prompt, 2000, 0.85);
  if (!raw || raw.length < 50) throw new Error("改写失败，请重试");

  const titleMatch = raw.match(/(?:TITLE|标题)[：:]\s*(.+)/i);
  const tagsMatch = raw.match(/(?:TAGS|标签)[：:]\s*(.+)/i);
  const body = raw
    .replace(/(?:TITLE|标题)[：:]\s*.+/i, "")
    .replace(/(?:TAGS|标签)[：:]\s*.+/i, "")
    .replace(/^(?:BODY|正文)[：:]\s*/i, "")
    .trim();

  return {
    title: titleMatch?.[1]?.trim() || "改写标题",
    body: body || raw,
    tags: tagsMatch?.[1]?.trim() || "",
  };
}
