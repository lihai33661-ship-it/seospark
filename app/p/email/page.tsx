"use client";

import { useState } from "react";
import { CheckCircle, Copy, Send, Star, Mail, ArrowRight, Zap } from "lucide-react";

const TESTIMONIALS = [
  { name: "Jessica Park", role: "Founder, CraftBox.io", text: "I knew I needed an email sequence but kept putting it off for months. This generated all 5 emails in 30 seconds. I tweaked two sentences and hit send. 34% open rate on email #1.", stars: 5 },
  { name: "Ryan Mitchell", role: "E-commerce Owner", text: "My welcome sequence was one sad email saying 'thanks for signing up.' Now I have 5 emails that actually convert. Recovered 12% of abandoned carts with email #4.", stars: 5 },
];

export default function EmailPage() {
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("");
  const [benefit, setBenefit] = useState("");
  const [result, setResult] = useState<{ emails: { subject: string; body: string; cta: string }[]; notes: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); if (!product.trim()) return;
    setLoading(true); setError(""); setResult(null);
    try {
      const res = await fetch("/p/email/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ product, audience, tone, benefit }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data);
    } catch (err: any) { setError(err.message); }
    finally { setLoading(false); }
  }

  function handleCopyAll() {
    if (!result) return;
    const text = result.emails.map((e, i) => `EMAIL ${i + 1}\nSubject: ${e.subject}\n\n${e.body}\n\nCTA: ${e.cta}\n`).join("\n---\n\n");
    navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-14 sm:pt-24 pb-12 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 bg-amber-50 px-3 py-1 rounded-full mb-6"><Mail size={12} /> Email sequence generator</div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-3">Welcome emails that <span className="text-amber-600">actually convert.</span></h1>
        <p className="text-gray-500 max-w-lg mx-auto mb-8">5 emails. One welcome sequence. Generated from your product description in 30 seconds. Outsourcing this costs $200-500 — you get it free.</p>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white border-2 border-amber-100 rounded-2xl p-6 shadow-sm text-left">
          <div className="space-y-4">
            <input type="text" value={product} onChange={(e) => setProduct(e.target.value)} placeholder="Your product or service *" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" required />
            <div className="grid sm:grid-cols-3 gap-3">
              <input type="text" value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="Target audience" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
              <input type="text" value={tone} onChange={(e) => setTone(e.target.value)} placeholder="Brand voice (e.g. casual)" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
              <input type="text" value={benefit} onChange={(e) => setBenefit(e.target.value)} placeholder="Key benefit" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
            </div>
          </div>
          <button type="submit" disabled={loading || !product.trim()} className="w-full mt-5 bg-amber-500 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-amber-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
            {loading ? "Generating..." : <>{`Generate 5 Emails`} <Send size={16} /></>}
          </button>
          <p className="text-xs text-gray-400 mt-3 text-center">3 free / day · No sign-up</p>
          {error && <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600">{error}</div>}
        </form>
      </section>

      {/* Result */}
      {result && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
          <div className="bg-white border-2 border-amber-100 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold">Your 5-Email Sequence</h3>
              <button onClick={handleCopyAll} className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 font-medium transition-colors">
                {copied ? <CheckCircle size={16} /> : <Copy size={16} />}{copied ? "Copied!" : "Copy All"}
              </button>
            </div>
            <div className="space-y-3">
              {result.emails.map((email, i) => (
                <div key={i} className={`border rounded-xl overflow-hidden transition-all ${expanded === i ? "border-amber-300 shadow-sm" : "border-gray-100"}`}>
                  <button onClick={() => setExpanded(expanded === i ? null : i)} className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-gray-50">
                    <span className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                    <span className="text-sm font-medium text-gray-900 truncate">{email.subject}</span>
                    <span className="ml-auto text-xs text-gray-400">{expanded === i ? "▲" : "▼"}</span>
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
            {result.notes && <div className="mt-4 bg-gray-50 rounded-xl p-4 text-sm text-gray-600"><strong className="text-gray-800">Tips:</strong> {result.notes}</div>}
          </div>
        </section>
      )}

      {/* Benefits + Testimonials */}
      <section className="border-t border-gray-100 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-6 text-center mb-12">
            {[{ v: "5", l: "Emails per sequence" }, { v: "30s", l: "Generation time" }, { v: "34%", l: "Avg open rate" }].map((s) => (
              <div key={s.l}><div className="text-3xl font-bold text-amber-600">{s.v}</div><p className="text-sm text-gray-500 mt-1">{s.l}</p></div>
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

      {/* Cross-links */}
      <section className="bg-gray-50 py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs text-gray-400 mb-3">More free tools from SEO Spark</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[["/","📝 SEO Spark"],["/p/proposal","🎯 Proposal Gen"],["/p/faq","❓ FAQ Builder"],["/p/product","🛍 Product Desc"],["/p/cold-email","📧 Cold Email"]].map(([href, label]) => (
              <a key={href} href={href} className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-medium text-gray-600 hover:border-amber-300 hover:text-amber-600 transition-all">{label}</a>
            ))}
          </div>
        </div>
      </section>

      <footer className="text-center py-6 text-sm text-gray-400">
        <p>Email Sequence Generator — from SEO Spark. Welcome emails that convert.</p>
      </footer>
    </main>
  );
}
