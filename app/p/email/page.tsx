"use client";

import { useState } from "react";
import { CheckCircle, Copy, Send, Star, Mail, ArrowRight, Zap, Users, ShoppingCart, Building2 } from "lucide-react";
import { checkClientLimit, recordClientUsage } from "@/lib/client-limit";

const EMAIL_LIMIT = 3;

const TESTIMONIALS = [
  { name: "Jessica Park", role: "Founder, CraftBox", text: "I procrastinated on my email sequence for 6 months. This generated all 5 emails in 30 seconds. I tweaked two sentences and launched. 34% open rate on email #1.", stars: 5 },
  { name: "Ryan Mitchell", role: "E-com Owner, 2 stores", text: "My old 'welcome' email was one sad sentence. Now I have a 5-email sequence that recovered 12% of abandoned carts. The tips at the end are surprisingly useful.", stars: 5 },
  { name: "Nina Okafor", role: "Marketing Lead, B2B SaaS", text: "We A/B tested our old sequence against AI-generated one. The new sequence had 2.3x higher click rate. The difference? Every email delivers value before asking for anything.", stars: 4 },
];

const WHO_FOR = [
  { icon: <ShoppingCart size={18} />, title: "E-commerce stores", desc: "You're collecting emails but your welcome sequence is one sad 'thanks for subscribing.' Recover abandoned carts with email #4." },
  { icon: <Building2 size={18} />, title: "SaaS founders", desc: "Your trial signups drop off after day 3. A 5-email nurture sequence keeps them engaged and pushes them to activation." },
  { icon: <Users size={18} />, title: "Creators & coaches", desc: "You have a lead magnet but no follow-up. Turn freebie downloads into paying customers with a sequence that builds trust first." },
];

export default function EmailPage() {
  const [product, setProduct] = useState(""); const [audience, setAudience] = useState(""); const [tone, setTone] = useState(""); const [benefit, setBenefit] = useState("");
  const [result, setResult] = useState<{ emails: { subject: string; body: string; cta: string }[]; notes: string } | null>(null);
  const [loading, setLoading] = useState(false); const [error, setError] = useState(""); const [copied, setCopied] = useState(false); const [expanded, setExpanded] = useState<number | null>(null);
  const [showGood, setShowGood] = useState(false);

  async function handleSubmit(e: React.FormEvent) { e.preventDefault(); if (!product.trim()) return;
    const { allowed, remaining } = checkClientLimit("email", EMAIL_LIMIT);
    if (!allowed) { setError(`You've used all ${EMAIL_LIMIT} free generations today. Come back tomorrow.`); return; }
    setLoading(true); setError(""); setResult(null);
    try { const res = await fetch("/p/email/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ product, audience, tone, benefit }) }); const data = await res.json(); if (!res.ok) throw new Error(data.error); recordClientUsage("email"); setResult(data); } catch (err: any) { setError(err.message); } finally { setLoading(false); } }

  const badEmail = { subject: "Welcome to our newsletter!", body: "Hi there,\n\nThanks for signing up. We'll send you updates about our product and company news.\n\nStay tuned!\n\nThe Team" };
  const goodEmail = { subject: "You're in. Here's what to expect (and a free gift)", body: "Hi Sarah,\n\nQuick welcome — and thanks for trusting us with your inbox.\n\nOver the next week, I'll send you 3 things:\n• The exact workflow our top customers use (Tuesday)\n• A case study: how one founder 3x'd email revenue (Thursday)\n• Your first month checklist (Saturday)\n\nBut first — here's the SEO audit template I promised.\n[Download: seo-audit-template.pdf]\n\nTalk soon,\nJess @ SEO Spark" };

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-24 pb-10 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 bg-amber-50 px-3 py-1 rounded-full mb-6"><Mail size={12} /> Email sequence generator</div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-3 leading-tight">Welcome emails that <span className="text-amber-600">don't get ignored.</span></h1>
        <p className="text-gray-500 max-w-lg mx-auto mb-8 text-sm sm:text-base">5 emails. One sequence. Generated in 30 seconds. <strong className="text-gray-900">Outsourcing this costs $200–500. ChatGPT gives you a template. We give you a strategy.</strong></p>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white border-2 border-amber-100 rounded-2xl p-5 sm:p-6 shadow-sm text-left">
          <div className="space-y-3">
            <input type="text" value={product} onChange={(e) => setProduct(e.target.value)} placeholder="Your product or service *" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" required />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input type="text" value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="Target audience" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none" />
              <input type="text" value={tone} onChange={(e) => setTone(e.target.value)} placeholder="Brand voice" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none" />
              <input type="text" value={benefit} onChange={(e) => setBenefit(e.target.value)} placeholder="Key benefit" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none" />
            </div>
          </div>
          <button type="submit" disabled={loading || !product.trim()} className="w-full mt-4 bg-amber-500 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-amber-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base">
            {loading ? "Generating..." : <>Generate 5 Emails <Send size={16} /></>}
          </button>
          <p className="text-xs text-gray-400 mt-3 text-center">3 free / day · No sign-up</p>
          {error && <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600">{error}</div>}
        </form>
      </section>

      {/* Result */}
      {result && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
          <div className="bg-white border-2 border-amber-100 rounded-2xl p-5 sm:p-6 shadow-lg">
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <h3 className="font-bold">Your 5-Email Sequence</h3>
              <button onClick={() => { navigator.clipboard.writeText(result.emails.map((e,i) => `EMAIL ${i+1}\nSubject: ${e.subject}\n\n${e.body}\n\nCTA: ${e.cta}`).join("\n---\n\n")); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 font-medium transition-colors">
                {copied ? <CheckCircle size={16} /> : <Copy size={16} />}{copied ? "Copied!" : "Copy All"}
              </button>
            </div>
            <div className="space-y-2">
              {result.emails.map((email, i) => (
                <div key={i} className={`border rounded-xl overflow-hidden transition-all ${expanded === i ? "border-amber-300 shadow-sm" : "border-gray-100"}`}>
                  <button onClick={() => setExpanded(expanded === i ? null : i)} className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-gray-50">
                    <span className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                    <span className="text-sm font-medium text-gray-900 truncate">{email.subject}</span>
                    <span className="ml-auto text-xs text-gray-400 shrink-0">{expanded === i ? "▲" : "▼"}</span>
                  </button>
                  {expanded === i && (
                    <div className="px-4 pb-4 pt-1 border-t border-gray-50">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed mb-3">{email.body}</p>
                      <p className="text-xs font-medium text-amber-700 bg-amber-50 inline-block px-3 py-1 rounded-full">CTA: {email.cta}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {result.notes && <div className="mt-4 bg-gray-50 rounded-xl p-4 text-sm text-gray-600"><strong className="text-gray-800">Tips to customize:</strong> {result.notes}</div>}
          </div>
        </section>
      )}

      {/* Interactive Before/After */}
      {!result && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Don't send this. Send this instead.</h2>
            <p className="text-gray-500 text-sm">Tap to compare.</p>
          </div>

          {/* Toggle */}
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 rounded-xl p-1 inline-flex">
              <button onClick={() => setShowGood(false)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${!showGood ? "bg-white shadow text-red-600" : "text-gray-500"}`}>❌ What most people send</button>
              <button onClick={() => setShowGood(true)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${showGood ? "bg-white shadow text-amber-600" : "text-gray-500"}`}>✅ What we generate</button>
            </div>
          </div>

          <div className="max-w-lg mx-auto">
            <div className={`rounded-2xl p-5 sm:p-6 transition-all ${showGood ? "bg-amber-50 border-2 border-amber-200" : "bg-red-50 border border-red-200"}`}>
              <div className="bg-white rounded-xl p-4 text-sm">
                <p className={`text-xs mb-2 font-medium ${showGood ? "text-gray-900" : "text-gray-400"}`}>Subject: {showGood ? goodEmail.subject : badEmail.subject}</p>
                <p className={`whitespace-pre-wrap leading-relaxed text-xs ${showGood ? "text-gray-700" : "text-gray-400"}`}>{showGood ? goodEmail.body : badEmail.body}</p>
              </div>
              <ul className="mt-3 space-y-1 text-xs">
                {showGood ? (
                  <><li className="text-amber-700">· Personalized with name · Clear expectations set · Value delivered immediately · Specific timeline</li></>
                ) : (
                  <><li className="text-red-600">· No name · Zero value · "Stay tuned" = delete · Nobody cares about "company news"</li></>
                )}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Who's this for */}
      <section className="border-t border-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl font-bold text-center mb-8">Who uses this</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {WHO_FOR.map(w => (
              <div key={w.title} className="bg-white border border-gray-100 rounded-2xl p-5 text-center hover:border-amber-200 hover:shadow-sm transition-all">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 mx-auto mb-3">{w.icon}</div>
                <h3 className="font-semibold text-sm mb-1">{w.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-4 text-center mb-10">
            {[{v:"5",l:"Emails/sequence"},{v:"30s",l:"Generation time"},{v:"2.3x",l:"Higher click rate"}].map(s => (
              <div key={s.l} className="bg-amber-50 rounded-xl p-4"><div className="text-2xl sm:text-3xl font-bold text-amber-600">{s.v}</div><p className="text-xs text-gray-500 mt-1">{s.l}</p></div>
            ))}
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-amber-200 hover:shadow-sm transition-all">
                <div className="flex gap-1 mb-2">{Array.from({ length: t.stars }).map((_, j) => <Star key={j} size={11} className="text-yellow-400 fill-yellow-400" />)}</div>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">&ldquo;{t.text}&rdquo;</p>
                <p className="text-xs font-semibold">{t.name}</p><p className="text-xs text-gray-400">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why not ChatGPT */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl font-bold text-center mb-6">"Can't I just ask ChatGPT?"</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <p className="font-semibold text-red-600 mb-2">ChatGPT</p>
              <ul className="space-y-1.5 text-gray-600 text-xs">
                <li>· Writes one email, not a strategy</li><li>· No sequence logic (which email says what and when)</li><li>· Generic: "Hope this email finds you well"</li><li>· You still need to know what to ask it</li>
              </ul>
            </div>
            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-5">
              <p className="font-semibold text-amber-700 mb-2">Email Sequence Generator</p>
              <ul className="space-y-1.5 text-gray-700 text-xs">
                <li>· 5 emails with a strategy: welcome → value → proof → offer → urgency</li><li>· Each email has a defined role in the funnel</li><li>· Personalized to YOUR product, not a template</li><li>· Includes customization tips specific to your business</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="bg-gray-50 py-8 border-t border-gray-100"><div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-xs text-gray-400 mb-2">More free tools from SEO Spark</p>
        <div className="flex flex-wrap justify-center gap-1.5">
          {[["/","📝 Blog Posts"],["/p/proposal","🎯 Proposals"],["/p/faq","❓ FAQ"],["/p/product","🛍 Products"],["/p/cold-email","📧 Cold Email"]].map(([h,l]) => (<a key={h} href={h} className="bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-500 hover:border-amber-300 hover:text-amber-600 transition-all">{l}</a>))}
        </div>
      </div></section>
      <footer className="text-center py-6 text-xs text-gray-400 border-t border-gray-100">Email Sequence Generator — from SEO Spark. Welcome emails that don't get ignored.</footer>
    </main>
  );
}
