"use client";

import { useState } from "react";
import { Sparkles, Copy, Check, Send, RefreshCw, ArrowRight, FileText, MessageCircle, BookOpen, Video } from "lucide-react";

const PLATFORMS = [
  { id: "小红书", icon: <MessageCircle size={16} />, desc: "短句分段 · emoji点缀 · 闺蜜聊天感", color: "rose" },
  { id: "公众号", icon: <BookOpen size={16} />, desc: "深度干货 · 观点输出 · 引导互动", color: "green" },
  { id: "知乎", icon: <FileText size={16} />, desc: "专业理性 · 数据佐证 · 逻辑严密", color: "blue" },
  { id: "抖音脚本", icon: <Video size={16} />, desc: "口语化 · 快节奏 · 前3秒钩子", color: "amber" },
];

export default function ZhPage() {
  const [content, setContent] = useState("");
  const [platform, setPlatform] = useState("小红书");
  const [result, setResult] = useState<{ title: string; body: string; tags: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); if (!content.trim()) return;
    setLoading(true); setError(""); setResult(null);
    try {
      const res = await fetch("/zh/rewrite/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content, platform }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data);
    } catch (err: any) { setError(err.message); }
    finally { setLoading(false); }
  }

  function handleCopy() {
    if (!result) return;
    navigator.clipboard.writeText(`${result.title}\n\n${result.body}\n\n${result.tags ? "标签：" + result.tags : ""}`);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  }

  const colorMap: Record<string, string> = {
    rose: "border-rose-300 bg-rose-50 text-rose-700",
    green: "border-green-300 bg-green-50 text-green-700",
    blue: "border-blue-300 bg-blue-50 text-blue-700",
    amber: "border-amber-300 bg-amber-50 text-amber-700",
  };
  const btnColorMap: Record<string, string> = {
    rose: "bg-rose-500 hover:bg-rose-600",
    green: "bg-green-500 hover:bg-green-600",
    blue: "bg-blue-500 hover:bg-blue-600",
    amber: "bg-amber-500 hover:bg-amber-600",
  };

  const activeColor = PLATFORMS.find((p) => p.id === platform)?.color || "rose";

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-10 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 px-3 py-1 rounded-full mb-6">
          <Sparkles size={12} /> 中文内容改写工具
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">一篇文章，<br /><span className="bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">适配所有平台。</span></h1>
        <p className="text-gray-500 max-w-lg mx-auto mb-8 text-sm sm:text-base leading-relaxed">
          粘贴你的内容 → 选择目标平台 → AI 自动改写为平台专属风格。
          <br />一篇公众号文章 → 变成 4 条小红书 + 1 篇知乎回答 + 1 个抖音脚本。
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm text-left">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">原始内容</label>
              <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={6}
                placeholder="粘贴你要改写的文章、帖子、或任何文字内容..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 resize-y" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">改写为目标平台</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PLATFORMS.map((p) => (
                  <button key={p.id} type="button" onClick={() => setPlatform(p.id)}
                    className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 text-xs transition-all ${platform === p.id ? colorMap[p.color] + " shadow-sm" : "border-gray-100 text-gray-500 hover:border-gray-200"}`}>
                    {p.icon}<span className="font-medium">{p.id}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading || !content.trim()}
            className={`w-full mt-5 text-white px-6 py-3.5 rounded-xl font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2 ${btnColorMap[activeColor]}`}>
            {loading ? <>改写中<RefreshCw size={16} className="animate-spin" /></> : <>开始改写 <ArrowRight size={16} /></>}
          </button>
          <p className="text-xs text-gray-400 mt-3 text-center">免费 · 5次/天 · 无需注册</p>
          {error && <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600">{error}</div>}
        </form>
      </section>

      {/* Result */}
      {result && (
        <section className="max-w-2xl mx-auto px-4 sm:px-6 pb-16">
          <div className={`bg-white border-2 rounded-2xl p-5 sm:p-6 shadow-lg ${colorMap[activeColor]}`}>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <h3 className="font-bold text-gray-900">改写结果 · {platform}版本</h3>
              <button onClick={handleCopy}
                className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors">
                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}{copied ? "已复制" : "一键复制"}
              </button>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-3">
              <p className="text-xs text-gray-400 mb-1">标题</p>
              <p className="text-base font-bold text-gray-900">{result.title}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-3">
              <p className="text-xs text-gray-400 mb-1">正文</p>
              <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{result.body}</div>
            </div>
            {result.tags && (
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-1">推荐标签</p>
                <p className="text-sm text-gray-600">{result.tags}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* How it works */}
      {!result && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
          <div className="text-center mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-2">一个内容，四种表达</h2>
            <p className="text-gray-500 text-sm">同一段核心信息，不同平台需要完全不同的表达方式</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {PLATFORMS.map((p) => (
              <div key={p.id} className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{p.icon}</span>
                  <h3 className="font-semibold text-sm">{p.id}改写</h3>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <footer className="text-center py-8 text-xs text-gray-400 border-t border-gray-100">
        <p>SEO Spark 中文工具 · 内容改写器</p>
        <p className="mt-1"><a href="/" className="hover:text-gray-600 underline underline-offset-2">返回英文站</a></p>
      </footer>
    </main>
  );
}
