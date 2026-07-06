"use client";

import { useState } from "react";
import { Sparkles, Globe, CheckCircle, Copy, Zap, Search, FileText } from "lucide-react";

export default function FAQPage() {
  const [url, setUrl] = useState("");
  const [audience, setAudience] = useState("");
  const [result, setResult] = useState<{
    faqs: { category: string; question: string; answer: string }[];
    schema: string;
    siteName: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/p/faq/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, audience }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleCopy(text: string, label: string) {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  }

  function formatFAQsAsText(): string {
    if (!result) return "";
    const sections: Record<string, string[]> = {};
    result.faqs.forEach((faq) => {
      if (!sections[faq.category]) sections[faq.category] = [];
      sections[faq.category].push(`Q: ${faq.question}\nA: ${faq.answer}`);
    });
    return Object.entries(sections)
      .map(([cat, items]) => `### ${cat}\n\n${items.join("\n\n")}`)
      .join("\n\n");
  }

  return (
    <main className="min-h-screen">
      <div className="bg-gray-50 border-b border-gray-100 text-center py-2 text-xs text-gray-400">
        A free tool from the makers of <a href="/" className="text-blue-600 hover:underline">SEO Spark</a>
      </div>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-8 text-center">
        <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          <FileText size={16} />
          Free FAQ generator
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          FAQ pages that rank.
          <br />
          <span className="text-purple-600">Generated from your site.</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto mb-4">
          Your website already has the answers. We turn them into an SEO-optimized FAQ
          page — complete with <strong>schema markup Google loves</strong> — in under a minute.
        </p>
        <p className="text-sm text-gray-400 max-w-xl mx-auto mb-8">
          Most FAQ pages are outdated, incomplete, or don't exist. Yours could be ranking
          in Google's "People Also Ask" by tomorrow. Enter your URL. We do the rest.
        </p>
      </section>

      {/* Form */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 pb-16">
        <form onSubmit={handleGenerate} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website URL <span className="text-red-400">*</span>
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://yourcompany.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <p className="text-xs text-gray-400 mt-1">We'll scan your site content to generate relevant FAQs.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Audience <span className="text-gray-400 text-xs">(optional)</span>
              </label>
              <input
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="e.g. small business owners, SaaS founders"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="w-full mt-5 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>Generating<span className="animate-pulse">...</span></>
            ) : (
              <>Generate FAQ <Search size={18} /></>
            )}
          </button>
          <p className="text-xs text-gray-400 mt-3 text-center">Free beta. No sign-up. Limited daily uses.</p>
        </form>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">FAQ for {result.siteName}</h3>
                  <p className="text-sm text-gray-400">{result.faqs.length} questions across {new Set(result.faqs.map((f) => f.category)).size} categories</p>
                </div>
                <button
                  onClick={() => handleCopy(formatFAQsAsText(), "faqs")}
                  className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  {copied === "faqs" ? <CheckCircle size={16} className="text-green-500" /> : <Copy size={16} />}
                  {copied === "faqs" ? "Copied!" : "Copy All"}
                </button>
              </div>

              {/* Group by category */}
              {(() => {
                const grouped: Record<string, typeof result.faqs> = {};
                result.faqs.forEach((faq) => {
                  if (!grouped[faq.category]) grouped[faq.category] = [];
                  grouped[faq.category].push(faq);
                });
                return Object.entries(grouped).map(([category, items], ci) => (
                  <div key={ci} className="mb-4 last:mb-0">
                    <h4 className="text-sm font-semibold text-purple-600 mb-2">{category}</h4>
                    <div className="space-y-3">
                      {items.map((faq, fi) => (
                        <div key={fi} className="bg-gray-50 rounded-xl p-4">
                          <p className="text-sm font-medium text-gray-900 mb-1">Q: {faq.question}</p>
                          <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ));
              })()}
            </div>

            {/* Schema */}
            {result.schema && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-sm">JSON-LD Schema Markup</h3>
                  <button
                    onClick={() => handleCopy(result.schema, "schema")}
                    className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    {copied === "schema" ? <CheckCircle size={16} className="text-green-500" /> : <Copy size={16} />}
                    {copied === "schema" ? "Copied!" : "Copy Schema"}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mb-3">
                  Paste this into your page's <code className="bg-gray-100 px-1 rounded">&lt;head&gt;</code>. Google uses it to display your FAQs directly in search results.
                </p>
                <pre className="bg-gray-900 text-green-400 text-xs p-4 rounded-xl overflow-x-auto max-h-48">
                  {result.schema}
                </pre>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Why it works */}
      <section className="border-t border-gray-100 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-center mb-10">Why smart sites use FAQ pages</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Globe size={24} />, t: "Show up in 'People Also Ask'", d: "Google pulls FAQ content into search results as rich snippets. A well-structured FAQ page can capture 2-3x the SERP real estate of a normal page." },
              { icon: <Search size={24} />, t: "Rank for long-tail questions", d: "Blog posts target head terms. FAQs capture the exact questions your customers type into Google — the long-tail queries with high purchase intent." },
              { icon: <Zap size={24} />, t: "Reduce support tickets", d: "Every answered FAQ is one less email to your support inbox. SaaS companies report 15-30% fewer repetitive support tickets after publishing comprehensive FAQs." },
            ].map((f) => (
              <div key={f.t} className="text-center">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mx-auto mb-4">{f.icon}</div>
                <h3 className="font-semibold mb-2 text-sm">{f.t}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* vs manual */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-bold text-center mb-2">"Can't I just write my own FAQ?"</h2>
        <p className="text-center text-gray-500 mb-8">Sure. But most people never do. Here's why.</p>
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-2 gap-0">
            <div className="p-6 border-r border-gray-100">
              <p className="text-sm font-semibold text-gray-400 mb-3">DIY FAQ</p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span> Brainstorm questions. Miss half of what customers actually ask.</li>
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span> Write answers. Forget to include keywords. No SEO benefit.</li>
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span> No schema markup. Google ignores your FAQ content.</li>
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span> Outdated in 3 months. Nobody updates it.</li>
              </ul>
            </div>
            <div className="p-6 bg-purple-50/50">
              <p className="text-sm font-semibold text-purple-600 mb-3">FAQ BUILDER</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Scans your site. Generates questions customers actually search.</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> SEO-optimized answers with natural keyword placement.</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> JSON-LD schema included. Google shows your FAQs in search.</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> <strong>Done in 60 seconds. Actually gets published.</strong></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-purple-50 py-12 text-center">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold mb-3">Free during beta. No sign-up.</h2>
          <p className="text-gray-600 mb-6">
            Enter your URL. Get your FAQ. Copy-paste to your site. If it helps, tell a friend.
          </p>
          <p className="text-sm text-gray-400">
            Questions? Feedback?{" "}
            <a href="mailto:seosparknet@gmail.com" className="text-purple-600 hover:underline">seosparknet@gmail.com</a>
          </p>
        </div>
      </section>

      <footer className="text-center py-6 text-sm text-gray-400 border-t border-gray-100">
        <p>Part of the SEO Spark family. Built for sites that want to be found.</p>
        <p className="mt-1">
          <a href="/" className="hover:text-gray-600 underline underline-offset-2">SEO Spark</a>
          <span className="mx-2">·</span>
          <a href="/p/proposal" className="hover:text-gray-600 underline underline-offset-2">Proposal Generator</a>
        </p>
      </footer>
    </main>
  );
}
