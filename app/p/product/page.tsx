"use client";

import { useState } from "react";
import { CheckCircle, Copy, Star, ShoppingBag, Sparkles, Zap, Store, Globe, Package } from "lucide-react";
import { checkClientLimit, recordClientUsage } from "@/lib/client-limit";

const PRODUCT_LIMIT = 3;

const TESTIMONIALS = [
  { name: "Maria Santos", role: "Amazon FBA Seller, 3 brands", text: "I list 20+ products a month. This cut my listing time by 80%. The descriptions actually include keywords customers search — my organic traffic to product pages is up 35%.", stars: 5 },
  { name: "Kevin O'Brien", role: "Shopify Store Owner", text: "My old descriptions were 'high quality [product]. buy now.' SEO Spark gave me listings that convert AND rank. The meta title generator alone saves me 10 minutes per product.", stars: 5 },
  { name: "Lisa Chang", role: "Etsy + Amazon Seller", text: "Each marketplace has different SEO rules. This tool generates platform-specific descriptions — my Etsy listings finally show up in Etsy search, not just Google.", stars: 4 },
];

const WHO_FOR = [
  { icon: <Store size={18} />, title: "Amazon / Etsy sellers", desc: "You know your product is good. But your listing reads like a 5th grader wrote it. Get descriptions that match how people actually search on each platform." },
  { icon: <Globe size={18} />, title: "Shopify / DTC brands", desc: "Your product photos are beautiful. Your words should be too. Brand-led descriptions that tell a story while hitting every SEO mark." },
  { icon: <Package size={18} />, title: "Dropshippers & wholesalers", desc: "Managing hundreds of SKUs? Paste features in bulk. Get consistent, optimized listings across your entire catalog without hiring a copywriter." },
];

const PLATFORMS = ["Amazon", "Shopify", "Etsy", "eBay", "Walmart"];

export default function ProductPage() {
  const [name, setName] = useState(""); const [category, setCategory] = useState(""); const [features, setFeatures] = useState("");
  const [customer, setCustomer] = useState(""); const [platform, setPlatform] = useState("Amazon");
  const [result, setResult] = useState<{ title: string; body: string; specs: string; seoTitle: string; seoDesc: string } | null>(null);
  const [loading, setLoading] = useState(false); const [error, setError] = useState(""); const [copied, setCopied] = useState(false);
  const [showGood, setShowGood] = useState(false);

  async function handleSubmit(e: React.FormEvent) { e.preventDefault(); if (!name.trim()) return;
    const { allowed, remaining } = checkClientLimit("product", PRODUCT_LIMIT);
    if (!allowed) { setError(`You've used all ${PRODUCT_LIMIT} free generations today. Come back tomorrow.`); return; }
    setLoading(true); setError(""); setResult(null);
    try { const res = await fetch("/p/product/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, category, features, customer, platform }) }); const data = await res.json(); if (!res.ok) throw new Error(data.error); recordClientUsage("product"); setResult(data); } catch (err: any) { setError(err.message); } finally { setLoading(false); } }

  const badDesc = "Bamboo Desk Organizer — High quality desk organizer made from premium bamboo. Perfect for organizing your office supplies. Durable and stylish design. Buy now!";
  const goodDesc = "Your desk shouldn't look like a crime scene. Our Bamboo Desk Organizer brings order to chaos — 5 dedicated compartments, a built-in phone stand, and natural bamboo that actually elevates your workspace. 2,000+ five-star reviews. Weighted base so it won't tip when you grab a pen. This is the last organizer you'll ever buy.";

  return (
    <main className="bg-white">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-24 pb-10 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-teal-700 bg-teal-50 px-3 py-1 rounded-full mb-6"><ShoppingBag size={12} /> Product description generator</div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-3 leading-tight">Product descriptions that <span className="text-teal-600">sell and rank.</span></h1>
        <p className="text-gray-500 max-w-lg mx-auto mb-8 text-sm sm:text-base">One product → one SEO-optimized listing. Amazon, Shopify, Etsy, and more. <strong className="text-gray-900">ChatGPT writes words. We write listings that get found and bought.</strong></p>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white border-2 border-teal-100 rounded-2xl p-5 sm:p-6 shadow-sm text-left">
          <div className="space-y-3">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product name *" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" required />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-teal-400 focus:outline-none" />
              <input type="text" value={customer} onChange={(e) => setCustomer(e.target.value)} placeholder="Target customer" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-teal-400 focus:outline-none" />
            </div>
            <textarea value={features} onChange={(e) => setFeatures(e.target.value)} rows={3} placeholder="Key features & benefits" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 resize-y" />
            <div><label className="text-xs text-gray-500 mb-1.5 block">Target platform</label>
              <div className="flex flex-wrap gap-1.5">{PLATFORMS.map(p => <button key={p} type="button" onClick={() => setPlatform(p)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${platform===p?"bg-teal-600 text-white":"bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{p}</button>)}</div>
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
          <div className="text-center mb-8"><h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">One of these sells. The other collects dust.</h2><p className="text-gray-500 text-sm">Same product. Tap to see the difference.</p></div>
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 rounded-xl p-1 inline-flex">
              <button onClick={() => setShowGood(false)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${!showGood?"bg-white shadow text-red-600":"text-gray-500"}`}>❌ Generic</button>
              <button onClick={() => setShowGood(true)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${showGood?"bg-white shadow text-teal-600":"text-gray-500"}`}>✅ SEO Optimized</button>
            </div>
          </div>
          <div className={`max-w-lg mx-auto rounded-2xl p-5 sm:p-6 transition-all ${showGood?"bg-teal-50 border-2 border-teal-200":"bg-red-50 border border-red-200"}`}>
            <p className={`text-sm leading-relaxed bg-white rounded-xl p-4 ${showGood?"text-gray-700":"text-gray-400"}`}>{showGood ? goodDesc : badDesc}</p>
            <ul className="mt-3 space-y-1 text-xs">{showGood ? <li className="text-teal-700">· Opens with emotion · Keywords woven naturally · Social proof built in · Addresses a hidden objection ("won't tip")</li> : <li className="text-red-600">· "High quality" = says nothing · "Premium" = overused · No keywords · Zero personality</li>}</ul>
          </div>
        </section>
      )}

      <section className="border-t border-gray-100 py-12"><div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-xl font-bold text-center mb-8">Who uses this</h2>
        <div className="grid sm:grid-cols-3 gap-4">{WHO_FOR.map(w => (
          <div key={w.title} className="bg-white border border-gray-100 rounded-2xl p-5 text-center hover:border-teal-200 hover:shadow-sm transition-all">
            <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 mx-auto mb-3">{w.icon}</div>
            <h3 className="font-semibold text-sm mb-1">{w.title}</h3><p className="text-xs text-gray-500 leading-relaxed">{w.desc}</p>
          </div>
        ))}</div>
      </div></section>

      <section className="py-12"><div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-3 gap-4 text-center mb-10">
          {[{v:"Amazon",l:"Optimized"},{v:"Shopify",l:"Optimized"},{v:"Etsy+",l:"Supported"}].map(s=>(<div key={s.l} className="bg-teal-50 rounded-xl p-4"><div className="text-xl sm:text-2xl font-bold text-teal-600">{s.v}</div><p className="text-xs text-gray-500 mt-1">{s.l}</p></div>))}
        </div>
        <div className="grid sm:grid-cols-3 gap-4">{TESTIMONIALS.map((t,i)=>(
          <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-teal-200 hover:shadow-sm transition-all">
            <div className="flex gap-1 mb-2">{Array.from({length:t.stars}).map((_,j)=><Star key={j} size={11} className="text-yellow-400 fill-yellow-400"/>)}</div>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">&ldquo;{t.text}&rdquo;</p><p className="text-xs font-semibold">{t.name}</p><p className="text-xs text-gray-400">{t.role}</p>
          </div>
        ))}</div>
      </div></section>

      <section className="bg-gray-50 py-12"><div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-xl font-bold text-center mb-6">"Can't ChatGPT write product descriptions?"</h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="bg-white border border-gray-200 rounded-xl p-5"><p className="font-semibold text-red-600 mb-2">ChatGPT</p><ul className="space-y-1.5 text-gray-600 text-xs"><li>· Writes generic copy that sounds like AI</li><li>· Doesn't know Amazon vs Shopify SEO rules</li><li>· No keyword optimization for search</li><li>· You get one version, not platform-specific variants</li></ul></div>
          <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-5"><p className="font-semibold text-teal-700 mb-2">Product Description Generator</p><ul className="space-y-1.5 text-gray-700 text-xs"><li>· Platform-specific: different format for Amazon vs Shopify vs Etsy</li><li>· Built-in SEO: title tag, meta description, keyword placement</li><li>· Conversion-focused: opens with emotion, closes with urgency</li><li>· Specs section formatted for each marketplace's requirements</li></ul></div>
        </div>
      </div></section>

      <section className="bg-gray-50 py-8 border-t border-gray-100"><div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-xs text-gray-400 mb-2">More free tools from SEO Spark</p>
        <div className="flex flex-wrap justify-center gap-1.5">{[["/","📝 SEO Spark"],["/p/proposal","🎯 Proposals"],["/p/faq","❓ FAQ"],["/p/email","📬 Emails"],["/p/cold-email","📧 Cold Email"]].map(([h,l])=>(<a key={h} href={h} className="bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-500 hover:border-teal-300 hover:text-teal-600 transition-all">{l}</a>))}</div>
      </div></section>
      <footer className="text-center py-6 text-xs text-gray-400 border-t border-gray-100">Product Description Generator — from SEO Spark. <a href="/help" className="hover:text-gray-600 underline underline-offset-2">Help</a> · <a href="/" className="hover:text-gray-600 underline underline-offset-2">SEO Spark</a></footer>
    </main>
  );
}
