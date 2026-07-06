"use client";

import { useState } from "react";
import { CheckCircle, Copy, Star, ShoppingBag, Sparkles, Search, Zap } from "lucide-react";

const BEFORE_AFTER = {
  bad: "Bamboo Desk Organizer - High quality desk organizer made from bamboo. Perfect for organizing your office supplies. Durable and stylish design. Buy now!",
  good: "Tired of reaching for a pen and finding last week's coffee stain instead? Our Bamboo Desk Organizer brings order to chaos — with 5 dedicated compartments, a built-in phone stand, and natural bamboo that actually looks good on your desk. 2,000+ five-star reviews can't be wrong: this is the last organizer you'll ever buy.",
};

const TESTIMONIALS = [
  { name: "Maria Santos", role: "Amazon FBA Seller, 3 brands", text: "I list 20+ products a month. Writing descriptions was my bottleneck. Now I paste features → get an optimized listing → tweak and publish. Listing time cut by 80%.", stars: 5 },
  { name: "Kevin O'Brien", role: "Shopify Store Owner", text: "My descriptions used to be 'high quality [product]. buy now.' Now they actually rank. Organic traffic to product pages up 35% in 2 months. The SEO title + meta generator alone saves me hours.", stars: 5 },
  { name: "Lisa Chang", role: "Etsy Shop Owner, 500+ sales", text: "Etsy SEO is different from Amazon. This tool gives me platform-specific descriptions that match how people actually search on each marketplace. Game changer for multi-channel sellers.", stars: 4 },
];

const PLATFORMS = ["Amazon", "Shopify", "Etsy", "eBay", "Walmart"];

export default function ProductPage() {
  const [name, setName] = useState(""); const [category, setCategory] = useState(""); const [features, setFeatures] = useState("");
  const [customer, setCustomer] = useState(""); const [platform, setPlatform] = useState("Amazon");
  const [result, setResult] = useState<{ title: string; body: string; specs: string; seoTitle: string; seoDesc: string } | null>(null);
  const [loading, setLoading] = useState(false); const [error, setError] = useState(""); const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) { e.preventDefault(); if (!name.trim()) return; setLoading(true); setError(""); setResult(null);
    try { const res = await fetch("/p/product/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, category, features, customer, platform }) }); const data = await res.json(); if (!res.ok) throw new Error(data.error); setResult(data); } catch (err: any) { setError(err.message); } finally { setLoading(false); } }

  return (
    <main className="bg-white">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-24 pb-10 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-teal-700 bg-teal-50 px-3 py-1 rounded-full mb-6"><ShoppingBag size={12} /> Product description generator</div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-3 leading-tight">Product descriptions that <span className="text-teal-600">sell. And rank.</span></h1>
        <p className="text-gray-500 max-w-lg mx-auto mb-8 text-sm sm:text-base">One product → one SEO-optimized listing. Works for Amazon, Shopify, Etsy, and more. Stop writing "high quality product" and start converting.</p>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white border-2 border-teal-100 rounded-2xl p-5 sm:p-6 shadow-sm text-left">
          <div className="space-y-3">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product name *" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" required />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
              <input type="text" value={customer} onChange={(e) => setCustomer(e.target.value)} placeholder="Target customer" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
            </div>
            <textarea value={features} onChange={(e) => setFeatures(e.target.value)} rows={3} placeholder="Key features & benefits" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 resize-y" />
            <div><label className="text-xs text-gray-500 mb-1.5 block">Target platform</label>
              <div className="flex flex-wrap gap-1.5">
                {PLATFORMS.map(p => <button key={p} type="button" onClick={() => setPlatform(p)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${platform===p?"bg-teal-600 text-white":"bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{p}</button>)}
              </div>
            </div>
          </div>
          <button type="submit" disabled={loading||!name.trim()} className="w-full mt-4 bg-teal-600 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-teal-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base">
            {loading?"Generating...":<>Generate Description <Sparkles size={16} /></>}
          </button>
          <p className="text-xs text-gray-400 mt-3 text-center">3 free / day · No sign-up</p>
          {error&&<div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600">{error}</div>}
        </form>
      </section>

      {result && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
          <div className="bg-white border-2 border-teal-100 rounded-2xl p-5 sm:p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <h3 className="font-bold">{result.title}</h3>
              <button onClick={() => { navigator.clipboard.writeText(`${result.title}\n\n${result.body}\n\nSpecs:\n${result.specs}\n\nSEO: ${result.seoTitle}\nMeta: ${result.seoDesc}`); setCopied(true); setTimeout(()=>setCopied(false),2000); }}
                className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 font-medium transition-colors">
                {copied?<CheckCircle size={16}/>:<Copy size={16}/>}{copied?"Copied!":"Copy All"}
              </button>
            </div>
            <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed mb-4">{result.body}</div>
            {result.specs&&<div className="bg-gray-50 rounded-xl p-4 mb-4"><p className="text-xs text-gray-400 mb-1">Specifications</p><p className="text-sm text-gray-700 whitespace-pre-wrap">{result.specs}</p></div>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-gray-50 rounded-lg p-3"><span className="text-gray-400">SEO Title: </span><span className="text-gray-700">{result.seoTitle}</span></div>
              <div className="bg-gray-50 rounded-lg p-3"><span className="text-gray-400">Meta Desc: </span><span className="text-gray-700">{result.seoDesc}</span></div>
            </div>
          </div>
        </section>
      )}

      {!result && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
          <div className="text-center mb-8"><h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">"High quality product. Buy now." Doesn't cut it anymore.</h2><p className="text-gray-500 text-sm">Same product. Two descriptions. One converts.</p></div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
              <p className="text-xs font-semibold text-red-600 mb-3">❌ Generic Description (0 SEO value)</p>
              <p className="text-sm text-red-700 bg-white rounded-xl p-4 leading-relaxed">{BEFORE_AFTER.bad}</p>
              <ul className="mt-3 space-y-1 text-xs text-red-600"><li>· No keywords</li><li>· Zero emotion</li><li>· "High quality" = says nothing</li></ul>
            </div>
            <div className="bg-teal-50 border-2 border-teal-200 rounded-2xl p-5">
              <p className="text-xs font-semibold text-teal-700 mb-3">✅ SEO-Optimized (Built to rank + convert)</p>
              <p className="text-sm text-teal-900 bg-white rounded-xl p-4 leading-relaxed">{BEFORE_AFTER.good}</p>
              <ul className="mt-3 space-y-1 text-xs text-teal-700"><li>· Opens with pain point</li><li>· Keywords woven naturally</li><li>· Social proof ("2,000+ reviews")</li></ul>
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-4 text-center mb-10">
            {[{v:"Amazon",l:"Optimized"}, {v:"Shopify",l:"Optimized"}, {v:"Etsy+",l:"Supported"}].map(s=>(<div key={s.l} className="bg-teal-50 rounded-xl p-4"><div className="text-xl sm:text-2xl font-bold text-teal-600">{s.v}</div><p className="text-xs text-gray-500 mt-1">{s.l}</p></div>))}
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t,i)=>(
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-teal-200 hover:shadow-sm transition-all">
                <div className="flex gap-1 mb-2">{Array.from({length:t.stars}).map((_,j)=><Star key={j} size={11} className="text-yellow-400 fill-yellow-400"/>)}</div>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">&ldquo;{t.text}&rdquo;</p>
                <p className="text-xs font-semibold">{t.name}</p><p className="text-xs text-gray-400">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-8"><div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-xs text-gray-400 mb-2">More free tools from SEO Spark</p>
        <div className="flex flex-wrap justify-center gap-1.5">
          {[["/","📝 Blog"],["/p/proposal","🎯 Proposals"],["/p/faq","❓ FAQ"],["/p/email","📬 Emails"],["/p/cold-email","📧 Cold"]].map(([h,l])=>(<a key={h} href={h} className="bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-500 hover:border-teal-300 hover:text-teal-600 transition-all">{l}</a>))}
        </div>
      </div></section>
      <footer className="text-center py-6 text-xs text-gray-400">Product Description Generator — from SEO Spark. Listings that sell. And rank.</footer>
    </main>
  );
}
