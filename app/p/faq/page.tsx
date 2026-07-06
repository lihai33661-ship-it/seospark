"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Copy, Search, ArrowRight, Star, TrendingUp, Eye, MousePointerClick, BarChart3, ChevronDown, Code, Zap, Globe, ShoppingCart, Building2 } from "lucide-react";
import { checkClientLimit, recordClientUsage } from "@/lib/client-limit";

const FAQ_LIMIT = 3;

// ─── Data ──────────────────────────────────────────────────────
const TESTIMONIALS = [
  { name: "Mark Chen", role: "CTO, ShipFast.io", text: "We had zero FAQ page for 2 years because nobody wanted to write it. This generated one from our docs in 60 seconds. It's now our top source of featured snippets — traffic to our FAQ pages is up 60%.", stars: 5 },
  { name: "Laura Bennett", role: "E-com Manager, GreenLeaf", text: "Support tickets down 25% in the first month. The schema markup was indexed within 3 days. Google started showing our answers directly in search results — that's free real estate our competitors don't have.", stars: 5 },
  { name: "Patel & Co.", role: "Web Agency, 12 clients", text: "We now include a generated FAQ in every client site we deliver. Takes 2 minutes. Clients think we spent hours — one said 'this is the most comprehensive FAQ I've ever seen on a B2B site.'", stars: 4 },
];

// ─── Components ────────────────────────────────────────────────
function GoogleBrowser({ children, label, variant }: { children: React.ReactNode; label: string; variant: "bad" | "good" }) {
  const isGood = variant === "good";
  return (
    <div className={`rounded-2xl overflow-hidden border-2 shadow-sm ${isGood ? "border-purple-200 shadow-purple-100" : "border-gray-200"}`}>
      <div className={`px-4 py-2.5 flex items-center gap-2 text-xs font-medium ${isGood ? "bg-purple-50 text-purple-700" : "bg-gray-100 text-gray-500"}`}>
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-red-400" />
          <span className="w-2 h-2 rounded-full bg-yellow-400" />
          <span className="w-2 h-2 rounded-full bg-green-400" />
        </div>
        <span className="ml-2">{label}</span>
      </div>
      <div className="bg-white p-4 sm:p-5 space-y-4 text-xs">
        {children}
      </div>
    </div>
  );
}

function SERPComparison() {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Left: Without schema */}
      <GoogleBrowser label="Without FAQ Schema" variant="bad">
        {/* Search bar */}
        <div className="bg-white border border-gray-200 rounded-full h-7 flex items-center px-3 mb-3">
          <Search size={11} className="text-gray-400 mr-1.5" />
          <span className="text-gray-400 text-xs">yourcompany pricing & features</span>
        </div>

        {/* Ad */}
        <div className="space-y-1">
          <p className="text-gray-300" style={{ fontSize: "10px" }}>Ad · competitor.com</p>
          <p className="text-blue-700 font-medium cursor-pointer" style={{ fontSize: "13px" }}>Pricing Plans — CompetitorName</p>
          <p className="text-gray-600 leading-relaxed">Compare plans &amp; pricing. Start your free trial today. No credit card required.</p>
        </div>

        {/* Organic result #1 - competitor */}
        <div className="space-y-1 pt-2 border-t border-gray-100">
          <p className="text-gray-300" style={{ fontSize: "10px" }}>competitor.com › pricing</p>
          <p className="text-blue-700 font-medium cursor-pointer" style={{ fontSize: "13px" }}>Pricing — CompetitorName — Plans from $49/mo</p>
          <p className="text-gray-600 leading-relaxed">Compare our Starter, Professional, and Enterprise plans. 14-day free trial on all plans.</p>
        </div>

        {/* Organic result #2 - your site (plain, no rich result) */}
        <div className="space-y-1 pt-2 border-t border-gray-100">
          <p className="text-gray-300" style={{ fontSize: "10px" }}>yoursite.com › faq</p>
          <p className="text-blue-700 font-medium cursor-pointer" style={{ fontSize: "13px" }}>Frequently Asked Questions — YourSite</p>
          <p className="text-gray-600 leading-relaxed">Find answers to common questions about our product and services.</p>
        </div>

        {/* Result count */}
        <p className="text-gray-400 pt-2" style={{ fontSize: "11px" }}>About 234,000 results (0.42 seconds)</p>

        {/* Indicator */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
          <p className="font-semibold text-red-600" style={{ fontSize: "11px" }}>Your site occupies ~8% of the screen</p>
          <p className="text-red-500 mt-0.5" style={{ fontSize: "10px" }}>Competitor has the ad. You're a plain text link below the fold.</p>
        </div>
      </GoogleBrowser>

      {/* Right: With schema */}
      <GoogleBrowser label="With FAQ Schema (FAQ Builder)" variant="good">
        {/* Search bar */}
        <div className="bg-white border border-gray-200 rounded-full h-7 flex items-center px-3 mb-3">
          <Search size={11} className="text-gray-400 mr-1.5" />
          <span className="text-gray-400 text-xs">yourcompany pricing & features</span>
        </div>

        {/* Your site - with FAQ rich result + stars */}
        <div className="space-y-1.5">
          <p className="text-gray-300" style={{ fontSize: "10px" }}>yoursite.com › faq</p>
          <p className="text-blue-700 font-medium cursor-pointer" style={{ fontSize: "13px" }}>Frequently Asked Questions — YourSite</p>
          <div className="flex items-center gap-2 text-yellow-500" style={{ fontSize: "11px" }}>
            <span>★★★★★</span>
            <span className="text-gray-500">4.8 (200+ reviews)</span>
          </div>
        </div>

        {/* People Also Ask - YOUR content */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <p className="font-semibold px-3 py-2 bg-gray-50 border-b border-gray-100" style={{ fontSize: "11px" }}>People also ask</p>
          {[
            { q: "How much does it cost?", a: "Plans start at $29/month with a 14-day free trial. No hidden fees." },
            { q: "Can I cancel anytime?", a: "Yes. Cancel in one click. Your data stays accessible for 30 days." },
            { q: "Does it integrate with Shopify?", a: "One-click install. Orders, inventory, and customers sync automatically." },
          ].map((item, i) => (
            <details key={i} className="border-b border-gray-100 last:border-0">
              <summary className="px-3 py-2 text-gray-800 cursor-pointer hover:text-purple-600 flex items-center justify-between" style={{ fontSize: "11px" }}>
                {item.q}
                <ChevronDown size={11} className="text-gray-300" />
              </summary>
              <div className="px-3 pb-2 text-gray-600 leading-relaxed" style={{ fontSize: "11px" }}>
                {item.a}
                <p className="text-blue-700 mt-1 cursor-pointer hover:underline" style={{ fontSize: "10px" }}>yoursite.com › faq › {item.q.toLowerCase().replace(/\s+/g, "-").replace(/\?/g, "")}</p>
              </div>
            </details>
          ))}
        </div>

        {/* Competitor - pushed below */}
        <div className="space-y-1 pt-2 border-t border-gray-100 opacity-50">
          <p className="text-gray-300" style={{ fontSize: "10px" }}>competitor.com › pricing</p>
          <p className="text-blue-700 font-medium cursor-pointer" style={{ fontSize: "13px" }}>Pricing — CompetitorName</p>
          <p className="text-gray-600 leading-relaxed">Compare plans &amp; pricing. Start your free trial today.</p>
        </div>

        {/* Indicator */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
          <p className="font-semibold text-purple-700" style={{ fontSize: "11px" }}>Your site now occupies ~45% of the screen</p>
          <p className="text-purple-600 mt-0.5" style={{ fontSize: "10px" }}>Rich results + PAA + reviews. Competitor pushed to page fold.</p>
        </div>
      </GoogleBrowser>
    </div>
  );
}

function ImpactGrid() {
  return (
    <div className="grid sm:grid-cols-4 gap-4">
      {[
        { icon: <Eye size={18} />, value: "2.5×", label: "More SERP real estate", sub: "vs pages without schema" },
        { icon: <MousePointerClick size={18} />, value: "+43%", label: "CTR improvement", sub: "For pages with FAQ rich results" },
        { icon: <BarChart3 size={18} />, value: "Top 3", label: "PAA position", sub: "Above traditional organic results" },
        { icon: <Zap size={18} />, value: "3 days", label: "Avg. indexing time", sub: "Google recrawls schema-enabled pages faster" },
      ].map((item) => (
        <div key={item.label} className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-purple-200 hover:shadow-sm transition-all">
          <div className="w-9 h-9 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 mx-auto mb-2">{item.icon}</div>
          <p className="text-xl font-bold text-gray-900">{item.value}</p>
          <p className="text-xs font-medium text-gray-700">{item.label}</p>
          <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
        </div>
      ))}
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
        <span className="text-xs text-gray-500">Copy-paste to &lt;head&gt;</span>
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
    const { allowed } = checkClientLimit("faq", FAQ_LIMIT);
    if (!allowed) { setError(`You've used all ${FAQ_LIMIT} free generations today. Come back tomorrow.`); return; }
    setLoading(true); setError(""); setResult(null);
    try {
      const res = await fetch("/p/faq/api/generate", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, audience }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      recordClientUsage("faq"); setResult(data);
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
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-16 sm:pt-28 pb-12 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full mb-6">
          <Code size={12} /> FAQ generator + schema markup
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
          Your FAQ, on Google.
          <br />
          <span className="text-purple-600">Not buried on page 3.</span>
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto mb-10 text-base leading-relaxed">
          Enter your URL. We scan your site and generate an SEO-optimized FAQ page —{" "}
          <strong className="text-gray-900">with JSON-LD schema</strong> that makes Google show your answers directly in search results.
        </p>

        <form onSubmit={handleGenerate} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
          <input type="url" value={url} onChange={(e) => setUrl(e.target.value)}
            placeholder="https://yourcompany.com"
            className="flex-1 border border-gray-300 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent" required />
          <button type="submit" disabled={loading || !url.trim()}
            className="bg-purple-600 text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-purple-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shrink-0">
            {loading ? "Scanning..." : <>Generate <ArrowRight size={16} /></>}
          </button>
        </form>
        <p className="text-xs text-gray-400 mt-4">Free beta · 3/day · No sign-up</p>
        {error && <div className="mt-6 max-w-md mx-auto bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-600">{error}</div>}
      </section>

      {/* ── Result view (if generated) ──────────────── */}
      {result && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 space-y-6">
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
        </section>
      )}

      {/* ── SERP Comparison: The money shot ──────────── */}
      {!result && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
          <div className="text-center mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">One change. Twice the visibility.</h2>
            <p className="text-gray-500 max-w-lg mx-auto text-sm">
              Same Google search. Same keyword. The only difference: your FAQ page has valid schema markup.
            </p>
          </div>
          <SERPComparison />
        </section>
      )}

      {/* ── Impact Data ──────────────────────────────── */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">The measurable difference</p>
            <h2 className="text-xl font-bold text-gray-900">FAQ schema doesn&apos;t just look nice. It moves numbers.</h2>
          </div>
          <ImpactGrid />
        </div>
      </section>

      {/* ── Who uses this ────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl font-bold text-center mb-8">Who uses this</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: <Building2 size={18} />, title: "SaaS companies", desc: "Your help docs are buried in a knowledge base nobody reads. Turn them into an SEO-optimized FAQ page that ranks and deflects support tickets." },
              { icon: <ShoppingCart size={18} />, title: "E-commerce stores", desc: "Customers have the same 10 questions. Answer them once on a FAQ page instead of 50 times in your inbox. Plus: Google shows FAQ rich results for product queries." },
              { icon: <Globe size={18} />, title: "Agencies & freelancers", desc: "Deliver a comprehensive FAQ with every client site. Takes 2 minutes. Clients think you spent hours — and their site gets better SEO out of the box." },
            ].map(w => (
              <div key={w.title} className="bg-white border border-gray-100 rounded-2xl p-5 text-center hover:border-purple-200 hover:shadow-sm transition-all">
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mx-auto mb-3">{w.icon}</div>
                <h3 className="font-semibold text-sm mb-1">{w.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>

          {/* Why not DIY */}
          <div className="mt-12">
            <h2 className="text-xl font-bold text-center mb-6">"Can't I just write my own FAQ?"</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm max-w-3xl mx-auto">
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <p className="font-semibold text-red-600 mb-2">DIY FAQ</p>
                <ul className="space-y-1.5 text-gray-600 text-xs">
                  <li>· Brainstorm questions → miss half of what customers ask</li>
                  <li>· Write answers → forget keywords → zero SEO benefit</li>
                  <li>· No JSON-LD schema → Google ignores your content</li>
                  <li>· Outdated in 3 months → nobody updates it</li>
                </ul>
              </div>
              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-5">
                <p className="font-semibold text-purple-700 mb-2">FAQ Builder</p>
                <ul className="space-y-1.5 text-gray-700 text-xs">
                  <li>· Scans your site → generates questions customers actually search</li>
                  <li>· SEO-optimized answers with natural keyword placement</li>
                  <li>· JSON-LD schema included → eligible for Google rich results</li>
                  <li>· 60 seconds. Copy-paste to your site. Done.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────── */}
      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-xs text-gray-400 uppercase tracking-wider text-center mb-6">From teams using FAQ Builder</p>
          {/* Horizontal scroll on mobile, 3-column on desktop */}
          <div className="grid md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((item, i) => (
              <div key={i} className={`bg-white border rounded-2xl p-5 ${i === testimonialIdx ? "border-purple-300 shadow-md ring-2 ring-purple-100" : "border-gray-100"} transition-all cursor-pointer hover:border-purple-200`}
                onClick={() => setTestimonialIdx(i)}>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: item.stars }).map((_, j) => <Star key={j} size={12} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 italic">&ldquo;{item.text}&rdquo;</p>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cross-links ──────────────────────────────── */}
      <section className="bg-gray-50 py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs text-gray-400 mb-3">More free tools from SEO Spark</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[["/","📝 SEO Spark"],["/p/proposal","🎯 Proposal Gen"],["/p/email","📬 Email Seq"],["/p/product","🛍 Product Desc"],["/p/cold-email","📧 Cold Email"]].map(([href, label]) => (
              <a key={href} href={href} className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-medium text-gray-600 hover:border-purple-300 hover:text-purple-600 transition-all">{label}</a>
            ))}
          </div>
        </div>
      </section>

      <footer className="text-center py-8 text-sm text-gray-400 space-y-2">
        <p>FAQ Builder — from SEO Spark. Your FAQ, on Google. Not buried on page 3.</p>
        <p>
          <a href="/" className="hover:text-gray-600 underline underline-offset-2">SEO Spark</a>
          <span className="mx-2">·</span>
          <a href="/p/proposal" className="hover:text-gray-600 underline underline-offset-2">Proposal Generator</a>
          <span className="mx-2">·</span>
        </p>
      </footer>
    </main>
  );
}
