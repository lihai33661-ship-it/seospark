import { callAI } from "./shared";

const PROMPT = `You are a YouTube SEO strategist who helps faceless/animated channels grow. You specialize in nostalgic, relaxing, no-dialogue animation videos.

Video Topic: {{TOPIC}}
Target Audience: {{AUDIENCE}}
Video Length: {{LENGTH}} minutes

Generate a complete YouTube SEO package for this video.

=== PART 1: FILE NAME ===
Generate ONE optimized file name. Format: lowercase-keywords-with-hyphens. Include the main keyword. Max 60 chars. No underscores.

=== PART 2: TITLES (10 options) ===
Write 10 YouTube titles. Each title must:
- Include the main keyword naturally
- Create emotional curiosity or nostalgia
- Under 60 characters each
- No clickbait — deliver on the promise
- First 3 words should hook attention

Format: one title per line, numbered 1-10.

=== PART 3: DESCRIPTION ===
Write a YouTube description (150-200 words) that:
- First 2 lines (appear above the fold): Hook + what this video shows
- 3-4 short paragraphs
- Include relevant emojis (2-3 max)
- Naturally include 3-4 related keywords
- End with a channel call-to-action ("Subscribe for more...")

=== PART 4: TAGS (30 tags) ===
Generate 30 SEO tags:
- 5 broad tags (e.g., nostalgia, relaxation)
- 10 medium tags related to the topic
- 15 long-tail specific tags
- Separate with commas
- All lowercase

=== PART 5: HASHTAGS ===
Generate 10 hashtags based on the topic. Format each with # prefix.

OUTPUT FORMAT:
Return JSON only, no markdown:
{
  "fileName": "string",
  "titles": ["title1", "title2", ...],
  "description": "string",
  "tags": "comma, separated, tags",
  "hashtags": ["#tag1", "#tag2", ...]
}\`;

export async function generateYouTubeSEO(req: {
  topic: string;
  audience: string;
  length: string;
}): Promise<{
  fileName: string;
  titles: string[];
  description: string;
  tags: string;
  hashtags: string[];
}> {
  const prompt = PROMPT
    .replace("{{TOPIC}}", req.topic)
    .replace("{{AUDIENCE}}", req.audience || "people who enjoy relaxing nostalgic content")
    .replace("{{LENGTH}}", req.length || "10");

  const raw = await callAI(prompt, 2000, 0.8);
  if (!raw || raw.length < 100) throw new Error("Generation too short");

  try {
    const parsed = JSON.parse(raw);
    return {
      fileName: parsed.fileName || "video-file-name",
      titles: Array.isArray(parsed.titles) ? parsed.titles.slice(0, 10) : [],
      description: parsed.description || "",
      tags: parsed.tags || "",
      hashtags: Array.isArray(parsed.hashtags) ? parsed.hashtags.slice(0, 10) : [],
    };
  } catch {
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        fileName: parsed.fileName || "video-file-name",
        titles: Array.isArray(parsed.titles) ? parsed.titles.slice(0, 10) : [],
        description: parsed.description || "",
        tags: parsed.tags || "",
        hashtags: Array.isArray(parsed.hashtags) ? parsed.hashtags.slice(0, 10) : [],
      };
    }
    throw new Error("Failed to parse generated content");
  }
}
