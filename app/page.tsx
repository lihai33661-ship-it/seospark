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
          Get found on Google.
          <br />
          <span className="text-blue-600">We do the writing.</span>
        </h1>
        <p className="text-base sm:text-xl text-gray-500 max-w-2xl mx-auto mb-8 sm:mb-10">
          Anyone can write a blog post. ChatGPT does it for free. But a post nobody finds is a post that doesn&apos;t pay.
          <br className="hidden sm:block" />
          SEO Spark writes articles built to rank — keywords, structure, meta tags, all baked in.
          <br className="hidden sm:block" />
          <strong>Same writing. Actually gets seen.</strong>
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
        <h2 className="text-lg font-semibold text-gray-500 mb-6">From keyword → ranking in {`<`} 60 seconds</h2>
        <div className="grid grid-cols-3 gap-6">
          {[
            { step: "1", t: "Enter keyword", d: "What are your customers Googling? That's your keyword." },
            { step: "2", t: "Generate", d: "One click. We write, structure, and optimize for ranking." },
            { step: "3", t: "Publish & get found", d: "Paste into your site. Your customers start finding you." },
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
            { n: "60s", l: "From idea to publish-ready" },
            { n: "SEO Score", l: "Know it'll rank before you post" },
            { n: "3 Free", l: "Try it. See results. Then decide." },
          ].map((s) => (
            <div key={s.l}><div className="text-2xl font-bold text-blue-600">{s.n}</div><div className="text-sm text-gray-500 mt-1">{s.l}</div></div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">Why businesses use SEO Spark</h2>
        <p className="text-center text-gray-500 mb-8 sm:mb-12 text-sm">Every feature is built around one question: will this help you rank?</p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Globe size={24} />, t: "Built to rank", d: "Keywords, meta tags, headings, internal links, EEAT signals — everything Google wants, baked into every article. No plugins. No guesswork." },
            { icon: <BarChart3 size={24} />, t: "See your score before publish", d: "Real-time SEO score across 8 dimensions. Know exactly how optimized your post is before it goes live." },
            { icon: <Zap size={24} />, t: "One keyword → one post", d: "Type the keyword your customers are searching. We handle the rest — research, structure, writing, optimization. 60 seconds." },
            { icon: <Sparkles size={24} />, t: "Actually readable", d: "Ranking gets clicks. Good writing keeps readers. We do both — SEO structure that doesn't read like a robot wrote it." },
            { icon: <CheckCircle size={24} />, t: "No risk", d: "3 free articles. No credit card. See your posts rank before you pay a cent." },
            { icon: <ArrowRight size={24} />, t: "Publish anywhere", d: "WordPress, Shopify, Medium, Ghost — one click copy, paste, live. Works wherever you do." },
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
        <p className="text-center text-gray-500 mb-8">ChatGPT writes. SEO Spark writes <strong>to get found</strong>. Here's the difference.</p>
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-2 gap-0">
            <div className="p-6 border-r border-gray-100">
              <p className="text-sm font-semibold text-gray-400 mb-3">FREE AI (ChatGPT, Claude)</p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span> Writes a post. Doesn't know SEO.</li>
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span> No keyword strategy. You guess what to write about.</li>
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span> Missing meta tags, headings, internal links.</li>
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span> Zero feedback — is this post any good? No idea.</li>
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span> <strong>You publish. Nobody comes. Silence.</strong></li>
              </ul>
            </div>
            <div className="p-6 bg-blue-50/50">
              <p className="text-sm font-semibold text-blue-600 mb-3">SEO SPARK</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Every post built around a keyword people actually search.</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Meta tags, H1-H6 structure, readability — auto-optimized.</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Real-time SEO score. Know it's good before you hit publish.</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Built for Google's EEAT guidelines. The stuff that moves the needle.</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> <strong>Your customers search. They find you. Not your competitor.</strong></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-gray-50 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 sm:mb-4">Launch week special</h2>
          <p className="text-center text-gray-500 mb-4">Prices go up after July 14. Cancel anytime.</p>
          <div className="flex items-center justify-center gap-4 mb-12 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
              Cancel anytime
            </span>
            <span className="flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
              Secure via PayPal
            </span>
            <span className="flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
              3 free articles, no card
            </span>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { n: "Starter", p: "Free", oldP: "", d: "3 articles", f: ["Blog generator", "SEO scoring", "Basic templates"], hl: false, link: "/dashboard", badge: "" },
              { n: "Pro Launch", p: "$9", oldP: "$19", d: "30 articles / month", f: ["Everything in Starter", "30 articles per month", "Priority generation speed", "Email support", "Early access to new features"], hl: true, link: "https://paypal.me/seospark151/9", badge: "First month" },
              { n: "Founding Member", p: "$79", oldP: "$199", d: "Lifetime · 100 articles/mo", f: ["Everything in Pro", "100 articles per month", "Lifetime access, no recurring", "Custom brand voice (coming)", "Bulk generation (coming)", "API access (coming)"], hl: false, link: "https://paypal.me/seospark151/79", badge: "Best value" },
            ].map((plan) => (
              <div key={plan.n} className={`bg-white rounded-2xl p-6 border-2 ${plan.hl ? "border-blue-600 shadow-lg" : "border-gray-200"}`}>
                {plan.badge && (
                  <span className={`inline-block text-xs px-3 py-1 rounded-full mb-3 ${plan.hl ? "bg-blue-600 text-white" : "bg-green-500 text-white"}`}>
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
                    <li key={feat} className="flex items-start gap-2 text-sm"><CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />{feat}</li>
                  ))}
                </ul>
                <a href={plan.link} className={`block text-center w-full py-2.5 rounded-lg font-semibold text-sm transition-colors ${plan.hl ? "bg-blue-600 text-white hover:bg-blue-700" : plan.badge === "Best value" ? "bg-green-500 text-white hover:bg-green-600" : "bg-gray-100 text-gray-900 hover:bg-gray-200"}`}>
                  {plan.p === "Free" ? "Start free" : plan.n === "Founding Member" ? "Get lifetime access" : `Get Pro — ${plan.p}/mo`}
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
          { q: "Will this actually help me rank on Google?", a: "Google rewards well-structured, keyword-optimized content that answers what people are searching for. That's exactly what SEO Spark generates — every article is built around your target keyword with proper H1-H6 structure, meta tags, internal linking, and EEAT signals. We give you an SEO score before you publish so you know where you stand. The ranking is up to Google — but the foundation is up to you. We make sure yours is solid." },
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
        <p>&copy; 2026 SEO Spark. You write the business. We make sure Google finds it.</p>
        <p className="space-x-0">
          <a href="/p/proposal" className="hover:text-gray-600 underline underline-offset-2">Proposal Generator</a>
          <span className="mx-2">·</span>
          <a href="/p/faq" className="hover:text-gray-600 underline underline-offset-2">FAQ Builder</a>
          <span className="mx-2">·</span>
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
