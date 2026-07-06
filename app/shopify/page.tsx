"use client";

import { useState, useEffect } from "react";
import { Send, RefreshCw, Check, Copy } from "lucide-react";

interface Result {
  title: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  slug: string;
  seoScore: number;
}

export default function ShopifyPage() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const c = document.cookie.match(/shopify_used=(\d+)/);
    setRemaining(c ? Math.max(0, 3 - parseInt(c[1])) : 3);
  }, []);

  const handleGenerate = async () => {
    if (!keyword.trim()) return;
    setError("");
    setLoading(true);
    setResult(null);
    setQuotaExceeded(false);

    try {
      const res = await fetch("/api/shopify/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: keyword.trim() }),
      });
      if (res.status === 402) { setQuotaExceeded(true); setLoading(false); return; }
      if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.error || "Failed"); }
      const data = await res.json();
      setResult(data);
      const c = document.cookie.match(/shopify_used=(\d+)/);
      const used = c ? parseInt(c[1]) + 1 : 1;
      document.cookie = `shopify_used=${used};max-age=31536000;path=/`;
      setRemaining(Math.max(0, 3 - used));
      if (used >= 3) setQuotaExceeded(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
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
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <input type="text" placeholder="Target keyword, e.g. summer fashion trends"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={keyword} onChange={e => setKeyword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleGenerate()} />
            <button onClick={handleGenerate} disabled={loading || !keyword.trim()}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 whitespace-nowrap">
              {loading ? <><RefreshCw size={16} className="animate-spin" />Writing...</> : <><Send size={16} />Generate</>}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">3 free articles. No credit card.</span>
            {remaining !== null && !quotaExceeded && (
              <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{remaining} left</span>
            )}
          </div>

          {error && <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>}
          {quotaExceeded && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
              <p className="font-semibold text-yellow-800 mb-1">Free limit reached</p>
              <p className="text-sm text-yellow-600 mb-3">3 articles generated. Upgrade for unlimited.</p>
              <div className="space-y-2">
                <a href="https://paypal.me/seospark151/9" target="_blank" className="block w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700">Pro — $9.99/month</a>
                <a href="https://paypal.me/seospark151/29" target="_blank" className="block w-full bg-gray-100 text-gray-900 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-200">Agency — $29/month (3 stores)</a>
              </div>
            </div>
          )}
        </div>

        {loading && !result && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <RefreshCw size={32} className="animate-spin mx-auto mb-4 text-blue-500" />
            <p className="text-gray-500">Writing your blog post...</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-400">SEO Score </span>
                <span className={`text-2xl font-bold ml-2 ${result.seoScore >= 50 ? "text-green-600" : "text-yellow-600"}`}>{result.seoScore}/100</span>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(`# ${result.title}\n\n${result.content}`); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}{copied ? "Copied" : "Copy"}
              </button>
            </div>
            <article className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4">{result.title}</h2>
              <div className="prose max-w-none text-sm leading-relaxed whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: result.content.replace(/^### (.+)$/gm, "<h3 class='text-lg font-semibold mt-4 mb-2'>$1</h3>").replace(/^## (.+)$/gm, "<h2 class='text-xl font-bold mt-6 mb-3'>$1</h2>").replace(/^# (.+)$/gm, "<h1 class='text-2xl font-bold mt-4 mb-4'>$1</h1>").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/^- (.+)$/gm, "<li class='ml-4'>$1</li>").replace(/\n\n/g, "<br/><br/>") }} />
            </article>
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-sm text-gray-500 space-y-1">
              <p><strong>SEO Title:</strong> {result.seoTitle}</p>
              <p><strong>Meta:</strong> {result.seoDescription}</p>
              <p><strong>Slug:</strong> {result.slug}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
