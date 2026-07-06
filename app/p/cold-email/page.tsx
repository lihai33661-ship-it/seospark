"use client";

import { useState } from "react";
import { CheckCircle, Copy, Star, AtSign, Send, Target } from "lucide-react";

const BEFORE_AFTER = {
  bad: { subject: "Exciting partnership opportunity", body: "Dear Sir/Madam,\n\nI am reaching out because I believe our companies could benefit from a strategic partnership. We are a leading provider of AI solutions that help businesses save time and money.\n\nI would love to schedule a call to discuss how we can work together. Please let me know when you're available.\n\nBest regards,\n[Name]" },
  good: { subject: "quick question about ShipFast's recent Series A", body: "Hi Mark,\n\nCongrats on the raise — saw the TechCrunch piece. The part about scaling customer support from 2 to 15 people in 6 months hit home. That's exactly the transition where our tool saves teams ~20 hrs/week on repetitive tickets.\n\nWorth a 10-min call to see if it fits? No pitch deck — just want to understand your current stack and tell you if we can help or not.\n\nCheers,\n[Name]" },
};

const TESTIMONIALS = [
  { name: "David Kim", role: "B2B Sales Manager, 6 years", text: "I send 30 cold emails a day. Researching each prospect took 15 min. Now I paste their company and get a personalized email in 30 seconds. Reply rate went from 3% to 11%.", stars: 5 },
  { name: "Amanda Cole", role: "BD Lead, SaaS Startup", text: "The personalization hook pulls in specific details — recent funding, new hire, product launch. Prospects reply because it doesn't look like a template. We booked 14 meetings last month from cold email alone.", stars: 4 },
  { name: "Tom Reeves", role: "Founder, B2B Marketplace", text: "I was skeptical another AI tool could write better cold emails than me. Then I A/B tested: my email got 4% reply. The AI version got 13%. The difference? It asks a question the prospect actually wants to answer.", stars: 5 },
];

export default function ColdEmailPage() {
  const [company, setCompany] = useState(""); const [product, setProduct] = useState(""); const [prospect, setProspect] = useState("");
  const [role, setRole] = useState(""); const [research, setResearch] = useState(""); const [value, setValue] = useState("");
  const [result, setResult] = useState<{ subject: string; body: string } | null>(null);
  const [loading, setLoading] = useState(false); const [error, setError] = useState(""); const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) { e.preventDefault(); if (!prospect.trim()||!product.trim()) return; setLoading(true); setError(""); setResult(null);
    try { const res = await fetch("/p/cold-email/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ company, product, prospect, role, research, value }) }); const data = await res.json(); if (!res.ok) throw new Error(data.error); setResult(data); } catch (err: any) { setError(err.message); } finally { setLoading(false); } }

  return (
    <main className="bg-white">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-24 pb-10 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-slate-100 px-3 py-1 rounded-full mb-6"><AtSign size={12} /> Cold email generator</div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-3 leading-tight">Cold emails that <span className="text-slate-700">get replies.</span></h1>
        <p className="text-gray-500 max-w-lg mx-auto mb-8 text-sm sm:text-base">Research + write a personalized cold email in 30 seconds. Not "Dear Sir/Madam." Actually relevant to the person you're emailing.</p>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white border-2 border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm text-left">
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input type="text" value={prospect} onChange={(e) => setProspect(e.target.value)} placeholder="Prospect company *" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400" required />
              <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Their role (e.g. CTO)" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400" />
            </div>
            <input type="text" value={product} onChange={(e) => setProduct(e.target.value)} placeholder="Your product/service *" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400" required />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Your company name" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400" />
              <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Your value proposition" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400" />
            </div>
            <textarea value={research} onChange={(e) => setResearch(e.target.value)} rows={2} placeholder="What you know about them (funding, launch, news, etc.)" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 resize-y" />
          </div>
          <button type="submit" disabled={loading||!prospect.trim()||!product.trim()} className="w-full mt-4 bg-slate-800 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-slate-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base">
            {loading?"Writing...":<>Generate Cold Email <Send size={16} /></>}
          </button>
          <p className="text-xs text-gray-400 mt-3 text-center">5 free / day · No sign-up</p>
          {error&&<div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600">{error}</div>}
        </form>
      </section>

      {result && (
        <section className="max-w-2xl mx-auto px-4 sm:px-6 pb-16">
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 sm:p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <h3 className="font-bold">Your Cold Email</h3>
              <button onClick={() => { navigator.clipboard.writeText(`Subject: ${result.subject}\n\n${result.body}`); setCopied(true); setTimeout(()=>setCopied(false),2000); }}
                className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors">
                {copied?<CheckCircle size={16}/>:<Copy size={16}/>}{copied?"Copied!":"Copy"}
              </button>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-3"><p className="text-xs text-gray-400 mb-1">Subject</p><p className="text-sm font-medium text-gray-900">{result.subject}</p></div>
            <div className="p-4"><p className="text-xs text-gray-400 mb-2">Body</p><div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{result.body}</div></div>
          </div>
        </section>
      )}

      {!result && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
          <div className="text-center mb-8"><h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">One of these gets deleted. One gets a reply.</h2><p className="text-gray-500 text-sm">Guess which is which.</p></div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
              <p className="text-xs font-semibold text-red-600 mb-3">❌ Generic Cold Email</p>
              <div className="bg-white rounded-xl p-4 text-sm"><p className="text-xs text-gray-400 mb-2">Subject: {BEFORE_AFTER.bad.subject}</p><p className="text-red-700 whitespace-pre-wrap leading-relaxed text-xs">{BEFORE_AFTER.bad.body}</p></div>
              <ul className="mt-3 space-y-1 text-xs text-red-600"><li>· "Dear Sir/Madam"</li><li>· Zero research</li><li>· "Leading provider" = spam signal</li></ul>
            </div>
            <div className="bg-slate-50 border-2 border-slate-300 rounded-2xl p-5">
              <p className="text-xs font-semibold text-slate-700 mb-3">✅ Personalized Cold Email</p>
              <div className="bg-white rounded-xl p-4 text-sm"><p className="text-xs text-gray-900 mb-2 font-medium">Subject: {BEFORE_AFTER.good.subject}</p><p className="text-slate-800 whitespace-pre-wrap leading-relaxed text-xs">{BEFORE_AFTER.good.body}</p></div>
              <ul className="mt-3 space-y-1 text-xs text-slate-700"><li>· References their funding news</li><li>· Specific stat they relate to</li><li>· Low-friction ask</li></ul>
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-4 text-center mb-10">
            {[{v:"11%",l:"Avg reply rate"},{v:"30s",l:"Per email"},{v:"5/day",l:"Free generation"}].map(s=>(<div key={s.l} className="bg-slate-50 rounded-xl p-4"><div className="text-2xl sm:text-3xl font-bold text-slate-700">{s.v}</div><p className="text-xs text-gray-500 mt-1">{s.l}</p></div>))}
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t,i)=>(
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-slate-200 hover:shadow-sm transition-all">
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
          {[["/","📝 Blog"],["/p/proposal","🎯 Proposals"],["/p/faq","❓ FAQ"],["/p/email","📬 Emails"],["/p/product","🛍 Products"]].map(([h,l])=>(<a key={h} href={h} className="bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-500 hover:border-slate-300 hover:text-slate-700 transition-all">{l}</a>))}
        </div>
      </div></section>
      <footer className="text-center py-6 text-xs text-gray-400">Cold Email Generator — from SEO Spark. Cold emails that get replies.</footer>
    </main>
  );
}
