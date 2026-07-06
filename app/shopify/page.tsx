"use client";

import { useState } from "react";

export default function ShopifyPage() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!keyword.trim()) return;
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/shopify/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: keyword.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/" className="text-sm text-gray-500 hover:text-gray-900">&larr; SEO Spark</a>
          <span className="font-bold text-lg">SEO Spark for Shopify</span>
          <div className="w-16" />
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">AI Blog Posts for Your Shopify Store</h1>
          <p className="text-gray-500">Generate SEO-optimized blog posts. Copy, paste, publish.</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Target keyword, e.g. summer fashion trends"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            />
            <button
              onClick={handleGenerate}
              disabled={loading || !keyword.trim()}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 whitespace-nowrap"
            >
              {loading ? "Writing..." : "Generate"}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-3">3 free articles. No credit card.</p>
          {error && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>
          )}
        </div>

        {loading && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500">Writing your blog post...</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-400">SEO Score </span>
                <span className={`text-2xl font-bold ml-2 ${result.seoScore >= 50 ? "text-green-600" : "text-yellow-600"}`}>
                  {result.seoScore}/100
                </span>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(`# ${result.title}\n\n${result.content}`)}
                className="text-sm px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                Copy
              </button>
            </div>
            <article className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4">{result.title}</h2>
              <div
                className="prose max-w-none text-sm leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: result.content
                    .replace(/### /g, "<h3>")
                    .replace(/## /g, "<h2>")
                    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                    .replace(/\n\n/g, "<br><br>"),
                }}
              />
            </article>
          </div>
        )}
      </div>
    </div>
  );
}
