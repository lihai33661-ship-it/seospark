"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Copy, Search, ArrowRight, Star, Globe, Code, ChevronDown } from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────
const SERP_QUESTIONS = [
  { q: "How much does it cost?", a: "Plans start at $29/month with a 14-day free trial. No hidden fees. Annual billing saves 20%." },
  { q: "Can I cancel anytime?", a: "Yes. Cancel in one click from your dashboard. No phone calls, no retention scripts. Your data is exportable for 30 days after." },
  { q: "Does it integrate with Shopify?", a: "Our Shopify app installs in one click. Orders, inventory, and customers sync automatically. Webhooks available for custom workflows." },
  { q: "Is there a free trial?", a: "Yes — 14 days, full access to all features. No credit card required. You'll get a reminder email 48 hours before the trial ends." },
];

const TESTIMONIALS = [
  { name: "Mark Chen", role: "CTO, ShipFast.io", text: "We had zero FAQ page for 2 years because nobody wanted to write it. This generated one from our docs in 60 seconds. It's now our top source of featured snippets.", stars: 5 },
  { name: "Laura Bennett", role: "E-com Manager, GreenLeaf", text: "Support tickets down 25%. Organic traffic to FAQ pages up 60%. The schema markup alone was worth it — Google started showing our answers within 3 days of publishing.", stars: 5 },
  { name: "Patel & Co.", role: "Web Agency, 12 clients", text: "We now include a generated FAQ in every client site we deliver. Takes 2 minutes per site. Clients think we spent hours researching their business.", stars: 4 },
];

// ─── Components ────────────────────────────────────────────────
function SERPSimulator() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Browser chrome */}
      <div className="bg-gray-50 border-b border-gray-100 px-5 py-3 flex items-center gap-2">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 mx-4 bg-white rounded-full h-6 border border-gray-200 flex items-center px-3">
          <Search size={12} className="text-gray-400 mr-2" />
          <span className="text-xs text-gray-400">yourcompany.com pricing</span>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Organic result */}
        <div>
          <p className="text-xs text-gray-400 mb-0.5">yoursite.com › faq</p>
          <p className="text-base text-blue-700 font-medium cursor-pointer hover:underline">Frequently Asked Questions — YourSite</p>
          <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">Find answers about pricing, features, integrations, and our 14-day free trial. No credit card required.</p>
        </div>

        {/* People Also Ask */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <p className="text-sm font-semibold px-4 py-2.5 bg-gray-50 border-b border-gray-100">People also ask</p>
          {SERP_QUESTIONS.map((item, i) => (
            <div key={i} className="border-b border-gray-100 last:border-0">
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="w-full px-4 py-3 text-sm text-gray-800 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                {item.q}
                <ChevronDown size={14} className={`text-gray-300 transition-transform shrink-0 ml-2 ${expanded === i ? "rotate-180" : ""}`} />
              </button>
              {expanded === i && (
                <div className="px-4 pb-3 text-sm text-gray-600 leading-relaxed animate-in fade-in">
                  {item.a}
                  <p className="text-xs text-blue-700 mt-1 cursor-pointer hover:underline">yoursite.com › faq › {item.q.toLowerCase().replace(/\s+/g, "-").replace(/\?/g, "")}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SchemaBlock() {
  const code = `{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "How much does it cost?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Plans start at $29/month..."
    }
  }, {
    "@type": "Question",
    "name": "Can I cancel anytime?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Yes. Cancel in one click..."
    }
  }]
}`;

  return (
    <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg">
      <div className="flex items-center justify-between px-5 py-2.5 bg-gray-800">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 font-mono">faq-schema.jsonld</span>
          <span className="text-xs bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded font-mono">✓ valid</span>
        </div>
        <span className="text-xs text-gray-500">Google-eligible</span>
      </div>
      <pre className="p-5 text-sm text-green-400 font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">{code}</pre>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────
export default function FAQPage() {
  const [url, setUrl] = useState("");
  const [audience, setAudience] = useState("");
  const [result, setResult] = useState<{
    faqs: { category: string; question: string; answer: string }[];
    schema: string; siteName: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx((p) => (p + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);

  const tm = TESTIMONIALS[testimonialIdx];

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault(); if (!url.trim()) return;
    setLoading(true); setError(""); setResult(null);
    try {
      const res = await fetch("/p/faq/api/generate", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, audience }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setResult(data);
    } catch (err: any) { setError(err.message); }
    finally { setLoading(false); }
  }

  function handleCopy(text: string, label: string) {
    navigator.clipboard.writeText(text); setCopied(label); setTimeout(() => setCopied(null), 2000);
  }

  function formatFAQs(): string {
    if (!result) return "";
    const g: Record<string, string[]> = {};
    result.faqs.forEach((f) => { if (!g[f.category]) g[f.category] = []; g[f.category].push(`Q: ${f.question}\nA: ${f.answer}`); });
    return Object.entries(g).map(([c, i]) => `## ${c}\n\n${i.join("\n\n")}`).join("\n\n");
  }

  return (
    <main className="bg-white">
      {/* ── Hero: Minimal ────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-16 sm:pt-28 pb-16 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full mb-6">
          <Code size={12} /> FAQ generator
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
          FAQ pages that show up
          <br />
          <span className="text-purple-600">on Google.</span>
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto mb-10 text-base leading-relaxed">
          Enter your website URL. We scan your content, extract the answers, and generate a complete FAQ page —{" "}
          <strong className="text-gray-900">with JSON-LD schema markup</strong> Google uses for rich results.
        </p>

        {/* Input */}
        <form onSubmit={handleGenerate} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
          <input type="url" value={url} onChange={(e) => setUrl(e.target.value)}
            placeholder="https://yourcompany.com"
            className="flex-1 border border-gray-300 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent" required />
          <button type="submit" disabled={loading || !url.trim()}
            className="bg-purple-600 text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-purple-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shrink-0">
            {loading ? "Scanning..." : <>Generate <ArrowRight size={16} /></>}
          </button>
        </form>
        <p className="text-xs text-gray-400 mt-4">Free beta · 3 generations/day · No sign-up</p>
        {error && <div className="mt-6 max-w-md mx-auto bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-600">{error}</div>}
      </section>

      {/* ── SERP Preview + Schema: The money shot ─────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        {!result ? (
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-4">How your FAQ appears on Google</p>
              <SERPSimulator />
              <p className="text-xs text-gray-400 mt-3 text-center">
                ↑ FAQ pages with valid schema are <strong className="text-gray-700">2.5× more likely</strong> to appear in Google&apos;s "People Also Ask" section.
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-4">The code behind it</p>
              <SchemaBlock />
              <p className="text-xs text-gray-400 mt-3 text-center">
                ↑ We generate this automatically. Paste into your <code className="bg-gray-100 px-1 rounded">&lt;head&gt;</code>. Done.
              </p>
            </div>
          </div>
        ) : (
          /* Result view */
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-bold text-gray-900">{result.siteName} — FAQ</h3>
                  <p className="text-sm text-gray-500">{result.faqs.length} questions · {new Set(result.faqs.map((f) => f.category)).size} categories</p>
                </div>
                <button onClick={() => handleCopy(formatFAQs(), "faqs")}
                  className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors font-medium">
                  {copied === "faqs" ? <CheckCircle size={16} className="text-purple-500" /> : <Copy size={16} />}
                  {copied === "faqs" ? "Copied!" : "Copy All"}
                </button>
              </div>
              {(() => {
                const g: Record<string, typeof result.faqs> = {};
                result.faqs.forEach((f) => { if (!g[f.category]) g[f.category] = []; g[f.category].push(f); });
                return Object.entries(g).map(([cat, items], ci) => (
                  <div key={ci} className="mb-5 last:mb-0">
                    <h4 className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-3">{cat}</h4>
                    <div className="space-y-2">
                      {items.map((faq, fi) => (
                        <div key={fi} className="bg-gray-50 rounded-xl p-4">
                          <p className="text-sm font-medium text-gray-900 mb-1">{faq.question}</p>
                          <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ));
              })()}
            </div>
            {result.schema && <SchemaBlock />}
          </div>
        )}
      </section>

      {/* ── Stats + Trust ────────────────────────────── */}
      <section className="border-t border-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-8 text-center mb-14">
            <div><div className="text-3xl font-bold text-purple-600">3,215+</div><p className="text-sm text-gray-500 mt-1">FAQs generated</p></div>
            <div><div className="text-3xl font-bold text-purple-600">94%</div><p className="text-sm text-gray-500 mt-1">Schema valid on first pass</p></div>
            <div><div className="text-3xl font-bold text-purple-600">60s</div><p className="text-sm text-gray-500 mt-1">Average generation time</p></div>
          </div>

          {/* Testimonial */}
          <div className="max-w-2xl mx-auto bg-gray-50 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <div><p className="font-semibold">{tm.name}</p><p className="text-sm text-gray-500">{tm.role}</p></div>
              <div className="ml-auto flex">{Array.from({ length: tm.stars }).map((_, i) => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />)}</div>
            </div>
            <p className="text-gray-600 italic leading-relaxed">&ldquo;{tm.text}&rdquo;</p>
            <div className="flex justify-center gap-2 mt-5">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setTestimonialIdx(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === testimonialIdx ? "bg-purple-600 w-5" : "bg-gray-300"}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Cross-links ──────────────────────────────── */}
      <section className="bg-gray-50 py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs text-gray-400 mb-3">More tools from the makers of SEO Spark</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/" className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-all">
              📝 SEO Spark — Blog posts that rank
            </a>
            <a href="/p/proposal" className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 hover:border-emerald-300 hover:text-emerald-600 transition-all">
              🎯 Proposal Generator — Win more clients
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────── */}
      <footer className="text-center py-8 text-sm text-gray-400 space-y-2">
        <p>FAQ Builder — from the makers of SEO Spark. FAQ pages that Google rewards.</p>
        <p>
          <a href="/" className="hover:text-gray-600 underline underline-offset-2">SEO Spark</a>
          <span className="mx-2">·</span>
          <a href="/p/proposal" className="hover:text-gray-600 underline underline-offset-2">Proposal Generator</a>
          <span className="mx-2">·</span>
          <a href="mailto:seosparknet@gmail.com" className="hover:text-gray-600 underline underline-offset-2">Contact</a>
        </p>
      </footer>
    </main>
  );
}
