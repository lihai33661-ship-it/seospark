"use client";

import { useState } from "react";
import { CheckCircle, Copy, Star, AtSign, ArrowRight, Send } from "lucide-react";

const TESTIMONIALS = [
  { name: "David Kim", role: "B2B Sales Manager, 6 years", text: "I send 30 cold emails a day. Researching each prospect took 15 minutes. Now I paste their company name and get a personalized email in 30 seconds. My reply rate went from 3% to 11%.", stars: 5 },
  { name: "Amanda Cole", role: "BD Lead, SaaS Startup", text: "The personalization hook is what makes this different. It pulls in something specific about the prospect's company — recent funding, new hire, product launch. Prospects actually reply because it doesn't look templated.", stars: 4 },
];

export default function ColdEmailPage() {
  const [company, setCompany] = useState("");
  const [product, setProduct] = useState("");
  const [prospect, setProspect] = useState("");
  const [role, setRole] = useState("");
  const [research, setResearch] = useState("");
  const [value, setValue] = useState("");
  const [result, setResult] = useState<{ subject: string; body: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); if (!prospect.trim() || !product.trim()) return;
    setLoading(true); setError(""); setResult(null);
    try {
      const res = await fetch("/p/cold-email/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ company, product, prospect, role, research, value }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data);
    } catch (err: any) { setError(err.message); }
    finally { setLoading(false); }
  }

  function handleCopy() {
    if (!result) return;
    navigator.clipboard.writeText(`Subject: ${result.subject}\n\n${result.body}`);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="bg-white">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-14 sm:pt-24 pb-12 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-slate-100 px-3 py-1 rounded-full mb-6"><AtSign size={12} /> Cold email generator</div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-3">Cold emails that <span className="text-slate-700">get replies.</span></h1>
        <p className="text-gray-500 max-w-lg mx-auto mb-8">Research + write a personalized cold email in 30 seconds. Not "Dear Sir/Madam." Not "I came across your profile." Actually relevant.</p>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm text-left">
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <input type="text" value={prospect} onChange={(e) => setProspect(e.target.value)} placeholder="Prospect company *" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400" required />
              <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Their role (e.g. CTO)" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400" />
            </div>
            <input type="text" value={product} onChange={(e) => setProduct(e.target.value)} placeholder="Your product/service *" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400" required />
            <div className="grid sm:grid-cols-2 gap-3">
              <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Your company name" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400" />
              <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Your value prop" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400" />
            </div>
            <textarea value={research} onChange={(e) => setResearch(e.target.value)} rows={2} placeholder="What you know about them (recent news, funding, launch, etc.)" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 resize-y" />
          </div>
          <button type="submit" disabled={loading || !prospect.trim() || !product.trim()} className="w-full mt-5 bg-slate-800 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-slate-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
            {loading ? "Writing..." : <>Generate Cold Email <Send size={16} /></>}
          </button>
          <p className="text-xs text-gray-400 mt-3 text-center">5 free / day · No sign-up</p>
          {error && <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600">{error}</div>}
        </form>
      </section>

      {result && (
        <section className="max-w-2xl mx-auto px-4 sm:px-6 pb-16">
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Your Cold Email</h3>
              <button onClick={handleCopy} className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors">
                {copied ? <CheckCircle size={16} /> : <Copy size={16} />}{copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-3">
              <p className="text-xs text-gray-400 mb-1">Subject</p>
              <p className="text-sm font-medium text-gray-900">{result.subject}</p>
            </div>
            <div className="p-4">
              <p className="text-xs text-gray-400 mb-2">Body</p>
              <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{result.body}</div>
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-gray-100 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-6 text-center mb-12">
            {[{ v: "11%", l: "Avg reply rate" }, { v: "30s", l: "Per email" }, { v: "5/day", l: "Free generation" }].map((s) => (
              <div key={s.l}><div className="text-3xl font-bold text-slate-700">{s.v}</div><p className="text-sm text-gray-500 mt-1">{s.l}</p></div>
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
            {[["/","📝 SEO Spark"],["/p/proposal","🎯 Proposal Gen"],["/p/faq","❓ FAQ Builder"],["/p/email","📬 Email Seq"],["/p/product","🛍 Product Desc"]].map(([href, label]) => (
              <a key={href} href={href} className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-medium text-gray-600 hover:border-slate-300 hover:text-slate-700 transition-all">{label}</a>
            ))}
          </div>
        </div>
      </section>

      <footer className="text-center py-6 text-sm text-gray-400">
        <p>Cold Email Generator — from SEO Spark. Cold emails that get replies.</p>
      </footer>
    </main>
  );
}
