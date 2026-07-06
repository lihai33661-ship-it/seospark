"use client";

import { useState } from "react";
import { Sparkles, Clock, CheckCircle, Copy, Zap, ArrowRight, Target } from "lucide-react";

export default function ProposalPage() {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [clientName, setClientName] = useState("");
  const [skills, setSkills] = useState("");
  const [result, setResult] = useState<{ subjectLine: string; content: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!jobTitle.trim() || !jobDescription.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/p/proposal/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: jobTitle,
          description: jobDescription,
          client: clientName,
          skills,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    if (!result) return;
    const fullText = `Subject: ${result.subjectLine}\n\n${result.content}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="min-h-screen">
      {/* Top banner — not SEO Spark, but from the makers of */}
      <div className="bg-gray-50 border-b border-gray-100 text-center py-2 text-xs text-gray-400">
        A free tool from the makers of <a href="/" className="text-blue-600 hover:underline">SEO Spark</a>
      </div>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-8 text-center">
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          <Target size={16} />
          Free proposal generator
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          Get the client.
          <br />
          <span className="text-green-600">We write the pitch.</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto mb-4">
          Upwork freelancers spend <strong>20+ minutes per proposal.</strong> Top earners
          send 10+ proposals a day. That's <strong>3+ hours just writing pitches.</strong>
        </p>
        <p className="text-sm text-gray-400 max-w-xl mx-auto mb-8">
          Paste the job description. Get a personalized, human-sounding proposal in 30
          seconds. Use those 3 hours to actually do the work you're paid for.
        </p>
      </section>

      {/* Form + Result */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 pb-16">
        <form onSubmit={handleGenerate} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder='e.g. "Build a Shopify store for my coffee brand"'
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Description <span className="text-red-400">*</span>
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={6}
                placeholder="Paste the full job posting here. The more detail, the better your proposal."
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-y"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client Name <span className="text-gray-400 text-xs">(optional)</span>
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Sarah"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Skills <span className="text-gray-400 text-xs">(optional)</span>
                </label>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="e.g. React, Shopify, 5 years"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading || !jobTitle.trim() || !jobDescription.trim()}
            className="w-full mt-5 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>Generating<span className="animate-pulse">...</span></>
            ) : (
              <>Generate Proposal <Zap size={18} /></>
            )}
          </button>
          <p className="text-xs text-gray-400 mt-3 text-center">Free beta. No sign-up. Limited daily uses.</p>
        </form>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Your Proposal</h3>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                {copied ? <CheckCircle size={16} className="text-green-500" /> : <Copy size={16} />}
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

      {/* Why it works */}
      <section className="border-t border-gray-100 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-center mb-10">Why freelancers win with this</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Clock size={24} />, t: "30 seconds, not 20 minutes", d: "Paste the job post. Hit generate. Edit to add your voice. Send. The time you save on one proposal is the time you spend on another application — or another paid hour." },
              { icon: <Target size={24} />, t: "Every proposal reads custom", d: "AI references specific details from the job post — client's product, their tech stack, their unique problem. It reads like you actually studied their listing. Because you did." },
              { icon: <Zap size={24} />, t: "Built on winning patterns", d: "Trained on the structure top-earning freelancers use: hook → why-you → approach → smart questions → easy next step. No templates. No 'Dear Sir/Madam'." },
            ].map((f) => (
              <div key={f.t} className="text-center">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mx-auto mb-4">{f.icon}</div>
                <h3 className="font-semibold mb-2 text-sm">{f.t}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* vs Generic Templates */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-bold text-center mb-2">"Can't I just use a template?"</h2>
        <p className="text-center text-gray-500 mb-8">Templates sound like templates. Clients can tell in 3 seconds.</p>
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-2 gap-0">
            <div className="p-6 border-r border-gray-100">
              <p className="text-sm font-semibold text-gray-400 mb-3">GENERIC TEMPLATE</p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span> "Dear Sir/Madam, I am writing to express my interest..."</li>
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span> Same proposal for every job. Zero personalization.</li>
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span> Lists your skills. Doesn't connect them to their problem.</li>
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span> Client reads 2 lines, closes tab.</li>
              </ul>
            </div>
            <div className="p-6 bg-green-50/50">
              <p className="text-sm font-semibold text-green-600 mb-3">PROPOSAL GENERATOR</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Opens with a detail from THEIR job post. Instant trust.</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Connects your skills to their specific problem.</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Asks 1-2 smart questions that start a conversation.</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> <strong>Client thinks: "This person actually read my post."</strong></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-50 py-12 text-center">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold mb-3">Free during beta. No sign-up.</h2>
          <p className="text-gray-600 mb-6">
            We're testing this with real freelancers. Use it free. Tell us what sucks. Help us make it worth paying for.
          </p>
          <p className="text-sm text-gray-400">
            Questions? Feedback?{" "}
            <a href="mailto:seosparknet@gmail.com" className="text-green-600 hover:underline">seosparknet@gmail.com</a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-400 border-t border-gray-100">
        <p>Part of the SEO Spark family. Built for people who'd rather work than write pitches.</p>
        <p className="mt-1">
          <a href="/" className="hover:text-gray-600 underline underline-offset-2">SEO Spark</a>
          <span className="mx-2">·</span>
          <a href="/p/faq" className="hover:text-gray-600 underline underline-offset-2">FAQ Builder</a>
        </p>
      </footer>
    </main>
  );
}
