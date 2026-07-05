"use client";

import { useState, useEffect } from "react";
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
  const [leadEmail, setLeadEmail] = useState("");
  const [leadSaved, setLeadSaved] = useState(false);
  const [savingLead, setSavingLead] = useState(false);
  const [history, setHistory] = useState<{ id: string; title: string; keywords: string; createdAt: string }[]>([]);

  // Load history on mount
  useEffect(() => {
    fetch("/api/history")
      .then((r) => r.json())
      .then((data) => setHistory(data || []))
      .catch(() => {});
  }, []);

  const handleSaveLead = async () => {
    if (!leadEmail.includes("@")) return;
    setSavingLead(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: leadEmail }),
      });
      setLeadSaved(true);
    } catch {}
    setSavingLead(false);
  };

  const handleGenerate = async () => {
    if (!keyword.trim()) {
      setError("Please enter at least a keyword");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    setQuotaExceeded(false);

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
      });

      if (res.status === 402) {
        setQuotaExceeded(true);
        setLoading(false);
        return;
      }
      if (!res.ok) {
        let errMsg = "Generation failed";
        try {
          const err = await res.json();
          errMsg = err.error || errMsg;
        } catch {}
        throw new Error(errMsg);
      }

      // ===== Streaming reader =====
      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();
      let buffer = "";
      let streamedContent = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const event = JSON.parse(line);
            if (event.type === "chunk" && event.content) {
              streamedContent += event.content;
              setResult({
                title: "",
                content: streamedContent,
                seoTitle: "",
                seoDescription: "",
                slug: "",
                seoScore: 0,
              });
            } else if (event.type === "done") {
              streamDone = true;
              setResult({
                title: event.title,
                content: event.content,
                seoTitle: event.seoTitle || event.title,
                seoDescription: event.seoDescription,
                slug: event.slug,
                seoScore: event.seoScore,
              });
              if (typeof event.remaining === "number") {
                setRemaining(event.remaining);
              }
            } else if (event.type === "error") {
              throw new Error(event.error);
            }
          } catch (parseErr) {
            if (parseErr instanceof SyntaxError) continue;
            throw parseErr;
          }
        }
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again."
      );
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

      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6 lg:py-8 flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-80 lg:shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 p-5 lg:sticky lg:top-24">
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
                {remaining === 0
                  ? "Last free article"
                  : remaining === 2
                  ? `${remaining} free articles remaining`
                  : remaining === 1
                  ? "1 free article left. Like it? Upgrade below."
                  : null}
              </p>
            )}
            {quotaExceeded && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                <p className="text-sm font-semibold text-yellow-800 mb-2">Free limit reached</p>
                {!leadSaved ? (
                  <>
                    <p className="text-xs text-yellow-600 mb-3">3 free articles used. Enter your email to unlock Pro.</p>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="email"
                        placeholder="you@company.com"
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSaveLead()}
                      />
                      <button
                        onClick={handleSaveLead}
                        disabled={savingLead || !leadEmail.includes("@")}
                        className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 whitespace-nowrap"
                      >
                        {savingLead ? "Saving..." : "Continue"}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-xs text-green-600 mb-3">Got it! Choose your plan:</p>
                    <div className="space-y-2">
                      <a href="https://paypal.me/seospark151/9" className="block w-full bg-blue-600 text-white text-sm px-4 py-2 rounded-lg font-semibold hover:bg-blue-700">
                        Pro — $9 first month (launch)
                      </a>
                      <a href="https://paypal.me/seospark151/79" className="block w-full bg-green-500 text-white text-sm px-4 py-2 rounded-lg font-semibold hover:bg-green-600">
                        Lifetime — $79 one-time
                      </a>
                    </div>
                    <a href="/#pricing" className="inline-block text-xs text-gray-400 mt-3 hover:text-gray-600 underline">
                      Compare plans
                    </a>
                  </>
                )}
              </div>
            )}
          </div>

          {history.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                Recent articles
              </h3>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {history.slice(0, 5).map((h) => (
                  <a
                    key={h.id}
                    href={`/dashboard?keyword=${encodeURIComponent(h.keywords)}`}
                    className="block text-sm text-gray-600 hover:text-blue-600 truncate py-1"
                  >
                    {h.title}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          {loading && !result && (
            <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-12 text-center">
              <RefreshCw size={32} className="animate-spin mx-auto mb-4 text-blue-500" />
              <p className="text-gray-500">Writing your article...</p>
              <p className="text-sm text-gray-400 mt-1">
                Researching, outlining, writing, optimizing SEO — about 30 seconds.
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-4">
              {!loading && result.seoScore > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <BarChart3 size={20} />
                    <span className="font-medium">SEO Score</span>
                  </div>
                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <span className={`text-2xl font-bold ${getScoreColor(result.seoScore)}`}>
                      {result.seoScore}/100
                    </span>
                    <button
                      onClick={handleCopy}
                      className="bg-gray-100 text-gray-900 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm flex items-center gap-2"
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
              )}

              <article className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 lg:p-8">
                {result.title && (
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">{result.title}</h1>
                )}
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: renderContent(result.content) }}
                />
              </article>

              {loading && (
                <div className="flex items-center gap-2 text-sm text-blue-500 px-2">
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Writing...</span>
                </div>
              )}

              {!loading && result.seoTitle && (
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <h3 className="font-semibold mb-3 text-sm text-gray-500 uppercase tracking-wide">
                    SEO Metadata
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="break-words">
                      <span className="text-gray-400">Title: </span>
                      <span className="text-gray-700">{result.seoTitle}</span>
                    </div>
                    <div className="break-words">
                      <span className="text-gray-400">Description: </span>
                      <span className="text-gray-700">{result.seoDescription}</span>
                    </div>
                    <div className="break-words">
                      <span className="text-gray-400">Slug: </span>
                      <span className="text-gray-700">{result.slug}</span>
                    </div>
                  </div>
                </div>
              )}

              {!loading && result.seoScore > 0 && remaining !== null && remaining <= 1 && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                  <p className="text-sm font-semibold text-blue-800 mb-2">
                    {remaining === 0 ? "Last free article! Get unlimited:" : "Like the quality? Get Pro for $9:"}
                  </p>
                  <a
                    href="https://paypal.me/seospark151/9"
                    className="inline-block bg-blue-600 text-white text-sm px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
                  >
                    Upgrade to Pro — $9 first month
                  </a>
                </div>
              )}
            </div>
          )}

          {!loading && !result && !error && (
            <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-12 text-center">
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
