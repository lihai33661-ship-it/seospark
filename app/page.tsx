import { Sparkles, BarChart3, Zap, Globe, CheckCircle, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 sm:pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          <Sparkles size={16} />
          AI-powered SEO content
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
          SEO blog posts
          <br />
          <span className="text-blue-600">you&apos;re not afraid to publish</span>
        </h1>
        <p className="text-base sm:text-xl text-gray-500 max-w-2xl mx-auto mb-8 sm:mb-10">
          Free AI writes like a machine. SEO Spark writes like a marketer — real company names,
          real stats, built-in SEO score. One keyword in, one copy-click out. Publish with confidence.
        </p>

        {/* Demo GIF */}
        <div className="max-w-2xl mx-auto mb-10">
          <img
            src="/demo.gif"
            alt="SEO Spark demo - generate a blog post in 60 seconds"
            className="w-full rounded-xl shadow-lg border border-gray-200"
          />
        </div>

        <div className="max-w-xl mx-auto mb-4">
          <a href="/dashboard?keyword=email+marketing+tips" className="text-sm text-blue-600 hover:text-blue-800 underline">
            See a sample article →
          </a>
          <span className="text-sm text-gray-400 ml-1">or enter your own keyword below</span>
        </div>

        <form action="/dashboard" method="GET" className="max-w-xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3 mb-3">
            <input
              type="text" name="keyword"
              placeholder="Target keyword, e.g. project management"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text" name="topic"
              placeholder="Topic (optional)"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
            Generate Free Article <ArrowRight size={18} />
          </button>
          <p className="text-sm text-gray-400 mt-3">3 free articles. No credit card.</p>
        </form>
      </section>

      {/* How it works — 3 steps */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-12 text-center">
        <div className="grid grid-cols-3 gap-6">
          {[
            { step: "1", t: "Enter keyword", d: "The topic your customers are searching for" },
            { step: "2", t: "Generate", d: "60 seconds, you get a scored, publishable draft" },
            { step: "3", t: "Copy & publish", d: "Paste into WordPress, Shopify, Medium — done" },
          ].map((s) => (
            <div key={s.step}>
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-sm">{s.step}</div>
              <h3 className="font-semibold text-sm mb-1">{s.t}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section className="border-y border-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-4 sm:gap-8 text-center">
          {[
            { n: "60s", l: "Average generation" },
            { n: "SEO Score", l: "Built-in quality check" },
            { n: "Free", l: "First 3 articles" },
          ].map((s) => (
            <div key={s.l}><div className="text-2xl font-bold text-blue-600">{s.n}</div><div className="text-sm text-gray-500 mt-1">{s.l}</div></div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Why businesses use SEO Spark</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Sparkles size={24} />, t: "SEO built-in", d: "Keywords, meta tags, headings, readability — all optimized automatically. Each article gets an SEO score." },
            { icon: <BarChart3 size={24} />, t: "Reads like a human", d: "Not AI slop. Real stats, real examples, real company names. Your readers won't know AI touched it." },
            { icon: <Zap size={24} />, t: "Publish today", d: "Email marketing, project management, SaaS growth — whatever your niche, get a draft in under a minute." },
            { icon: <Globe size={24} />, t: "Google-ready", d: "EEAT guidelines, mobile-friendly structure, natural keyword placement. Built for 2026 search." },
            { icon: <CheckCircle size={24} />, t: "No subscription trap", d: "3 free articles. No credit card. Upgrade only if it works for you. Cancel anytime." },
            { icon: <ArrowRight size={24} />, t: "Copy & publish", d: "One-click copy to clipboard. Paste into WordPress, Medium, Ghost — wherever you publish." },
          ].map((f) => (
            <div key={f.t} className="text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mx-auto mb-4">{f.icon}</div>
              <h3 className="font-semibold mb-2">{f.t}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* vs ChatGPT */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">"Can't I just use ChatGPT for free?"</h2>
        <p className="text-center text-gray-500 mb-8">Yes. But free AI writes like AI. Here's the difference.</p>
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-2 gap-0">
            <div className="p-6 border-r border-gray-100">
              <p className="text-sm font-semibold text-gray-400 mb-3">FREE AI (ChatGPT, Claude)</p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span> Sounds like AI wrote it</li>
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span> No SEO scoring or guidance</li>
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span> Write your own prompts every time</li>
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span> Tweak, edit, reformat manually</li>
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span> No meta tags, no structure</li>
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span> Takes 20+ minutes to get publishable</li>
              </ul>
            </div>
            <div className="p-6 bg-blue-50/50">
              <p className="text-sm font-semibold text-blue-600 mb-3">SEO SPARK</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Reads like a human wrote it</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Built-in 8-dimension SEO score</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> One keyword, one click</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Copy, paste, publish — done</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Auto-generated SEO title & description</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Publish-ready in under 60 seconds</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-gray-50 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 sm:mb-4">Simple pricing</h2>
          <p className="text-center text-gray-500 mb-4">Start free. Upgrade when you need more. Cancel anytime.</p>
          <div className="flex items-center justify-center gap-4 mb-12 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
              Cancel anytime
            </span>
            <span className="flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
              Secure payment via PayPal
            </span>
            <span className="flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
              3 free articles, no card
            </span>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { n: "Starter", p: "Free", d: "3 articles", f: ["Blog generator", "SEO scoring", "Basic templates"], hl: false, link: "/dashboard" },
              { n: "Pro", p: "$19", d: "30 articles / month", f: ["Everything in Starter", "30 articles per month", "Priority generation speed", "Email support", "Early access to new features"], hl: true, link: "https://paypal.me/seospark151/19" },
              { n: "Business", p: "$49", d: "100 articles / month", f: ["Everything in Pro", "100 articles per month", "Custom brand voice (coming soon)", "Bulk generation (coming soon)", "API access (coming soon)"], hl: false, link: "https://paypal.me/seospark151/49" },
            ].map((plan) => (
              <div key={plan.n} className={`bg-white rounded-2xl p-6 border-2 ${plan.hl ? "border-blue-600 shadow-lg" : "border-gray-200"}`}>
                {plan.hl && <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full mb-3">Popular</span>}
                <h3 className="text-xl font-bold">{plan.n}</h3>
                <div className="mt-3 mb-1"><span className="text-3xl font-bold">{plan.p}</span>{plan.p !== "Free" && <span className="text-gray-500">/mo</span>}</div>
                <p className="text-sm text-gray-500 mb-4">{plan.d}</p>
                <ul className="space-y-2 mb-6">
                  {plan.f.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm"><CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />{feat}</li>
                  ))}
                </ul>
                <a href={plan.link} className={`block text-center w-full py-2.5 rounded-lg font-semibold text-sm transition-colors ${plan.hl ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-100 text-gray-900 hover:bg-gray-200"}`}>
                  {plan.p === "Free" ? "Start free" : "Get started"}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Frequently asked</h2>
        {[
          { q: "Can Google tell this is AI-written?", a: "Google has stated they don't penalize AI content — they penalize low-quality content. Our articles are structured for readability, include real data points, and pass standard AI detection checks because they read naturally." },
          { q: "What languages do you support?", a: "English is our primary language. We're optimized for Google.com, .co.uk, .com.au, and other English-language search markets." },
          { q: "Can I edit the articles?", a: "Absolutely. The AI gives you a strong first draft. You can edit, add your expertise, and publish. It saves you the blank-page problem, not replaces your voice." },
          { q: "Do I own the content?", a: "Yes. All generated content is yours. No attribution required. No rights reserved by us." },
        ].map((faq) => (
          <div key={faq.q} className="mb-6">
            <h3 className="font-semibold mb-2">{faq.q}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </section>

      <footer className="text-center py-8 text-sm text-gray-400 border-t border-gray-100 space-y-2">
        <p>&copy; 2026 SEO Spark. Built for small businesses that want to be found.</p>
        <p>
          <a href="/privacy" className="hover:text-gray-600 underline underline-offset-2">Privacy</a>
          <span className="mx-2">·</span>
          <a href="/terms" className="hover:text-gray-600 underline underline-offset-2">Terms</a>
          <span className="mx-2">·</span>
          <a href="mailto:seosparknet@gmail.com" className="hover:text-gray-600 underline underline-offset-2">Contact</a>
        </p>
      </footer>
    </main>
  );
}
