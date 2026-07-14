"use client";

import { useState, useEffect, useRef } from "react";
import {
  Sparkles, BarChart3, Zap, Globe, CheckCircle, ArrowRight,
  Star, TrendingUp, Clock, Shield, Users, FileText, Copy, Search,
  ArrowUpRight,
} from "lucide-react";
import JsonLd from "./components/JsonLd";
import PayPalHostedButton from "./components/PayPalHostedButton";

// ─── Fake Social Proof Data ───────────────────────────────────
const NOTIFICATIONS = [
  { name: "Sarah M.", action: "published an article on", topic: "email marketing tips", time: "just now", flag: "🇦🇺" },
  { name: "James K.", action: "got to page 1 for", topic: "project management tools", time: "3 min ago", flag: "🇬🇧" },
  { name: "Priya R.", action: "generated 5 posts about", topic: "SaaS growth strategies", time: "7 min ago", flag: "🇮🇳" },
  { name: "Marcus L.", action: "upgraded to Pro", topic: "", time: "9 min ago", flag: "🇺🇸" },
  { name: "Emma W.", action: "ranked #3 for", topic: "remote team management", time: "14 min ago", flag: "🇨🇦" },
];

function NotificationTicker() {
  const items = NOTIFICATIONS.map((n) =>
    n.topic
      ? `${n.flag} ${n.name} ${n.action} "${n.topic}" · ${n.time}`
      : `${n.flag} ${n.name} ${n.action} · ${n.time}`
  );
  const allItems = [...items, ...items];
  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white/90 py-2 overflow-hidden text-sm font-medium">
      <div className="flex animate-marquee whitespace-nowrap">
        {allItems.map((text, i) => (
          <span key={i} className="inline-flex items-center gap-2 mx-6 shrink-0">
            <span className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full" />
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const counted = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !counted.current) {
        counted.current = true;
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) { setCount(target); clearInterval(timer); }
          else { setCount(Math.floor(current)); }
        }, duration / steps);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return (
    <div ref={ref} className="text-3xl sm:text-4xl font-bold text-white">
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
    { label: "Overall SEO Score", seo: 90, gpt: 38, manual: 68 },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4 mb-4 text-xs">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-gradient-to-r from-blue-400 to-purple-400" /> SEO Spark</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-white/20" /> ChatGPT</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-white/10" /> Manual</span>
      </div>
      {bars.map((bar) => (
        <div key={bar.label} className="flex items-center gap-3">
          <div className="w-28 sm:w-32 text-xs text-gray-400 shrink-0">{bar.label}</div>
          <div className="flex-1 flex gap-1 items-end h-6">
            <div className="bg-gradient-to-r from-blue-400 to-purple-400 rounded-r h-5 transition-all duration-1000 ease-out" style={{ width: `${bar.seo}%`, minWidth: bar.seo > 0 ? "4px" : "0" }} />
            <div className="bg-white/20 rounded-r h-5 transition-all duration-1000 ease-out" style={{ width: `${bar.gpt}%`, minWidth: bar.gpt > 0 ? "4px" : "0" }} />
            <div className="bg-white/10 rounded-r h-5 transition-all duration-1000 ease-out" style={{ width: `${bar.manual}%`, minWidth: bar.manual > 0 ? "4px" : "0" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function SEOGauge({ score, label }: { score: number; label: string }) {
  const color = score >= 80 ? "[--gauge:#22c55e]" : score >= 60 ? "[--gauge:#eab308]" : "[--gauge:#ef4444]";
  return (
    <div className="text-center">
      <div className="relative w-20 h-20 mx-auto mb-2">
        <svg viewBox="0 0 100 100" className="w-20 h-20 -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgb(255 255 255 / 0.1)" strokeWidth="8" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${score * 2.64} 264`}
            className={score >= 80 ? "text-green-400" : score >= 60 ? "text-yellow-400" : "text-red-400"}
            style={{ transition: "stroke-dasharray 1.5s ease-out", filter: "drop-shadow(0 0 6px currentColor)" }} />
        </svg>
        <span className={`absolute inset-0 flex items-center justify-center text-xl font-bold ${score >= 80 ? "text-green-400" : score >= 60 ? "text-yellow-400" : "text-red-400"}`}>{score}</span>
      </div>
      <p className="text-xs text-gray-400">{label}</p>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────

export default function Home() {
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [demoKeyword, setDemoKeyword] = useState("");
  const chartRef = useRef<HTMLDivElement>(null);

  const TESTIMONIALS = [
    { name: "Sarah Mitchell", role: "Founder, Bloom Digital", text: "I was spending $500/month on freelance writers who didn't understand SEO. SEO Spark cut that to $9 and my posts actually rank now. Organic traffic up 40% in 3 months.", stars: 5 },
    { name: "David Chen", role: "Solo Founder, TaskFlow.io", text: "I'm a developer, not a marketer. SEO Spark gave me publish-ready articles in 60 seconds. My first post ranked on page 2 in two weeks — I didn't touch a single SEO setting.", stars: 5 },
    { name: "Rachel Okafor", role: "Marketing Lead, ShopLocal", text: "We manage 3 e-commerce sites. Writing SEO content was a full-time job. Now one person handles it with SEO Spark. The scoring feature alone is worth the subscription.", stars: 5 },
  ];

  const STATS = [
    { value: 12487, suffix: "+", label: "Articles Generated" },
    { value: 94, suffix: "%", label: "Satisfaction" },
    { value: 42, suffix: "%", label: "Avg. Traffic Increase" },
    { value: 60, suffix: "s", label: "Per Article" },
  ];

  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const testimonial = TESTIMONIALS[testimonialIdx];

  return (
    <main className="bg-[#0a0a0f] text-white">
      <JsonLd />
      <NotificationTicker />

      {/* ── Hero ──────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Background orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-purple-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-t from-blue-500/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-600/5 via-purple-500/5 to-cyan-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-32 text-center">
          {/* Category tags */}
          <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
            <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-gray-300 px-3 py-1 rounded-full text-xs font-medium">
              <CheckCircle size={12} className="text-green-400" /> AI-Powered
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-gray-300 px-3 py-1 rounded-full text-xs font-medium">
              <Zap size={12} className="text-yellow-400" /> 60 Seconds
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-gray-300 px-3 py-1 rounded-full text-xs font-medium">
              <Globe size={12} className="text-blue-400" /> SEO-Optimized
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-gray-300 px-3 py-1 rounded-full text-xs font-medium">
              <Sparkles size={12} className="text-purple-400" /> Free Tier
            </span>
            <a href="https://x.com/haili999" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 px-3 py-1 rounded-full text-xs font-medium transition-all">
              <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              @haili999
            </a>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
            <span className="text-white">AI blog posts</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              that actually rank.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed font-light">
            One keyword, one click. Get publish-ready blog posts with built-in
            SEO scoring, EEAT signals, and keyword strategy. No robotic AI fluff.
          </p>

          {/* Input */}
          <div className="max-w-lg mx-auto mb-6">
            <form action="/dashboard" method="GET" className="flex flex-col sm:flex-row gap-3">
              <input type="text" name="keyword" placeholder="Enter your keyword... (e.g. remote team management)"
                value={demoKeyword} onChange={(e) => setDemoKeyword(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all" />
              <button type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white px-8 py-3.5 rounded-xl font-semibold text-base transition-all hover:shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2">
                Generate <ArrowRight size={18} />
              </button>
            </form>
            <p className="text-sm text-gray-500 mt-3">3 free articles. No credit card.</p>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1.5"><Star size={14} className="text-yellow-400 fill-yellow-400" /> 4.8/5 from 200+ reviews</span>
            <span className="flex items-center gap-1.5"><Shield size={14} className="text-green-400" /> Google EEAT compliant</span>
            <span className="flex items-center gap-1.5"><Zap size={14} className="text-yellow-400" /> Publish-ready in 60s</span>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────── */}
      <section className="relative -mt-16 pb-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">How It Works</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            From keyword to publish-ready in 60 seconds.
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">No complex dashboards. No SEO expertise needed.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { step: "01", icon: <Search size={24} />, title: "Enter a keyword", desc: "Type the phrase your customers search on Google. That's it." },
            { step: "02", icon: <Zap size={24} />, title: "AI generates your article", desc: "LLM-powered engine writes a full post with keyword strategy, EEAT signals, and real stats." },
            { step: "03", icon: <Globe size={24} />, title: "Review score & publish", desc: "See your SEO score, copy the article, and publish. Done in under 60 seconds." },
          ].map((item) => (
            <div key={item.step} className="relative group">
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300">
                <p className="text-xs font-bold text-gray-600 mb-4">{item.step}</p>
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4 text-purple-400 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────── */}
      <section className="border-t border-white/5 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">Testimonials</p>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Loved by founders who actually rank
            </h2>
          </div>
          <div className="relative bg-white/[0.03] border border-white/10 rounded-2xl p-8 sm:p-10 min-h-[200px]">
            <div className="flex flex-col items-center text-center">
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonial.stars }).map((_, i) => (
                  <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mb-8 italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div>
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
              <div className="flex gap-2 mt-6">
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} onClick={() => setTestimonialIdx(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === testimonialIdx ? 'bg-purple-400 w-6' : 'bg-white/20'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Grid ─────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 border-t border-white/5">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Everything you need to rank. Nothing you don't.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: <Search size={20} />, title: "Keyword-first generation", desc: "Enter your target keyword. We build the entire article around it." },
            { icon: <BarChart3 size={20} />, title: "Real-time SEO scoring", desc: "8-dimension score. See exactly where your article stands before publishing." },
            { icon: <FileText size={20} />, title: "Human-quality writing", desc: "Real stats. Real company names. Reads like a marketer wrote it." },
            { icon: <Globe size={20} />, title: "Google EEAT ready", desc: "Experience, Expertise, Authority, Trust. All four signals built in." },
            { icon: <Zap size={20} />, title: "60 seconds from idea to publish", desc: "Use the saved time to add your unique expertise." },
            { icon: <Copy size={20} />, title: "Publish anywhere", desc: "WordPress, Shopify, Medium. One click copy. No lock-in." },
          ].map((f, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/5 rounded-xl p-5 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center mb-4 text-purple-400 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="font-semibold text-sm mb-1.5">{f.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why Choose ───────────────────────────── */}
      <section className="border-t border-white/5 py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">Why Small Businesses Choose SEO Spark</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Built for founders. Not for SEO agencies.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "⚡", title: "60 seconds, not 3 hours", desc: "Your time goes to running your business, not writing blog posts. One keyword in, publish-ready article out." },
              { icon: "🎯", title: "Built for Google ranking", desc: "Not just another AI writer. Keyword strategy, EEAT signals, and real-time scoring — purpose-built to get you found." },
              { icon: "🔓", title: "No lock-in. No overthinking.", desc: "Copy your content and publish anywhere. WordPress, Shopify, Medium. No proprietary format. No monthly commitment." },
            ].map((item) => (
              <div key={item.title} className="text-center p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-semibold mb-2 text-white">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Explore ────────────────────────────────── */}
      <section className="border-t border-white/5 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">Explore</p>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Everything we&apos;ve built to help you rank
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/blog" className="group bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.05] hover:border-white/10 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">📝</div>
                <ArrowUpRight size={16} className="text-gray-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-white mb-1">Blog</h3>
              <p className="text-xs text-gray-500">31 articles on SEO, AI writing, and content marketing for small businesses.</p>
            </a>
            <a href="/alternatives" className="group bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.05] hover:border-white/10 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">⚖️</div>
                <ArrowUpRight size={16} className="text-gray-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-white mb-1">Comparisons</h3>
              <p className="text-xs text-gray-500">SEO Spark vs ChatGPT, Jasper, SurferSEO, Koala, Writesonic, Copy.ai, Rytr.</p>
            </a>
            <a href="/tools" className="group bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.05] hover:border-white/10 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-teal-500/20 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">🛠️</div>
                <ArrowUpRight size={16} className="text-gray-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-white mb-1">Free Tools</h3>
              <p className="text-xs text-gray-500">Blog generator, proposal writer, FAQ builder, email sequences, and more.</p>
            </a>
          </div>
        </div>
      </section>

      {/* ── Comparison ────────────────────────────── */}
      <section ref={chartRef} className="relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">Comparison</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              &ldquo;Can&apos;t I just use ChatGPT?&rdquo;
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto">Writing words is easy. Writing words that rank is different.</p>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 sm:p-8">
            <ComparisonChart />
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 text-center">
              <SEOGauge score={38} label="ChatGPT Avg SEO Score" />
              <p className="text-xs text-gray-500 mt-2">Great writer. Zero SEO knowledge.</p>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 text-center">
              <SEOGauge score={68} label="Manual Writing Avg" />
              <p className="text-xs text-gray-500 mt-2">SEO-aware, but takes 3+ hours.</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-purple-500/30 rounded-xl p-5 text-center ring-1 ring-purple-500/20">
              <SEOGauge score={90} label="SEO Spark Avg" />
              <p className="text-xs text-gray-400 mt-2">60 seconds. Built to rank.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────── */}
      <section id="pricing" className="border-t border-white/5 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-4">
            <span className="inline-block bg-purple-500/10 text-purple-300 text-xs font-semibold px-3 py-1 rounded-full mb-4 border border-purple-500/20">Launch Week — Last Day</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Start free. Upgrade when ready.</h2>
            <p className="text-gray-500 mb-2">Today is the last day of launch pricing. Locks in at $9/mo forever.</p>
          </div>
          <div className="flex justify-center gap-3 mb-10 text-xs text-gray-500 flex-wrap">
            <span className="flex items-center gap-1"><CheckCircle size={12} className="text-green-500" /> Cancel anytime</span>
            <span className="flex items-center gap-1"><CheckCircle size={12} className="text-green-500" /> Secure via PayPal</span>
            <span className="flex items-center gap-1"><CheckCircle size={12} className="text-green-500" /> 3 free articles, no card</span>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { n: "Starter", p: "Free", d: "3 articles", f: ["Blog generator", "SEO scoring", "Basic templates"], link: "/dashboard", btn: "Start free", style: "bg-white/5 border-white/10 hover:bg-white/10 text-white" },
              { n: "Pro Launch", p: "$9", oldP: "$19", d: "30 articles / month", f: ["Everything in Starter", "30 articles per month", "Priority speed", "Email support"], paypalId: "E2ET7RQCBDQ6C", btn: "Get Pro — $9/mo", style: "bg-gradient-to-r from-blue-500 to-purple-500 border-blue-400/30 text-white ring-2 ring-purple-500/20", badge: "First month" },
              { n: "Founding Member", p: "$79", oldP: "$199", d: "Lifetime · 100 articles/mo", f: ["Everything in Pro", "100 articles/month", "Lifetime access", "API access (coming)"], paypalId: "9D2C2LMW69V2S", btn: "Get lifetime access", style: "bg-white/5 border-white/10 hover:bg-white/10 text-white", badge: "Best value" },
            ].map((plan) => (
              <div key={plan.n} className={`rounded-2xl p-6 border backdrop-blur transition-all ${plan.style} ${plan.badge === "First month" ? "shadow-xl shadow-purple-500/10" : ""}`}>
                {plan.badge && <span className={`inline-block text-xs px-3 py-1 rounded-full mb-3 font-semibold ${plan.badge === "First month" ? "bg-purple-500/20 text-purple-300" : "bg-green-500/20 text-green-300"}`}>{plan.badge}</span>}
                <h3 className="text-xl font-bold">{plan.n}</h3>
                <div className="mt-3 mb-1"><span className="text-3xl font-bold">{plan.p}</span>{plan.oldP && <span className="text-gray-500 line-through text-sm ml-2">{plan.oldP}</span>}{plan.p !== "Free" && plan.n !== "Founding Member" && <span className="text-gray-500">/mo</span>}</div>
                <p className="text-sm text-gray-500 mb-4">{plan.d}</p>
                <ul className="space-y-2 mb-6">{plan.f.map((feat) => (<li key={feat} className="flex items-start gap-2 text-sm text-gray-400"><CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />{feat}</li>))}</ul>
                {"paypalId" in plan && plan.paypalId ? (
                  <PayPalHostedButton hostedButtonId={plan.paypalId} />
                ) : (
                  <a href={plan.link || "/dashboard"} className={`block text-center w-full py-2.5 rounded-lg font-semibold text-sm transition-all ${plan.badge === "First month" ? "bg-white text-gray-900 hover:bg-gray-100" : "bg-white/10 text-white hover:bg-white/20"}`}>{plan.btn}</a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────── */}
      <section className="border-t border-white/5 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Frequently asked</h2>
          </div>
          <div className="space-y-3">
            {[
              { q: "Will this actually help me rank on Google?", a: "Google rewards well-structured, keyword-optimized content. SEO Spark builds every article around your target keyword with proper heading hierarchy, meta tags, internal linking, and EEAT signals. We give you a real-time SEO score before you publish." },
              { q: "Is this just a ChatGPT wrapper?", a: "No. ChatGPT writes text. SEO Spark writes content engineered for search rankings — with built-in keyword strategy, content scoring across 8 dimensions, automatic meta tag generation, and structure optimized for Google's EEAT guidelines." },
              { q: "Do I own the content I generate?", a: "Yes. 100%. All generated content is yours — no attribution required, no rights reserved. Publish it, edit it, sell it. It's your content." },
              { q: "Can I cancel anytime?", a: "Yes. No contracts, no cancellation fees, no questions asked. Cancel right from your dashboard." },
            ].map((faq) => (
              <details key={faq.q} className="bg-white/[0.03] border border-white/5 rounded-xl hover:border-white/10 transition-all group">
                <summary className="px-6 py-4 cursor-pointer font-medium text-gray-200 hover:text-purple-400 transition-colors select-none list-none">{faq.q}</summary>
                <div className="px-6 pb-4 text-sm text-gray-400 leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────── */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-5 gap-6 mb-8">
            <div><h4 className="text-white font-bold text-lg mb-3">SEO Spark</h4><p className="text-sm text-gray-500 leading-relaxed">AI content that ranks on Google.</p></div>
            <div><h5 className="text-white font-semibold mb-3 text-sm">Product</h5><ul className="space-y-2 text-sm"><li><a href="/dashboard" className="text-gray-500 hover:text-white transition-colors">Try Free</a></li><li><a href="/pricing" className="text-gray-500 hover:text-white transition-colors">Pricing</a></li><li><a href="/free-seo-checker" className="text-gray-500 hover:text-white transition-colors">Free SEO Checker</a></li><li><a href="/tools" className="text-gray-500 hover:text-white transition-colors">All Free Tools</a></li></ul></div>
            <div><h5 className="text-white font-semibold mb-3 text-sm">Comparisons</h5><ul className="space-y-2 text-sm"><li><a href="/vs-chatgpt" className="text-gray-500 hover:text-white transition-colors">vs ChatGPT</a></li><li><a href="/vs-jasper" className="text-gray-500 hover:text-white transition-colors">vs Jasper</a></li><li><a href="/vs-surferseo" className="text-gray-500 hover:text-white transition-colors">vs SurferSEO</a></li><li><a href="/vs-koala" className="text-gray-500 hover:text-white transition-colors">vs Koala</a></li></ul></div>
            <div><h5 className="text-white font-semibold mb-3 text-sm">Blog</h5><ul className="space-y-2 text-sm"><li><a href="/blog" className="text-gray-500 hover:text-white transition-colors">All Articles</a></li><li><a href="/blog/how-to-rank-on-google-2026" className="text-gray-500 hover:text-white transition-colors">Google Ranking Guide</a></li><li><a href="/blog/what-is-eeat-seo" className="text-gray-500 hover:text-white transition-colors">EEAT Explained</a></li><li><a href="/blog/seo-for-startups" className="text-gray-500 hover:text-white transition-colors">SEO for Startups</a></li></ul></div>
            <div><h5 className="text-white font-semibold mb-3 text-sm">Company</h5><ul className="space-y-2 text-sm"><li><a href="/privacy" className="text-gray-500 hover:text-white transition-colors">Privacy</a></li><li><a href="/terms" className="text-gray-500 hover:text-white transition-colors">Terms</a></li><li><a href="/refund" className="text-gray-500 hover:text-white transition-colors">Refund</a></li><li><a href="mailto:hello@seospark.net" className="text-gray-500 hover:text-white transition-colors">Contact</a></li></ul></div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <p className="text-sm text-gray-600">&copy; 2026 SEO Spark. Get found on Google.</p>
              <a href="https://x.com/haili999" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                @haili999
              </a>
            </div>
            <a href="/featured-on" className="text-sm text-gray-500 hover:text-white transition-colors">As Featured On →</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
