import { Mail, FileText, Target, Search, ShoppingBag, AtSign } from "lucide-react";

const PRODUCTS = [
  {
    icon: <FileText size={20} />,
    name: "SEO Spark — Blog Generator",
    desc: "AI blog posts that rank on Google.",
    how: "Enter your target keyword → we generate a complete SEO-optimized article with meta tags, heading structure, and keyword placement built in.",
    tips: ["Be specific with your keyword (e.g. 'email marketing for SaaS' not just 'marketing')", "Add a topic for more focused results", "Check the SEO score before publishing — aim for 80+"],
    limit: "3 free articles (lifetime).",
  },
  {
    icon: <Target size={20} />,
    name: "Proposal Generator",
    desc: "Win more clients on Upwork, Fiverr, and freelancing platforms.",
    how: "Paste the full job description → we generate a personalized proposal with subject line, body, and call-to-action.",
    tips: ["Paste the ENTIRE job post — the more detail, the better the hook", "Add the client's name for a personalized greeting", "Mention your relevant skills to connect your experience to their problem"],
    limit: "5 free proposals per day.",
  },
  {
    icon: <Search size={20} />,
    name: "FAQ Builder",
    desc: "Generate SEO-optimized FAQ pages with Google-friendly schema markup.",
    how: "Enter your website URL → we scan your content and generate a complete FAQ section with JSON-LD schema.",
    tips: ["Use a live URL (not a staging/localhost)", "Add your target audience for more relevant questions", "Copy the schema markup and paste it into your page's <head> section"],
    limit: "2 free generations per day.",
  },
  {
    icon: <Mail size={20} />,
    name: "Email Sequence Generator",
    desc: "5-email welcome sequences that convert subscribers into customers.",
    how: "Describe your product or service → we generate a 5-email drip sequence with subject lines, body copy, and CTAs.",
    tips: ["Describe your product clearly — the AI uses this to personalize each email", "Add your brand voice for consistent tone (e.g. 'casual and friendly')", "Use the 'Tips to customize' section to adapt the emails for your audience"],
    limit: "2 free generations per day.",
  },
  {
    icon: <ShoppingBag size={20} />,
    name: "Product Description Generator",
    desc: "SEO-optimized product listings for Amazon, Shopify, Etsy, and more.",
    how: "Enter your product name and key features → we generate a platform-specific description with SEO title and meta description.",
    tips: ["Select the right platform — each marketplace has different SEO rules", "List key features as bullet points for better AI understanding", "Include your target customer for more persuasive copy"],
    limit: "3 free generations per day.",
  },
  {
    icon: <AtSign size={20} />,
    name: "Cold Email Generator",
    desc: "Personalized B2B cold emails that actually get replies.",
    how: "Enter the prospect's company and your product → we generate a personalized outreach email that references their business.",
    tips: ["Add what you know about them (funding news, recent launch, etc.) for a stronger hook", "Include their role for better targeting", "Keep it under 120 words — short emails get more replies"],
    limit: "5 free generations per day.",
  },
];

const FAQS = [
  { q: "Are the free tools really free?", a: "Yes. Each tool has a free daily limit (shown on the tool's page). No credit card required. No trial period. Use them as long as you want within the daily limits." },
  { q: "Do I own the content I generate?", a: "Absolutely. Everything you generate — blog posts, proposals, emails, product descriptions, FAQs — is 100% yours. No attribution required. No rights reserved." },
  { q: "Is the content SEO-optimized?", a: "All content generators include built-in SEO optimization: keyword placement, heading structure, meta tags, and readability scoring. The FAQ Builder also generates JSON-LD schema markup for Google rich results." },
  { q: "What AI model do you use?", a: "All tools run on Llama 4 Maverick via OpenRouter — chosen for the best balance of quality and cost. We continuously evaluate newer models as they become available." },
  { q: "Can I use this for client work?", a: "Yes. Many freelancers and agencies use our tools to draft content for clients. You own the output and can resell it, edit it, or publish it as-is." },
  { q: "Why are there daily limits?", a: "AI generation costs money. We provide generous free tiers so you can try everything and find value. Paid plans (coming soon) will offer higher limits and advanced features." },
  { q: "How do I report a bug or suggest a feature?", a: "Email us at hello@seospark.net. We read every message and respond within 24 hours." },
];

export default function HelpPage() {
  return (
    <main className="bg-white">
      {/* Header */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">Help Center</h1>
        <p className="text-gray-500 max-w-lg mx-auto text-sm sm:text-base">
          How to use all six free tools from SEO Spark. Pick a product below or browse the FAQs.
        </p>
      </section>

      {/* Products */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <div className="space-y-8">
          {PRODUCTS.map((p) => (
            <div key={p.name} className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">{p.icon}</div>
                <div>
                  <h2 className="font-bold text-gray-900">{p.name}</h2>
                  <p className="text-sm text-gray-500">{p.desc}</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">How it works</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{p.how}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Tips</p>
                  <ul className="space-y-1 text-xs text-gray-600">
                    {p.tips.map((t, i) => <li key={i}>· {t}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Free limit</p>
                  <p className="text-xs text-gray-600">{p.limit}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <details key={faq.q} className="bg-white rounded-xl border border-gray-200 group">
                <summary className="px-5 py-4 cursor-pointer font-medium text-gray-900 hover:text-blue-600 transition-colors text-sm sm:text-base">
                  {faq.q}
                </summary>
                <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 text-center">
        <div className="max-w-md mx-auto px-4 sm:px-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h2>
          <p className="text-sm text-gray-500 mb-6">
            We read every email. Typical response time: within 24 hours.
          </p>
          <a href="mailto:hello@seospark.net"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
            <Mail size={16} /> hello@seospark.net
          </a>
        </div>
      </section>

      <footer className="text-center py-6 text-xs text-gray-400 border-t border-gray-100">
        <p>SEO Spark Help Center</p>
        <p className="mt-1">
          <a href="/" className="hover:text-gray-600 underline underline-offset-2">Back to SEO Spark</a>
        </p>
      </footer>
    </main>
  );
}
