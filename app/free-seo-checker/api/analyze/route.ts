import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: "URL required" }, { status: 400 });

    const targetUrl = url.startsWith("http") ? url : `https://${url}`;

    // Fetch the page
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const resp = await fetch(targetUrl, {
      headers: { "User-Agent": "SEO-Spark-Checker/1.0" },
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));

    if (!resp.ok) {
      return NextResponse.json({ error: `Could not fetch page (HTTP ${resp.status})` }, { status: 400 });
    }

    const html = await resp.text();

    // ─── Analysis ───────────────────────────────────────
    const issues: string[] = [];
    const passed: string[] = [];
    let score = 100;

    // Title
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : "";
    if (!title) { score -= 20; issues.push("Missing title tag — this is critical for SEO."); }
    else if (title.length < 10) { score -= 10; issues.push(`Title too short (${title.length} chars). Aim for 50-60 characters.`); }
    else if (title.length > 70) { score -= 5; issues.push(`Title too long (${title.length} chars). Keep under 60 characters.`); }
    else { passed.push(`Title tag: "${title}" (${title.length} chars) ✓`); }

    // Meta description
    const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i) ||
                      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i);
    const desc = descMatch ? descMatch[1].trim() : "";
    if (!desc) { score -= 15; issues.push("Missing meta description. Add one to improve click-through rates."); }
    else if (desc.length < 50) { score -= 5; issues.push(`Meta description too short (${desc.length} chars).`); }
    else if (desc.length > 160) { score -= 5; issues.push(`Meta description too long (${desc.length} chars). Keep under 160.`); }
    else { passed.push(`Meta description: "${desc.substring(0, 80)}..." (${desc.length} chars) ✓`); }

    // H1
    const h1Matches = html.match(/<h1[^>]*>([^<]+)<\/h1>/gi) || [];
    if (h1Matches.length === 0) { score -= 15; issues.push("No H1 heading found. Every page should have one H1."); }
    else if (h1Matches.length > 1) { score -= 5; issues.push(`Multiple H1 tags (${h1Matches.length}). Use only one.`); }
    else { passed.push("One H1 tag found ✓"); }

    // Word count
    const textContent = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    const wordCount = textContent.split(/\s+/).length;
    if (wordCount < 300) { score -= 15; issues.push(`Very low word count (${wordCount} words). Google prefers comprehensive content (800+ words).`); }
    else if (wordCount < 800) { score -= 5; issues.push(`Content is a bit thin (${wordCount} words). Aim for 800+ words for better ranking.`); }
    else { passed.push(`Content length: ${wordCount} words ✓`); }

    // Images with alt text
    const imgTags = html.match(/<img[^>]*>/gi) || [];
    const imagesWithAlt = imgTags.filter((img) => /alt=["'][^"']+["']/i.test(img));
    if (imgTags.length > 0 && imagesWithAlt.length < imgTags.length) {
      const missing = imgTags.length - imagesWithAlt.length;
      score -= Math.min(10, missing * 2);
      issues.push(`${missing}/${imgTags.length} images missing alt text.`);
    } else if (imgTags.length > 0) {
      passed.push(`All ${imgTags.length} images have alt text ✓`);
    }

    // Links
    const links = html.match(/<a[^>]+href=["']([^"']+)["'][^>]*>/gi) || [];
    const externalLinks = links.filter((l) => /https?:\/\//i.test(l));
    if (links.length === 0) { issues.push("No links found on page."); }
    else if (externalLinks.length === 0) { issues.push("No external links. Linking to reputable sources helps SEO."); }
    else { passed.push(`${links.length} total links, ${externalLinks.length} external ✓`); }

    // Clamp score
    score = Math.max(0, Math.min(100, score));

    const grade = score >= 80 ? "A" : score >= 60 ? "B" : score >= 40 ? "C" : score >= 20 ? "D" : "F";
    const gradeColor = score >= 80 ? "text-green-500" : score >= 60 ? "text-yellow-500" : "text-red-500";

    return NextResponse.json({
      url: targetUrl,
      score,
      grade,
      gradeColor,
      title,
      desc,
      wordCount,
      issues,
      passed,
      recommendation: score < 80
        ? "Your site has room for improvement. SEO Spark can help — generate SEO-optimized blog posts in 60 seconds with built-in scoring, keyword strategy, and EEAT signals."
        : "Your on-page SEO looks solid! To maintain and grow your rankings, consistently publish fresh, keyword-optimized content. SEO Spark makes it fast — 60 seconds per article.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Analysis failed" },
      { status: 500 }
    );
  }
}
