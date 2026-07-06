"use client";

import { useState } from "react";
import { CheckCircle, Copy, Star, ShoppingBag, ArrowRight, Sparkles } from "lucide-react";

const TESTIMONIALS = [
  { name: "Maria Santos", role: "Amazon FBA Seller, 3 brands", text: "I list 20+ new products a month. Writing descriptions was my bottleneck. Now I paste features → get an optimized description → tweak and publish. Cut my listing time by 80%.", stars: 5 },
  { name: "Kevin O'Brien", role: "Shopify Store Owner", text: "My product descriptions used to be 'high quality [product name]. buy now.' SEO Spark's generator gave me descriptions that actually rank. Organic traffic to product pages up 35%.", stars: 5 },
];

const PLATFORMS = ["Amazon", "Shopify", "Etsy", "eBay", "Walmart"];

export default function ProductPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [features, setFeatures] = useState("");
  const [customer, setCustomer] = useState("");
  const [platform, setPlatform] = useState("Amazon");
  const [result, setResult] = useState<{ title: string; body: string; specs: string; seoTitle: string; seoDesc: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); if (!name.trim()) return;
    setLoading(true); setError(""); setResult(null);
    try {
      const res = await fetch("/p/product/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, category, features, customer, platform }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data);
    } catch (err: any) { setError(err.message); }
    finally { setLoading(false); }
  }

  function handleCopy() {
    if (!result) return;
    navigator.clipboard.writeText(`${result.title}\n\n${result.body}\n\nSpecs:\n${result.specs}\n\nSEO Title: ${result.seoTitle}\nMeta: ${result.seoDesc}`);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="bg-white">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-14 sm:pt-24 pb-12 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-teal-700 bg-teal-50 px-3 py-1 rounded-full mb-6"><ShoppingBag size={12} /> Product description generator</div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-3">Product descriptions that <span className="text-teal-600">sell. And rank.</span></h1>
        <p className="text-gray-500 max-w-lg mx-auto mb-8">One product → one SEO-optimized listing. Built for Amazon, Shopify, Etsy, and more. Stop writing "high quality product" and start converting browsers into buyers.</p>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white border-2 border-teal-100 rounded-2xl p-6 shadow-sm text-left">
          <div className="space-y-4">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product name * (e.g. Bamboo Desk Organizer)" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" required />
            <div className="grid sm:grid-cols-2 gap-3">
              <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category (e.g. Office Supplies)" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
              <input type="text" value={customer} onChange={(e) => setCustomer(e.target.value)} placeholder="Target customer" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
            </div>
            <textarea value={features} onChange={(e) => setFeatures(e.target.value)} rows={3} placeholder="Key features & benefits (one per line)" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 resize-y" />
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Target platform</label>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map((p) => (
                  <button key={p} type="button" onClick={() => setPlatform(p)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${platform === p ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{p}</button>
                ))}
              </div>
            </div>
          </div>
          <button type="submit" disabled={loading || !name.trim()} className="w-full mt-5 bg-teal-600 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-teal-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
            {loading ? "Generating..." : <>Generate Description <Sparkles size={16} /></>}
          </button>
          <p className="text-xs text-gray-400 mt-3 text-center">3 free / day · No sign-up</p>
          {error && <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600">{error}</div>}
        </form>
      </section>

      {result && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
          <div className="bg-white border-2 border-teal-100 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">{result.title}</h3>
              <button onClick={handleCopy} className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 font-medium transition-colors">
                {copied ? <CheckCircle size={16} /> : <Copy size={16} />}{copied ? "Copied!" : "Copy All"}
              </button>
            </div>
            <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed mb-4">{result.body}</div>
            {result.specs && <div className="bg-gray-50 rounded-xl p-4 mb-4"><p className="text-xs text-gray-400 mb-1">Specifications</p><p className="text-sm text-gray-700 whitespace-pre-wrap">{result.specs}</p></div>}
            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-gray-50 rounded-lg p-3"><span className="text-gray-400">SEO Title: </span><span className="text-gray-700">{result.seoTitle}</span></div>
              <div className="bg-gray-50 rounded-lg p-3"><span className="text-gray-400">Meta Desc: </span><span className="text-gray-700">{result.seoDesc}</span></div>
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-gray-100 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-6 text-center mb-12">
            {[{ v: "Amazon", l: "Optimized for" }, { v: "Shopify", l: "Optimized for" }, { v: "Etsy + more", l: "Also supported" }].map((s) => (
              <div key={s.l}><div className="text-2xl font-bold text-teal-600">{s.v}</div><p className="text-sm text-gray-500 mt-1">{s.l}</p></div>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6">
                <div className="flex gap-1 mb-2">{Array.from({ length: t.stars }).map((_, j) => <Star key={j} size={12} className="text-yellow-400 fill-yellow-400" />)}</div>
                <p className="text-sm text-gray-600 italic mb-3">&ldquo;{t.text}&rdquo;</p>
                <p className="text-sm font-semibold">{t.name}</p><p className="text-xs text-gray-500">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs text-gray-400 mb-3">More free tools from SEO Spark</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[["/","📝 SEO Spark"],["/p/proposal","🎯 Proposal Gen"],["/p/faq","❓ FAQ Builder"],["/p/email","📬 Email Seq"],["/p/cold-email","📧 Cold Email"]].map(([href, label]) => (
              <a key={href} href={href} className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-medium text-gray-600 hover:border-teal-300 hover:text-teal-600 transition-all">{label}</a>
            ))}
          </div>
        </div>
      </section>

      <footer className="text-center py-6 text-sm text-gray-400">
        <p>Product Description Generator — from SEO Spark. Listings that sell. And rank.</p>
      </footer>
    </main>
  );
}
