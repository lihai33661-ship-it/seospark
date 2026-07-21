"use client";

import { useState } from "react";
import { CheckCircle, Copy, Youtube, Tag, FileText, Hash, Sparkles } from "lucide-react";
import { checkClientLimit, recordClientUsage } from "@/lib/client-limit";

const YT_LIMIT = 2;

export default function YoutubePage() {
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [length, setLength] = useState("");
  const [result, setResult] = useState<{ fileName: string; titles: string[]; description: string; tags: string; hashtags: string[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!topic.trim()) return;
    const { allowed } = checkClientLimit("youtube", YT_LIMIT);
    if (!allowed) { setError("You've used all " + YT_LIMIT + " free generations today. Come back tomorrow."); return; }
    setLoading(true); setError(""); setResult(null);
    try {
      const res = await fetch("/p/youtube/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ topic, audience, length }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      recordClientUsage("youtube");
      setResult(data);
    } catch (err: any) { setError(err.message); }
    finally { setLoading(false); }
  }

  function copyToClipboard(text: string, label: string) {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  }

  return (
    <main className="bg-white">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-24 pb-10 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-rose-700 bg-rose-50 px-3 py-1 rounded-full mb-6"><Youtube size={12} /> YouTube SEO optimizer</div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-3 leading-tight">YouTube SEO that <span className="text-rose-600">actually works.</span></h1>
        <p className="text-gray-500 max-w-lg mx-auto mb-8 text-sm sm:text-base">One video topic in. Titles, tags, description, file name out. <strong className="text-gray-900">Spend time making videos, not researching keywords.</strong></p>

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white border-2 border-rose-100 rounded-2xl p-5 sm:p-6 shadow-sm text-left">
          <div className="space-y-3">
            <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Video topic * (e.g. A rainy day in a small Japanese town)" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400" required />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input type="text" value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="Target audience" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-rose-400 focus:outline-none" />
              <input type="text" value={length} onChange={(e) => setLength(e.target.value)} placeholder="Video length (min)" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-rose-400 focus:outline-none" />
            </div>
          </div>
          <button type="submit" disabled={loading||!topic.trim()} className="w-full mt-4 bg-rose-600 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-rose-500 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base">
            {loading ? "Optimizing..." : <>Generate YouTube SEO <Sparkles size={16} /></>}
          </button>
          <p className="text-xs text-gray-400 mt-3 text-center">2 free / day · No sign-up</p>
          {error && <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600">{error}</div>}
        </form>
        {result && (
          <div className="max-w-lg mx-auto mt-10 text-left space-y-6">
            {/* File Name */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700"><FileText size={16} /> File Name</div>
                <button onClick={() => copyToClipboard(result.fileName, "file")} className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1">
                  {copied === "file" ? <CheckCircle size={14} className="text-green-500" /> : <Copy size={14} />} {copied === "file" ? "Copied" : "Copy"}
                </button>
              </div>
              <code className="text-sm bg-gray-50 px-3 py-2 rounded-lg block text-gray-800">{result.fileName}</code>
            </div>

            {/* Titles */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700"><Youtube size={16} /> Title Options</div>
                <button onClick={() => copyToClipboard(result.titles.join("\n"), "titles")} className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1">
                  {copied === "titles" ? <CheckCircle size={14} className="text-green-500" /> : <Copy size={14} />} {copied === "titles" ? "Copied" : "Copy all"}
                </button>
              </div>
              <div className="space-y-1.5">
                {result.titles.map((t, i) => (
                  <div key={i} className="text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2">{i+1}. {t}</div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700"><FileText size={16} /> Description</div>
                <button onClick={() => copyToClipboard(result.description, "desc")} className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1">
                  {copied === "desc" ? <CheckCircle size={14} className="text-green-500" /> : <Copy size={14} />} {copied === "desc" ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">{result.description}</p>
            </div>

            {/* Tags */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700"><Tag size={16} /> Tags</div>
                <button onClick={() => copyToClipboard(result.tags, "tags")} className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1">
                  {copied === "tags" ? <CheckCircle size={14} className="text-green-500" /> : <Copy size={14} />} {copied === "tags" ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">{result.tags}</p>
            </div>

            {/* Hashtags */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700"><Hash size={16} /> Hashtags</div>
                <button onClick={() => copyToClipboard(result.hashtags.join(" "), "hashtags")} className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1">
                  {copied === "hashtags" ? <CheckCircle size={14} className="text-green-500" /> : <Copy size={14} />} {copied === "hashtags" ? "Copied" : "Copy"}
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {result.hashtags.map((h, i) => (
                  <span key={i} className="text-xs text-rose-600 bg-rose-50 rounded-full px-3 py-1">{h}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
