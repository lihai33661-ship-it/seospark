"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Send,
  Copy,
  Check,
  RefreshCw,
  BarChart3,
} from "lucide-react";

interface GenerationResult {
  title: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  slug: string;
  seoScore: number;
}

function getScoreColor(score: number) {
  if (score >= 50) return "text-green-600";
  if (score >= 35) return "text-yellow-600";
  return "text-red-600";
}

function renderContent(text: string): string {
  let html = "";
  const lines = text.split("\n");
  let inList = false;
  let inOrderedList = false;
  let i = 0;

  while (i < lines.length) {
    let line = lines[i];

    // Blank line: close any open list, skip
    if (!line.trim()) {
      if (inList) { html += "</ul>"; inList = false; }
      if (inOrderedList) { html += "</ol>"; inOrderedList = false; }
      i++;
      continue;
    }

    // Headings
    const h3Match = line.match(/^###\s+(.+)/);
    const h2Match = line.match(/^##\s+(.+)/);
    const h1Match = line.match(/^#\s+(.+)/);
    if (h3Match) {
      if (inList) { html += "</ul>"; inList = false; }
      if (inOrderedList) { html += "</ol>"; inOrderedList = false; }
      html += `<h3 class="text-lg font-semibold mt-6 mb-2">${inlineFormat(h3Match[1])}</h3>`;
      i++; continue;
    }
    if (h2Match) {
      if (inList) { html += "</ul>"; inList = false; }
      if (inOrderedList) { html += "</ol>"; inOrderedList = false; }
      html += `<h2 class="text-xl font-bold mt-8 mb-3">${inlineFormat(h2Match[1])}</h2>`;
      i++; continue;
    }
    if (h1Match) {
      if (inList) { html += "</ul>"; inList = false; }
      if (inOrderedList) { html += "</ol>"; inOrderedList = false; }
      html += `<h1 class="text-2xl font-bold mt-6 mb-4">${inlineFormat(h1Match[1])}</h1>`;
      i++; continue;
    }

    // Unordered list
    const ulMatch = line.match(/^[\-\*]\s+(.+)/);
    if (ulMatch) {
      if (inOrderedList) { html += "</ol>"; inOrderedList = false; }
      if (!inList) { html += "<ul class=\"list-disc pl-5 space-y-1 mb-3\">"; inList = true; }
      html += `<li class="leading-relaxed">${inlineFormat(ulMatch[1])}</li>`;
      i++; continue;
    }

    // Ordered list
    const olMatch = line.match(/^\d+[\.\)]\s+(.+)/);
    if (olMatch) {
      if (inList) { html += "</ul>"; inList = false; }
      if (!inOrderedList) { html += "<ol class=\"list-decimal pl-5 space-y-1 mb-3\">"; inOrderedList = true; }
      html += `<li class="leading-relaxed">${inlineFormat(olMatch[1])}</li>`;
      i++; continue;
    }

    // Regular paragraph
    if (inList) { html += "</ul>"; inList = false; }
    if (inOrderedList) { html += "</ol>"; inOrderedList = false; }

    // Collect consecutive non-blank, non-special lines into one paragraph
    let para = line;
    i++;
    while (i < lines.length && lines[i].trim() &&
           !lines[i].match(/^#{1,3}\s/) &&
           !lines[i].match(/^[\-\*]\s/) &&
           !lines[i].match(/^\d+[\.\)]\s/)) {
      para += " " + lines[i].trim();
      i++;
    }
    if (para.trim()) {
      html += `<p class="mb-3 leading-relaxed">${inlineFormat(para)}</p>`;
    }
  }

  if (inList) { html += "</ul>"; }
  if (inOrderedList) { html += "</ol>"; }

  return html || "<p class=\"text-gray-400\">No content generated.</p>";
}

function inlineFormat(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong class=\"font-semibold\">$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code class=\"bg-gray-100 px-1 rounded text-sm\">$1</code>");
}

export function DashboardForm({
  keyword: initialKeyword,
  topic: initialTopic,
}: {
  keyword?: string;
  topic?: string;
}) {
  const [keyword, setKeyword] = useState(initialKeyword || "");
  const [topic, setTopic] = useState(initialTopic || "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  const handleGenerate = async () => {
    if (!keyword.trim()) {
      setError("Please enter at least a keyword");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    setQuotaExceeded(false);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 28000);

    try {
      const res = await fetch("/api/generate/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keyword: keyword.trim(),
          topic: topic.trim() || keyword.trim(),
          secondaryKeywords: [],
          audience: "small business owners and marketers",
          tone: "professional and practical",
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (res.status === 402) {
        setQuotaExceeded(true);
        setLoading(false);
        return;
      }
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Generation failed");
      }

      const data = await res.json();
      setResult(data);
      if (typeof data.remaining === "number") setRemaining(data.remaining);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        setError("Generation timed out. The AI might be busy — please try again.");
      } else {
        setError(
          err instanceof Error ? err.message : "Something went wrong. Try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    const fullText = `# ${result.title}\n\n${result.content}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-900">
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Back to home</span>
          </a>
          <span className="font-bold text-lg">SEO Spark</span>
          <div className="w-20" />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8 flex gap-6">
        <div className="w-80 shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-24">
            <h2 className="font-semibold mb-4">Generate Content</h2>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Keyword *
            </label>
            <input
              type="text"
              placeholder="e.g. email marketing tips"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Topic
            </label>
            <input
              type="text"
              placeholder="e.g. How to grow your list"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            />

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Generate Article
                </>
              )}
            </button>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700 mb-2">{error}</p>
                <button
                  onClick={handleGenerate}
                  className="text-sm text-red-600 underline hover:text-red-800"
                >
                  Try again →
                </button>
              </div>
            )}

            {remaining !== null && (
              <p className="text-xs text-gray-500 mt-4 text-center font-medium">
                {remaining > 0 ? `${remaining} free article${remaining > 1 ? "s" : ""} remaining` : "Last free article"}
              </p>
            )}
            {quotaExceeded && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                <p className="text-sm font-semibold text-yellow-800 mb-2">Free limit reached</p>
                <p className="text-xs text-yellow-600 mb-3">Upgrade to Pro for unlimited articles</p>
                <a href="/#pricing" className="inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded-lg font-semibold hover:bg-blue-700">
                  See plans
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          {loading && (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <RefreshCw size={32} className="animate-spin mx-auto mb-4 text-blue-500" />
              <p className="text-gray-500">Writing your article...</p>
              <p className="text-sm text-gray-400 mt-1">
                Researching, outlining, writing, optimizing SEO — about 30 seconds.
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BarChart3 size={20} />
                  <span className="font-medium">SEO Score</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-2xl font-bold ${getScoreColor(result.seoScore)}`}>
                    {result.seoScore}/100
                  </span>
                  <button
                    onClick={handleCopy}
                    className="bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check size={16} className="text-green-500" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        Copy Article
                      </>
                    )}
                  </button>
                </div>
              </div>

              <article className="bg-white rounded-xl border border-gray-200 p-8">
                <h1 className="text-3xl font-bold mb-6">{result.title}</h1>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: renderContent(result.content) }}
                />
              </article>

              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h3 className="font-semibold mb-3 text-sm text-gray-500 uppercase tracking-wide">
                  SEO Metadata
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-400">Title: </span>
                    <span className="text-gray-700">{result.seoTitle}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Description: </span>
                    <span className="text-gray-700">{result.seoDescription}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Slug: </span>
                    <span className="text-gray-700">{result.slug}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!loading && !result && !error && (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <BarChart3 size={32} className="mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">Enter a keyword and click Generate</p>
              <p className="text-sm text-gray-400 mt-1">
                Your SEO-optimized article will appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
