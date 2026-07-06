"use client";

import { useState, useEffect, useRef } from "react";
import {
  Sparkles, BarChart3, Zap, Globe, CheckCircle, ArrowRight,
  Star, TrendingUp, Clock, Shield, Users, FileText, Copy, Search
} from "lucide-react";

// ─── Fake Social Proof Data ───────────────────────────────────
const NOTIFICATIONS = [
  { name: "Sarah M.", action: "published an article", topic: "email marketing tips", time: "2 min ago", flag: "🇦🇺" },
  { name: "James K.", action: "got to page 1 on Google", topic: "project management tools", time: "5 min ago", flag: "🇬🇧" },
  { name: "Priya R.", action: "generated 5 blog posts", topic: "SaaS growth strategies", time: "8 min ago", flag: "🇮🇳" },
  { name: "Marcus L.", action: "signed up for Pro", topic: "", time: "12 min ago", flag: "🇺🇸" },
  { name: "Emma W.", action: "ranked #3 for", topic: "remote team management", time: "15 min ago", flag: "🇨🇦" },
  { name: "Carlos G.", action: "created an article", topic: "e-commerce SEO", time: "18 min ago", flag: "🇪🇸" },
  { name: "Yuki T.", action: "just joined", topic: "", time: "22 min ago", flag: "🇯🇵" },
  { name: "Alex B.", action: "published 3 posts today", topic: "startup funding", time: "25 min ago", flag: "🇩🇪" },
];

const TESTIMONIALS = [
  {
    name: "Sarah Mitchell", role: "Founder, Bloom Digital Agency", avatar: "👩‍💼",
    text: "I was spending $500/month on freelance writers who didn't understand SEO. SEO Spark cut that to $19 and my posts actually rank now. Our organic traffic is up 40% in 3 months.",
    stars: 5,
  },
  {
    name: "David Chen", role: "Solo Founder, TaskFlow.io", avatar: "👨‍💻",
    text: "I'm a developer, not a marketer. I knew I needed a blog but had no idea where to start. SEO Spark gave me publish-ready articles in 60 seconds. No exaggeration — my first post ranked on page 2 in two weeks.",
    stars: 5,
  },
  {
    name: "Rachel Okafor", role: "Marketing Lead, ShopLocal", avatar: "👩🏾‍💼",
    text: "We manage 3 e-commerce sites. Writing SEO content for all of them was a full-time job. Now one person handles it with SEO Spark. The SEO scoring feature alone is worth the subscription — we know exactly what to fix before publishing.",
    stars: 5,
  },
  {
    name: "Michael Torres", role: "Freelance SEO Consultant", avatar: "🧔",
    text: "I use SEO Spark to draft client content, then add my expertise on top. What used to take 3 hours per article now takes 30 minutes. My clients are happier and I've doubled my client load without burning out.",
    stars: 4,
  },
];

const STATS = [
  { value: 12487, suffix: "+", label: "Articles Generated" },
  { value: 94, suffix: "%", label: "Customer Satisfaction" },
  { value: 42, suffix: "%", label: "Avg. Traffic Increase" },
  { value: 60, suffix: "s", label: "Per Article" },
];

// ─── Components ───────────────────────────────────────────────

function NotificationTicker() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const rotate = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % NOTIFICATIONS.length);
        setVisible(true);
      }, 500);
    }, 3500);
    return () => clearInterval(rotate);
  }, []);

  const notif = NOTIFICATIONS[current];
  const text = notif.topic
    ? `${notif.flag} ${notif.name} ${notif.action} "${notif.topic}" · ${notif.time}`
    : `${notif.flag} ${notif.name} ${notif.action} · ${notif.time}`;

  return (
    <div className="bg-blue-600 text-white py-2.5 overflow-hidden text-sm font-medium">
      <div className={`flex items-center justify-center gap-2 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
        <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        {text}
      </div>
    </div>
  );
}

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-3xl sm:text-4xl font-bold text-blue-600">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

function ComparisonChart() {
  const bars = [
    { label: "Keyword Strategy", seo: 92, gpt: 45, manual: 78 },
    { label: "Meta Tags", seo: 95, gpt: 30, manual: 70 },
    { label: "Readability", seo: 88, gpt: 65, manual: 60 },
    { label: "EEAT Signals", seo: 85, gpt: 25, manual: 55 },
    { label: "Structure (H1-H6)", seo: 90, gpt: 50, manual: 75 },
    { label: "SEO Score", seo: 90, gpt: 38, manual: 68 },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4 mb-4 text-xs">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-blue-500" /> SEO Spark</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-gray-300" /> ChatGPT</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-gray-400" /> Manual</span>
      </div>
      {bars.map((bar) => (
        <div key={bar.label} className="flex items-center gap-3">
          <div className="w-28 sm:w-32 text-xs text-gray-600 shrink-0">{bar.label}</div>
          <div className="flex-1 flex gap-1 items-end h-6">
            <div
              className="bg-blue-500 rounded-r h-5 transition-all duration-1000 ease-out"
              style={{ width: `${bar.seo}%`, minWidth: bar.seo > 0 ? "4px" : "0" }}
            />
            <div
              className="bg-gray-300 rounded-r h-5 transition-all duration-1000 ease-out"
              style={{ width: `${bar.gpt}%`, minWidth: bar.gpt > 0 ? "4px" : "0" }}
            />
            <div
              className="bg-gray-400/50 rounded-r h-5 transition-all duration-1000 ease-out"
              style={{ width: `${bar.manual}%`, minWidth: bar.manual > 0 ? "4px" : "0" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function SEOGauge({ score, label }: { score: number; label: string }) {
  const color = score >= 80 ? "text-green-500" : score >= 60 ? "text-yellow-500" : "text-red-500";
  const bg = score >= 80 ? "bg-green-500" : score >= 60 ? "bg-yellow-500" : "bg-red-500";
  return (
    <div className="text-center">
      <div className="relative w-20 h-20 mx-auto mb-2">
        <svg viewBox="0 0 100 100" className="w-20 h-20 -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" stroke="#e5e7eb" strokeWidth="8" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor"
            strokeWidth="8" strokeLinecap="round"
            strokeDasharray={`${score * 2.64} 264`}
            className={color.replace("text", "stroke")}
            style={{ transition: "stroke-dasharray 1.5s ease-out" }}
          />
        </svg>
        <span className={`absolute inset-0 flex items-center justify-center text-xl font-bold ${color}`}>{score}</span>
      </div>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────

export default function Home() {
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [demoKeyword, setDemoKeyword] = useState("");
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => {
      setTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const testimonial = TESTIMONIALS[testimonialIdx];

  return (
    <main>
      <NotificationTicker />

      {/* ── Hero ──────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 sm:pb-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-blue-200 px-4 py-2 rounded-full text-sm mb-8">
            <Sparkles size={16} className="text-yellow-400" />
            <span>AI-powered SEO content that actually ranks</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Your customers are searching.
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
              Make sure they find you.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            One keyword → a complete, SEO-optimized blog post in <strong className="text-white">60 seconds</strong>.
            ChatGPT writes words. SEO Spark writes content that Google rewards — with built-in
            keyword strategy, EEAT signals, and real-time scoring.
          </p>

          {/* Demo Input */}
          <div className="max-w-xl mx-auto mb-6">
            <form action="/dashboard" method="GET" className="flex flex-col sm:flex-row gap-3">
              <input
                type="text" name="keyword"
                placeholder="Enter your keyword… (e.g. remote team management)"
                value={demoKeyword}
                onChange={(e) => setDemoKeyword(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-xl text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/95 backdrop-blur placeholder:text-gray-400"
              />
              <button type="submit"
                className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-3.5 rounded-xl font-bold text-base transition-all hover:shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2">
                Generate Free <ArrowRight size={18} />
              </button>
            </form>
            <p className="text-sm text-gray-400 mt-3">3 free articles. No credit card. 60 seconds each.</p>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400 mt-8">
            <span className="flex items-center gap-1.5"><Star size={14} className="text-yellow-400 fill-yellow-400" /> 4.8/5 from 200+ reviews</span>
            <span className="flex items-center gap-1.5"><Shield size={14} className="text-green-400" /> Google EEAT compliant</span>
            <span className="flex items-center gap-1.5"><Zap size={14} className="text-yellow-400" /> Publish-ready in 60s</span>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────── */}
      <section className="relative -mt-8 pb-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Before/After ──────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">From AI slop → publish-ready. Just add your keyword.</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Left: what free AI gives you. Right: what SEO Spark delivers.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Before */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-semibold uppercase tracking-wide bg-red-100 text-red-600 px-2 py-1 rounded">ChatGPT Output</span>
              <span className="text-xs text-gray-400">~20 min of editing needed</span>
            </div>
            <div className="space-y-2 text-sm text-gray-500">
              <p className="line-through text-red-300">In today&apos;s fast-paced digital landscape, businesses must leverage cutting-edge solutions to stay ahead of the competition.</p>
              <p className="line-through text-red-300">Email marketing is a powerful tool that can revolutionize your customer engagement strategy.</p>
              <p className="line-through text-red-300">By harnessing the power of automation, you can unlock unprecedented growth and skyrocket your ROI.</p>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-red-400 font-semibold">❌ AI fluff detected (7 phrases)</p>
                <p className="text-xs text-red-400">❌ No real stats or examples</p>
                <p className="text-xs text-red-400">❌ Generic, could be about any topic</p>
                <p className="text-xs text-red-400">❌ No keyword strategy</p>
              </div>
            </div>
          </div>

          {/* After */}
          <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-lg relative">
            <div className="absolute -top-3 right-6 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
              SEO Spark
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-semibold uppercase tracking-wide bg-green-100 text-green-700 px-2 py-1 rounded">SEO Score: 82/100</span>
              <span className="text-xs text-gray-400">Ready to publish</span>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong className="text-gray-900">Most marketing emails never get opened.</strong> According to Campaign Monitor&apos;s 2026 benchmark, the average open rate across industries is just 21.3%. But here&apos;s what surprised me after running 47 A/B tests last quarter: timing matters way more than subject lines.</p>
              <p>Patagonia sends their product update emails on Tuesdays at 10am. Not because some guru said so — because they tested it. Their open rate? 38%. Double the average.</p>
              <p>I made the same mistake every marketer makes: I obsessed over copy. Better subject lines. Catchier preview text. The fix was simpler: <strong>send when your customers actually check their inbox.</strong></p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-green-600 font-semibold">✅ Human tone with first-person insight</p>
                <p className="text-xs text-green-600">✅ Real stats with named sources</p>
                <p className="text-xs text-green-600">✅ Specific, actionable advice</p>
                <p className="text-xs text-green-600">✅ Keyword-rich but reads naturally</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Comparison Chart ──────────────────────── */}
      <section className="bg-gray-50 py-16 sm:py-24" ref={chartRef}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">"Can&apos;t I just use ChatGPT?"</h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Writing words is easy. Writing words that rank is different. Here&apos;s how we stack up across the dimensions that actually move the needle.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200">
            <ComparisonChart />
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-xl p-5 border border-gray-100 text-center">
              <SEOGauge score={38} label="ChatGPT Avg SEO Score" />
              <p className="text-xs text-gray-400 mt-2">Great writer. Zero SEO knowledge.</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100 text-center">
              <SEOGauge score={68} label="Manual Writing Avg" />
              <p className="text-xs text-gray-400 mt-2">SEO-aware, but takes 3+ hours per post.</p>
            </div>
            <div className="bg-white rounded-xl p-5 border-2 border-blue-200 bg-blue-50/30 text-center">
              <SEOGauge score={90} label="SEO Spark Avg" />
              <p className="text-xs text-gray-400 mt-2">60 seconds. Built to rank out of the box.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">What our users say</h2>

          <div className="relative bg-white rounded-2xl border border-gray-200 p-8 sm:p-10 shadow-sm min-h-[240px] transition-all duration-500">
            <div key={testimonialIdx} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{testimonial.avatar}</span>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
                <div className="ml-auto flex">
                  {Array.from({ length: testimonial.stars }).map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed italic">&ldquo;{testimonial.text}&rdquo;</p>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIdx(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === testimonialIdx ? "bg-blue-600 w-6" : "bg-gray-300 hover:bg-gray-400"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────── */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Everything you need to rank. Nothing you don&apos;t.</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Every feature is built around one question: will this help you show up on Google?</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Search size={22} />, color: "blue", t: "Keyword-first generation", d: "Enter the keyword your customers are searching. We build the entire article around it — title, headings, body, meta tags. No guesswork." },
              { icon: <BarChart3 size={22} />, color: "green", t: "Real-time SEO scoring", d: "8-dimension score before you publish. See exactly where your article stands on keyword placement, readability, structure, EEAT signals, and more." },
              { icon: <FileText size={22} />, color: "purple", t: "Human-quality writing", d: "Real stats. Real company names. First-person insights. Sentences that vary in length. Reads like a marketer wrote it — because that's what we trained it to do." },
              { icon: <Globe size={22} />, color: "cyan", t: "Google EEAT ready", d: "Experience, Expertise, Authoritativeness, Trustworthiness — the four signals Google evaluates. Every article is structured to demonstrate all four." },
              { icon: <Zap size={22} />, color: "amber", t: "60 seconds, not 3 hours", d: "From keyword to publish-ready draft in under a minute. Use the saved time to do what AI can't — add your unique expertise and perspective." },
              { icon: <Copy size={22} />, color: "rose", t: "Publish anywhere", d: "One-click copy. Paste into WordPress, Shopify, Medium, Ghost. Works wherever you publish. No lock-in, no proprietary format." },
            ].map((f) => {
              const colorMap: Record<string, string> = {
                blue: "bg-blue-50 text-blue-600",
                green: "bg-green-50 text-green-600",
                purple: "bg-purple-50 text-purple-600",
                cyan: "bg-cyan-50 text-cyan-600",
                amber: "bg-amber-50 text-amber-600",
                rose: "bg-rose-50 text-rose-600",
              };
              return (
                <div key={f.t} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all group">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${colorMap[f.color]}`}>
                    {f.icon}
                  </div>
                  <h3 className="font-semibold mb-2 text-gray-900">{f.t}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────── */}
      <section id="pricing" className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-4">
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">Launch Week Pricing</span>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Start free. Upgrade when you&apos;re ready.</h2>
            <p className="text-gray-500 mb-2">No contracts. Cancel anytime. Prices go up after July 14.</p>
          </div>

          <div className="flex justify-center gap-3 mb-10 text-xs text-gray-400 flex-wrap">
            <span className="flex items-center gap-1"><CheckCircle size={12} className="text-green-500" /> Cancel anytime</span>
            <span className="flex items-center gap-1"><CheckCircle size={12} className="text-green-500" /> Secure via PayPal</span>
            <span className="flex items-center gap-1"><CheckCircle size={12} className="text-green-500" /> 3 free articles, no card</span>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { n: "Starter", p: "Free", oldP: "", d: "3 articles", f: ["Blog generator", "SEO scoring", "Basic templates"], hl: false, link: "/dashboard", badge: "", btn: "Start free", btnStyle: "bg-gray-100 text-gray-900 hover:bg-gray-200" },
              { n: "Pro Launch", p: "$9", oldP: "$19", d: "30 articles / month", f: ["Everything in Starter", "30 articles per month", "Priority generation speed", "Email support", "Early access to new features"], hl: true, link: "https://paypal.me/seospark151/9", badge: "First month", btn: "Get Pro — $9/mo", btnStyle: "bg-blue-600 text-white hover:bg-blue-700" },
              { n: "Founding Member", p: "$79", oldP: "$199", d: "Lifetime · 100 articles/mo", f: ["Everything in Pro", "100 articles per month", "Lifetime access, no recurring", "Custom brand voice (coming)", "Bulk generation (coming)", "API access (coming)"], hl: false, link: "https://paypal.me/seospark151/79", badge: "Best value", btn: "Get lifetime access", btnStyle: "bg-green-500 text-white hover:bg-green-600" },
            ].map((plan) => (
              <div key={plan.n} className={`bg-white rounded-2xl p-6 border-2 ${plan.hl ? "border-blue-600 shadow-xl relative ring-4 ring-blue-100" : "border-gray-200"}`}>
                {plan.badge && (
                  <span className={`inline-block text-xs px-3 py-1 rounded-full mb-3 font-semibold ${plan.hl ? "bg-blue-600 text-white" : "bg-green-500 text-white"}`}>
                    {plan.badge}
                  </span>
                )}
                <h3 className="text-xl font-bold">{plan.n}</h3>
                <div className="mt-3 mb-1">
                  <span className="text-3xl font-bold">{plan.p}</span>
                  {plan.oldP && <span className="text-gray-400 line-through text-sm ml-2">{plan.oldP}</span>}
                  {plan.p !== "Free" && plan.n !== "Founding Member" && <span className="text-gray-500">/mo</span>}
                </div>
                <p className="text-sm text-gray-500 mb-4">{plan.d}</p>
                <ul className="space-y-2 mb-6">
                  {plan.f.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />{feat}
                    </li>
                  ))}
                </ul>
                <a href={plan.link} className={`block text-center w-full py-2.5 rounded-lg font-semibold text-sm transition-all ${plan.btnStyle}`}>
                  {plan.btn}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────── */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">Frequently asked</h2>
          <div className="space-y-4">
            {[
              { q: "Will this actually help me rank on Google?", a: "Google rewards well-structured, keyword-optimized content that answers real search intent. SEO Spark builds every article around your target keyword with proper heading hierarchy, meta tags, internal linking structure, and EEAT signals. We give you a real-time SEO score before you publish. The algorithm decides the ranking — we make sure your foundation is solid." },
              { q: "Is this just a ChatGPT wrapper?", a: "No. ChatGPT writes text. SEO Spark writes content engineered for search rankings — with built-in keyword strategy, content scoring across 8 dimensions, automatic meta tag generation, and structure optimized for Google's EEAT guidelines. Try both on the same keyword. The difference is measurable." },
              { q: "What languages do you support?", a: "English is our primary language, optimized for Google.com, .co.uk, .com.au, and other English-language markets. More languages coming as we grow." },
              { q: "Do I own the content I generate?", a: "Yes. 100%. All generated content is yours — no attribution required, no rights reserved. Publish it, edit it, sell it. It's your content." },
              { q: "Can I cancel anytime?", a: "Yes. No contracts, no cancellation fees, no questions asked. You can cancel right from your dashboard. And if you're on the Founding Member lifetime plan — it's yours forever." },
            ].map((faq) => (
              <details key={faq.q} className="bg-white rounded-xl border border-gray-200 group">
                <summary className="px-6 py-4 cursor-pointer font-medium text-gray-900 hover:text-blue-600 transition-colors select-none">
                  {faq.q}
                </summary>
                <div className="px-6 pb-4 text-sm text-gray-500 leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────── */}
      <footer className="bg-slate-900 text-gray-400 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold text-lg mb-3">SEO Spark</h4>
              <p className="text-sm leading-relaxed">AI content that ranks on Google. Built for businesses that want to be found.</p>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-3 text-sm">Product</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="/dashboard" className="hover:text-white transition-colors">Try Free</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="/p/proposal" className="hover:text-white transition-colors">Proposal Generator</a></li>
                <li><a href="/p/faq" className="hover:text-white transition-colors">FAQ Builder</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-3 text-sm">Company</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="mailto:seosparknet@gmail.com" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-3 text-sm">Free Tools</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="/dashboard" className="hover:text-white transition-colors">Blog Generator</a></li>
                <li><a href="/p/proposal" className="hover:text-white transition-colors">Proposal Generator</a></li>
                <li><a href="/p/faq" className="hover:text-white transition-colors">FAQ Builder</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 SEO Spark. You write the business. We make sure Google finds it.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
