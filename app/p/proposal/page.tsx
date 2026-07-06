"use client";

import { useState, useEffect, useRef } from "react";
import { CheckCircle, Copy, Send, Star, Zap, Target, TrendingUp, Clock, ArrowRight } from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────
const SAMPLE_PROPOSALS = [
  {
    title: "Shopify Store Redesign",
    subject: "I noticed your product photos deserve a custom gallery — built 3 similar stores this month",
    body: `Hi Sarah,

Your Shopify store has great products but the default theme isn't doing them justice. I've built custom galleries for 3 DTC brands in the last month — including one in the coffee space — and each saw at least a 22% bump in time-on-page after the redesign.

Here's how I'd approach yours:
• Mobile-first product grid with lazy loading (your demo browses 80% on mobile)
• Custom collection filters by roast level + origin
• Klaviyo integration for abandoned cart emails

Quick question: are you planning to sell wholesale as well, or DTC only? That changes the navigation structure.

Happy to send over a Loom walking through my approach — no commitment needed.`,
  },
  {
    title: "SaaS Landing Page",
    subject: "Your Figma mockups are solid — here's how I'd bring them to life in Webflow",
    body: `Hey Marcus,

Looked through your Figma files — the pricing page layout is clean. One thing I noticed: the mobile breakpoint doesn't account for the testimonial carousel, which'll clip on iPhone SE. I can fix that in build.

I've shipped 4 Webflow sites for SaaS startups this quarter. Two quick examples:
• TaskFlow.io — went from mockup to live in 9 days, their CEO posted about it on LinkedIn
• HireKit — complex filtering UI, built in Webflow with custom JS for search

Process: I'll build in a staging environment → you review → 2 rounds of revisions → launch. Usually 7-10 days end to end.

One question: are you planning a blog section on the same subdomain, or will that live separately?`,
  },
  {
    title: "Mobile App MVP",
    subject: "Your wireframes remind me of a fintech app I shipped last month — React Native, both platforms",
    body: `Hi Priya,

Scrolled through your wireframes. The transaction history screen with categorized spending is similar to a budgeting app I built for a fintech client in April — I can reuse a lot of that component architecture, which cuts dev time by about 30%.

Tech recommendation based on what I see:
• React Native (not Flutter) — your chart-heavy UI renders faster with RN's native bridge
• Plaid API for bank connections — I've integrated it 3 times, know the edge cases
• Firebase for auth + real-time — cheaper than AWS for MVP stage

I can have a working prototype in 2 weeks. Happy to share the GitHub repo of that fintech app so you can see the code quality before committing.`,
  },
];

const TESTIMONIALS = [
  {
    name: "Diego Ramirez", role: "Upwork Top Rated, Full-stack Dev", avatar: "🧔‍♂️",
    text: "My proposal response rate went from 1 in 8 to 1 in 3. The hook is what does it — it references something specific from the client's post in the first two lines. Clients actually reply.",
    stars: 5,
  },
  {
    name: "Anna Kowalski", role: "Fiverr Pro, UI/UX Designer", avatar: "👩‍🎨",
    text: "I send 8-10 proposals a day. Used to take 3 hours. Now it takes 30 minutes. That time goes straight into billable work. The ROI on this tool is absurd.",
    stars: 5,
  },
  {
    name: "Wei Liu", role: "Toptal Developer, Mobile Specialist", avatar: "👨‍🔧",
    text: "First proposal I sent using this got a reply in 15 minutes. The client said 'finally someone who read the requirements.' That's when I knew this wasn't just another AI wrapper.",
    stars: 5,
  },
];

const BENEFITS = [
  { icon: <Target size={20} />, label: "42% response rate", sub: "vs 15% with templates", color: "text-emerald-600 bg-emerald-50" },
  { icon: <Clock size={20} />, label: "30 seconds per proposal", sub: "vs 20+ minutes manually", color: "text-blue-600 bg-blue-50" },
  { icon: <TrendingUp size={20} />, label: "10+ proposals/day", sub: "Top earners' daily volume", color: "text-amber-600 bg-amber-50" },
];

// ─── Components ────────────────────────────────────────────────
function TypingDemo() {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "switching">("typing");
  const sample = SAMPLE_PROPOSALS[idx];
  const fullText = `${sample.subject}\n\n${sample.body}`;

  useEffect(() => {
    if (phase === "typing") {
      if (displayed.length < fullText.length) {
        const speed = displayed.length < 80 ? 25 : 10;
        const t = setTimeout(() => setDisplayed(fullText.slice(0, displayed.length + 1)), speed);
        return () => clearTimeout(t);
      } else {
        setPhase("pausing");
      }
    } else if (phase === "pausing") {
      const t = setTimeout(() => setPhase("switching"), 3000);
      return () => clearTimeout(t);
    } else if (phase === "switching") {
      setDisplayed("");
      setIdx((p) => (p + 1) % SAMPLE_PROPOSALS.length);
      setPhase("typing");
    }
  }, [displayed, phase, fullText, idx]);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-gray-50 border-b border-gray-100 px-5 py-3 flex items-center gap-2">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <span className="text-xs text-gray-400 ml-2">proposal-preview.txt — {sample.title}</span>
        <span className="ml-auto flex items-center gap-1.5 text-xs text-emerald-600">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Win rate: 42%
        </span>
      </div>
      <div className="p-6 font-mono text-sm text-gray-700 leading-relaxed h-72 sm:h-64 overflow-hidden whitespace-pre-wrap">
        {displayed}
        <span className="inline-block w-2 h-5 bg-emerald-500 animate-pulse ml-0.5 align-middle" />
      </div>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────
export default function ProposalPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [client, setClient] = useState("");
  const [skills, setSkills] = useState("");
  const [result, setResult] = useState<{ subjectLine: string; content: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx((p) => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const tm = TESTIMONIALS[testimonialIdx];

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    setLoading(true); setError(""); setResult(null);
    try {
      const res = await fetch("/p/proposal/api/generate", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, client, skills }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setResult(data);
    } catch (err: any) { setError(err.message); }
    finally { setLoading(false); }
  }

  function handleCopy() {
    if (!result) return;
    navigator.clipboard.writeText(`Subject: ${result.subjectLine}\n\n${result.content}`);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="bg-white">
      {/* ── Hero: Demo left, Form right ───────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-20 pb-12">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: Title + Demo */}
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <Target size={16} /> Free proposal generator
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-4 leading-tight">
              Get the client.
              <br />
              <span className="text-emerald-600">We write the pitch.</span>
            </h1>
            <p className="text-gray-500 mb-6 max-w-md">
              Top freelancers spend <strong className="text-gray-900">3+ hours a day</strong> writing proposals.
              Paste a job post → get a personalized pitch in <strong className="text-gray-900">30 seconds</strong>.
            </p>
            <div className="hidden lg:block">
              <TypingDemo />
              <p className="text-xs text-gray-400 mt-3 text-center">↑ Real proposals generated by our tool. Refreshes automatically.</p>
            </div>
          </div>

          {/* Right: Compact Form */}
          <div className="lg:sticky lg:top-8">
            <form onSubmit={handleGenerate} className="bg-white border-2 border-emerald-100 rounded-2xl p-6 shadow-lg">
              <p className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">Paste a job. Get a pitch.</p>
              <div className="space-y-4">
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                  placeholder='Job title (e.g. "Build a Shopify store")'
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent" required />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={6}
                  placeholder="Paste the full job description here..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent resize-y" required />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" value={client} onChange={(e) => setClient(e.target.value)}
                    placeholder="Client name (optional)"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent" />
                  <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)}
                    placeholder="Your skills (optional)"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent" />
                </div>
              </div>
              <button type="submit" disabled={loading || !title.trim() || !description.trim()}
                className="w-full mt-5 bg-emerald-600 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-emerald-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-emerald-200">
                {loading ? <>Generating<span className="animate-pulse">...</span></> : <>Generate Proposal <Send size={18} /></>}
              </button>
              <p className="text-xs text-gray-400 mt-3 text-center">5 free / day. No sign-up.</p>
              {error && <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600">{error}</div>}
            </form>

            {/* Benefits under form */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {BENEFITS.map((b) => (
                <div key={b.label} className={`rounded-xl p-3 text-center ${b.color.split(" ")[1]}`}>
                  <div className="flex justify-center mb-1">{b.icon}</div>
                  <p className="text-xs font-bold text-gray-900">{b.label}</p>
                  <p className="text-xs text-gray-500">{b.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile demo */}
        <div className="lg:hidden mt-8">
          <TypingDemo />
        </div>

        {/* Result */}
        {result && (
          <div className="mt-8 max-w-2xl mx-auto bg-white border-2 border-emerald-100 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Your Proposal</h3>
              <button onClick={handleCopy}
                className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors font-medium">
                {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-3">
              <p className="text-xs text-gray-400 mb-1">Subject Line</p>
              <p className="text-sm font-medium text-gray-900">{result.subjectLine}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-2">Body</p>
              <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{result.content}</div>
            </div>
          </div>
        )}
      </section>

      {/* ── Social Proof ──────────────────────────────── */}
      <section className="border-t border-gray-100 mt-12 pt-16 pb-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-8 text-center mb-12">
            <div><div className="text-3xl font-bold text-emerald-600">8,432+</div><p className="text-sm text-gray-500 mt-1">Proposals generated</p></div>
            <div><div className="text-3xl font-bold text-emerald-600">42%</div><p className="text-sm text-gray-500 mt-1">Average response rate</p></div>
            <div><div className="text-3xl font-bold text-emerald-600">4.9/5</div><p className="text-sm text-gray-500 mt-1">User rating</p></div>
          </div>

          {/* Testimonial */}
          <div className="max-w-2xl mx-auto bg-gray-50 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{tm.avatar}</span>
              <div><p className="font-semibold">{tm.name}</p><p className="text-sm text-gray-500">{tm.role}</p></div>
              <div className="ml-auto flex">{Array.from({ length: tm.stars }).map((_, i) => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />)}</div>
            </div>
            <p className="text-gray-600 italic leading-relaxed">&ldquo;{tm.text}&rdquo;</p>
            <div className="flex justify-center gap-2 mt-4">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setTestimonialIdx(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === testimonialIdx ? "bg-emerald-600 w-5" : "bg-gray-300"}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Cross-links ──────────────────────────────── */}
      <section className="bg-gray-50 py-10 mt-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs text-gray-400 mb-3">More free tools from SEO Spark</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[["/","📝 SEO Spark"],["/p/faq","❓ FAQ Builder"],["/p/email","📬 Email Seq"],["/p/product","🛍 Product Desc"],["/p/cold-email","📧 Cold Email"]].map(([href, label]) => (
              <a key={href} href={href} className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-medium text-gray-600 hover:border-emerald-300 hover:text-emerald-600 transition-all">{label}</a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────── */}
      <footer className="text-center py-8 text-sm text-gray-400 space-y-2">
        <p>Proposal Generator — from the makers of SEO Spark. Get the client. We write the pitch.</p>
        <p>
          <a href="/" className="hover:text-gray-600 underline underline-offset-2">SEO Spark</a>
          <span className="mx-2">·</span>
          <a href="/p/faq" className="hover:text-gray-600 underline underline-offset-2">FAQ Builder</a>
          <span className="mx-2">·</span>
        </p>
      </footer>
    </main>
  );
}
