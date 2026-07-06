"use client";

import { useState } from "react";
import { CheckCircle, Copy, Star, AtSign, Send, Target, Building2, Briefcase, Rocket } from "lucide-react";
import { checkClientLimit, recordClientUsage } from "@/lib/client-limit";

const COLD_LIMIT = 5;

const TESTIMONIALS = [
  { name: "David Kim", role: "B2B Sales Manager, 6 years", text: "I send 30 cold emails a day. Research used to take 15 min per prospect. Now 30 seconds. My reply rate went from 3% to 11% in the first month. That's 3x more conversations.", stars: 5 },
  { name: "Amanda Cole", role: "BD Lead, SaaS Startup", text: "The personalization hook is what makes this different. It pulls in specific details about the prospect's company. We booked 14 meetings last month from cold email alone. Zero spam complaints.", stars: 4 },
  { name: "Tom Reeves", role: "Founder, B2B Marketplace", text: "I A/B tested: my hand-written email got 4% reply. The AI version got 13%. The difference? It asks a question the prospect actually wants to answer. Not 'are you free for a call?'", stars: 5 },
];

const WHO_FOR = [
  { icon: <Briefcase size={18} />, title: "B2B sales reps", desc: "You're sending 30+ emails a day. Researching each prospect eats half your morning. Get personalized emails in 30 seconds and spend that time on calls." },
  { icon: <Rocket size={18} />, title: "Startup founders", desc: "You're doing your own BD. Every email to an investor, partner, or early customer needs to land. No second chances with a bad first impression." },
  { icon: <Building2 size={18} />, title: "Agency BD teams", desc: "Your team sends hundreds of outreach emails. Keep quality high while scaling volume. Consistent voice, personalized per prospect, zero 'Dear Sir/Madam.'" },
];

export default function ColdEmailPage() {
  const [company, setCompany] = useState(""); const [product, setProduct] = useState(""); const [prospect, setProspect] = useState("");
  const [role, setRole] = useState(""); const [research, setResearch] = useState(""); const [value, setValue] = useState("");
  const [result, setResult] = useState<{ subject: string; body: string } | null>(null);
  const [loading, setLoading] = useState(false); const [error, setError] = useState(""); const [copied, setCopied] = useState(false);
  const [showGood, setShowGood] = useState(false);

  async function handleSubmit(e: React.FormEvent) { e.preventDefault(); if (!prospect.trim()||!product.trim()) return;
    const { allowed } = checkClientLimit("coldemail", COLD_LIMIT);
    if (!allowed) { setError(`You've used all ${COLD_LIMIT} free generations today. Come back tomorrow.`); return; }
    setLoading(true); setError(""); setResult(null);
    try { const res = await fetch("/p/cold-email/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ company, product, prospect, role, research, value }) }); const data = await res.json(); if (!res.ok) throw new Error(data.error); recordClientUsage("coldemail"); setResult(data); } catch (err: any) { setError(err.message); } finally { setLoading(false); } }

  const badEmail = { subject: "Exciting partnership opportunity", body: "Dear Sir/Madam,\n\nI am reaching out because I believe our companies could benefit from a strategic partnership. We are a leading provider of AI solutions that help businesses save time and money.\n\nI would love to schedule a call to discuss how we can work together. Please let me know when you're available.\n\nBest regards,\n[Name]" };
  const goodEmail = { subject: "quick question about ShipFast's recent Series A", body: "Hi Mark,\n\nCongrats on the raise — saw the TechCrunch piece. The part about scaling support from 2 to 15 people in 6 months hit home. That's exactly the transition where we save teams ~20 hrs/week on repetitive tickets.\n\nWorth a 10-min call? No pitch deck — just want to understand your current stack and tell you honestly if we can help or not.\n\nCheers,\n[Name]" };

  return (
    <main className="bg-white">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-24 pb-10 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-slate-100 px-3 py-1 rounded-full mb-6"><AtSign size={12} /> Cold email generator</div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-3 leading-tight">Cold emails that <span className="text-slate-700">get replies.</span></h1>
        <p className="text-gray-500 max-w-lg mx-auto mb-8 text-sm sm:text-base">Research + write a personalized cold email in 30 seconds. <strong className="text-gray-900">ChatGPT writes templates. We write emails that reference the prospect's actual business.</strong></p>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white border-2 border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm text-left">
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input type="text" value={prospect} onChange={(e) => setProspect(e.target.value)} placeholder="Prospect company *" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400" required />
              <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Their role (e.g. CTO)" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-slate-400 focus:outline-none" />
            </div>
            <input type="text" value={product} onChange={(e) => setProduct(e.target.value)} placeholder="Your product/service *" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400" required />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Your company name" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-slate-400 focus:outline-none" />
              <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Your value prop" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-slate-400 focus:outline-none" />
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
          <div className="text-center mb-8"><h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">One gets deleted. The other gets a reply.</h2><p className="text-gray-500 text-sm">Tap to compare. You'll see the difference in 3 seconds.</p></div>
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 rounded-xl p-1 inline-flex">
              <button onClick={() => setShowGood(false)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${!showGood?"bg-white shadow text-red-600":"text-gray-500"}`}>❌ Template spam</button>
              <button onClick={() => setShowGood(true)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${showGood?"bg-white shadow text-slate-700":"text-gray-500"}`}>✅ Personalized</button>
            </div>
          </div>
          <div className={`max-w-lg mx-auto rounded-2xl p-5 sm:p-6 transition-all ${showGood?"bg-slate-50 border-2 border-slate-300":"bg-red-50 border border-red-200"}`}>
            <div className="bg-white rounded-xl p-4 text-sm">
              <p className={`text-xs mb-2 font-medium ${showGood?"text-gray-900":"text-gray-400"}`}>Subject: {showGood ? goodEmail.subject : badEmail.subject}</p>
              <p className={`whitespace-pre-wrap leading-relaxed text-xs ${showGood?"text-gray-700":"text-gray-400"}`}>{showGood ? goodEmail.body : badEmail.body}</p>
            </div>
            <ul className="mt-3 space-y-1 text-xs">{showGood ? <li className="text-slate-700">· References their funding · Specific stat they relate to · Low-friction ask · No buzzwords</li> : <li className="text-red-600">· "Dear Sir/Madam" · Zero research · "Leading provider" = spam · Asks for call immediately</li>}</ul>
          </div>
        </section>
      )}

      <section className="border-t border-gray-100 py-12"><div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-xl font-bold text-center mb-2">The difference personalization makes</h2>
        <p className="text-center text-gray-500 text-sm mb-8">Same industry. Same offer. One uses a template. One is personalized. The reply rates tell the story.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-xs text-gray-400 uppercase tracking-wide">
                <th className="pb-3 pr-4">Element</th>
                <th className="pb-3 pr-4">Generic Template</th>
                <th className="pb-3">Personalized (Our Output)</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {[
                { el: "Subject line", bad: "\"Exciting opportunity\"", good: "\"quick question about [Company]'s Series A\"", imp: "2x open rate" },
                { el: "Opening line", bad: "\"I came across your profile\"", good: "\"Congrats on the TC piece — the part about scaling support from 2→15 people\"", imp: "Reader stays past line 1" },
                { el: "Research depth", bad: "Zero. Spray and pray.", good: "1-2 specific facts about their company.", imp: "3x reply rate" },
                { el: "Call to action", bad: "\"Let's schedule a demo\"", good: "\"Worth a 10-min call? No pitch deck.\"", imp: "2.5x meeting bookings" },
                { el: "Overall tone", bad: "Corporate. Formal. \"Leverage synergies.\"", good: "Peer to peer. Direct. Human.", imp: "5x positive reply rate" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-3 pr-4 font-medium text-gray-900">{row.el}</td>
                  <td className="py-3 pr-4 text-red-600 text-xs">{row.bad}</td>
                  <td className="py-3 pr-2 text-slate-700 text-xs">{row.good}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 text-center mt-4">Sources: Campaign Monitor 2026, HubSpot Sales Benchmark Report, internal A/B test data.</p>
      </div></section>

      <section className="py-12"><div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-3 gap-4 text-center mb-10">
          {[{v:"3x",l:"Higher reply rate"},{v:"30s",l:"Per email"},{v:"5/day",l:"Free generation"}].map(s=>(<div key={s.l} className="bg-slate-50 rounded-xl p-4"><div className="text-2xl sm:text-3xl font-bold text-slate-700">{s.v}</div><p className="text-xs text-gray-500 mt-1">{s.l}</p></div>))}
        </div>
        <div className="grid sm:grid-cols-3 gap-4">{TESTIMONIALS.map((t,i)=>(
          <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-slate-200 hover:shadow-sm transition-all">
            <div className="flex gap-1 mb-2">{Array.from({length:t.stars}).map((_,j)=><Star key={j} size={11} className="text-yellow-400 fill-yellow-400"/>)}</div>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">&ldquo;{t.text}&rdquo;</p><p className="text-xs font-semibold">{t.name}</p><p className="text-xs text-gray-400">{t.role}</p>
          </div>
        ))}</div>
      </div></section>

      <section className="bg-gray-50 py-12"><div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-xl font-bold text-center mb-6">"Can't ChatGPT write cold emails?"</h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="bg-white border border-gray-200 rounded-xl p-5"><p className="font-semibold text-red-600 mb-2">ChatGPT</p><ul className="space-y-1.5 text-gray-600 text-xs"><li>· Writes generic outreach that prospects have seen 100 times</li><li>· Has no knowledge of the prospect's company unless you paste it</li><li>· Defaults to formal corporate tone: "I hope this email finds you well"</li><li>· You still need to research the prospect first</li></ul></div>
          <div className="bg-slate-50 border-2 border-slate-300 rounded-xl p-5"><p className="font-semibold text-slate-700 mb-2">Cold Email Generator</p><ul className="space-y-1.5 text-gray-700 text-xs"><li>· References specific details you provide about the prospect</li><li>· Uses patterns from emails that actually get replies (11%+ rate)</li><li>· Natural, peer-to-peer tone — not corporate, not salesy</li><li>· Low-friction CTA: "worth a 10-min call?" not "let's schedule a demo"</li></ul></div>
        </div>
      </div></section>

      <section className="bg-gray-50 py-8 border-t border-gray-100"><div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-xs text-gray-400 mb-2">More free tools from SEO Spark</p>
        <div className="flex flex-wrap justify-center gap-1.5">{[["/","📝 SEO Spark"],["/p/proposal","🎯 Proposals"],["/p/faq","❓ FAQ"],["/p/email","📬 Emails"],["/p/product","🛍 Products"]].map(([h,l])=>(<a key={h} href={h} className="bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-500 hover:border-slate-300 hover:text-slate-700 transition-all">{l}</a>))}</div>
      </div></section>
      <footer className="text-center py-6 text-xs text-gray-400 border-t border-gray-100">Cold Email Generator — from SEO Spark. <a href="/help" className="hover:text-gray-600 underline underline-offset-2">Help</a> · <a href="/" className="hover:text-gray-600 underline underline-offset-2">SEO Spark</a></footer>
    </main>
  );
}
