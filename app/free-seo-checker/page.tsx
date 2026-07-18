"use client";

import { useState } from "react";
import { Search, ArrowRight, CheckCircle, AlertTriangle, ExternalLink } from "lucide-react";

export default function FreeSEOChecker() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const analyze = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/free-seo-checker/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Analysis failed"); return; }
      setResult(data);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-3xl mx-auto px-6 py-16 sm:py-20">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Free SEO Checker
        </h1>
        <p className="text-gray-400 mb-8 text-lg">Enter any website URL to get an instant on-page SEO analysis.</p>

        {/* Input */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="text"
            placeholder="Enter website URL... (e.g. yoursite.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && analyze()}
            className="flex-1 px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          />
          <button onClick={analyze} disabled={loading}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white px-8 py-3.5 rounded-xl font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2">
            {loading ? "Analyzing..." : "Check SEO Score"} {!loading && <Search size={18} />}
          </button>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm mb-8">{error}</div>}

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Score */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">SEO Score</p>
              <div className="text-6xl font-bold mb-2">
                <span className={result.gradeColor}>{result.score}</span>
                <span className="text-gray-600">/100</span>
              </div>
              <p className={`text-lg font-semibold ${result.gradeColor}`}>Grade {result.grade}</p>
              <p className="text-sm text-gray-500 mt-1">{result.url}</p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Title", val: result.title ? "Present" : "Missing", ok: !!result.title },
                { label: "Meta Desc", val: result.desc ? "Present" : "Missing", ok: !!result.desc },
                { label: "Word Count", val: result.wordCount, ok: result.wordCount >= 300 },
                { label: "H1 Tags", val: result.issues?.some((i: string) => i.includes("H1")) ? "Issue" : "OK", ok: !result.issues?.some((i: string) => i.includes("H1")) },
              ].map((stat) => (
                <div key={stat.label} className={`rounded-xl p-4 text-center border ${stat.ok ? "bg-green-500/5 border-green-500/20" : "bg-red-500/5 border-red-500/20"}`}>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                  <p className={`font-semibold mt-1 ${stat.ok ? "text-green-400" : "text-red-400"}`}>{stat.val}</p>
                </div>
              ))}
            </div>

            {/* Issues */}
            {result.issues?.length > 0 && (
              <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-5">
                <h3 className="font-semibold text-red-400 mb-3 flex items-center gap-2"><AlertTriangle size={16} /> Issues to Fix</h3>
                <ul className="space-y-2">{result.issues.map((i: string, idx: number) => <li key={idx} className="text-sm text-gray-400 flex items-start gap-2"><span className="text-red-400 mt-1">•</span>{i}</li>)}</ul>
              </div>
            )}

            {/* Passed */}
            {result.passed?.length > 0 && (
              <div className="bg-green-500/5 border border-green-500/10 rounded-xl p-5">
                <h3 className="font-semibold text-green-400 mb-3 flex items-center gap-2"><CheckCircle size={16} /> What's Working</h3>
                <ul className="space-y-2">{result.passed.map((i: string, idx: number) => <li key={idx} className="text-sm text-gray-400 flex items-start gap-2"><span className="text-green-400 mt-1">•</span>{i}</li>)}</ul>
              </div>
            )}

            {/* CTA */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-purple-500/20 rounded-2xl p-6 text-center">
              <h3 className="font-semibold text-lg mb-2">Want better scores automatically?</h3>
              <p className="text-sm text-gray-400 mb-4">{result.recommendation}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href="/dashboard" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-400 hover:to-purple-400 transition-all">
                  Try SEO Spark Free <ArrowRight size={18} />
                </a>
                <a href="/blog/free-seo-audit-small-business" className="inline-flex items-center gap-2 text-gray-400 hover:text-white px-4 py-3 text-sm transition-all">
                  Read the SEO audit guide →
                </a>
              </div>
              <p className="text-xs text-gray-500 mt-3">3 free articles. No credit card. 60 seconds each.</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
