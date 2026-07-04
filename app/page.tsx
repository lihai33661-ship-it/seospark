"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  Sparkles,
  BarChart3,
  Zap,
  Globe,
} from "lucide-react";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [topic, setTopic] = useState("");

  const handleTry = () => {
    const params = new URLSearchParams({ keyword, topic });
    window.location.href = `/dashboard?${params.toString()}`;
  };

  return (
    <main>
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          <Sparkles size={16} />
          AI-powered SEO content
        </div>
        <h1 className="text-5xl font-bold tracking-tight mb-6">
          Blog posts that rank on Google
          <br />
          <span className="text-blue-600">in 60 seconds</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
          Stop staring at blank pages. Enter a keyword, get a complete
          SEO-optimized blog post — structured, readable, and ready to publish.
        </p>

        {/* Quick Try */}
        <div className="max-w-xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3 mb-3">
            <input
              type="text"
              placeholder="Target keyword, e.g. 'project management tools'"
              className="input-field flex-1"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <input
              type="text"
              placeholder="Topic (optional)"
              className="input-field flex-1"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <button
            onClick={handleTry}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            Generate Free Article
            <ArrowRight size={18} />
          </button>
          <p className="text-sm text-gray-400 mt-3">
            No signup required. First 3 articles free.
          </p>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="border-y border-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-8 text-center">
          {[
            { number: "98%", label: "SEO score above 42/60" },
            { number: "60s", label: "Average generation time" },
            { number: "3", label: "Free articles, no credit card" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold text-blue-600">
                {stat.number}
              </div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          What you get
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              icon: <Sparkles size={24} />,
              title: "SEO-optimized",
              desc: "Keywords, meta tags, structure — all baked in. Score each article before publishing.",
            },
            {
              icon: <BarChart3 size={24} />,
              title: "Readable & human",
              desc: "Not AI slop. 8th-grade reading level, short paragraphs, actionable advice.",
            },
            {
              icon: <Zap size={24} />,
              title: "60 seconds flat",
              desc: "Enter a keyword. Get a draft. Edit. Publish. Same day.",
            },
            {
              icon: <Globe size={24} />,
              title: "Built for Google",
              desc: "Follows latest EEAT guidelines. Structured data ready. Mobile-friendly.",
            },
          ].map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">
            Simple pricing
          </h2>
          <p className="text-center text-gray-500 mb-12">
            Start free. Upgrade when you need more.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              {
                name: "Starter",
                price: "Free",
                desc: "3 articles / month",
                features: [
                  "Blog post generator",
                  "SEO scoring",
                  "Basic templates",
                  "Email support",
                ],
                cta: "Start free",
                highlight: false,
              },
              {
                name: "Pro",
                price: "$29",
                desc: "30 articles / month",
                features: [
                  "Everything in Starter",
                  "Batch generation (5x)",
                  "Product descriptions",
                  "Landing page copy",
                  "Priority support",
                ],
                cta: "Get Pro",
                highlight: true,
              },
              {
                name: "Business",
                price: "$99",
                desc: "Unlimited articles",
                features: [
                  "Everything in Pro",
                  "Unlimited generation",
                  "Custom brand voice",
                  "Team members (5)",
                  "API access",
                ],
                cta: "Get Business",
                highlight: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`bg-white rounded-2xl p-6 border-2 ${
                  plan.highlight
                    ? "border-blue-600 shadow-lg"
                    : "border-gray-200"
                }`}
              >
                {plan.highlight && (
                  <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full mb-3">
                    Most popular
                  </span>
                )}
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="mt-3 mb-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.price !== "Free" && (
                    <span className="text-gray-500">/month</span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mb-4">{plan.desc}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle
                        size={16}
                        className="text-green-500 mt-0.5 shrink-0"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-2.5 rounded-lg font-semibold text-sm ${
                    plan.highlight
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  } transition-colors`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-gray-400">
        SEO Spark — Built for small businesses that want to be found on Google.
      </footer>
    </main>
  );
}
