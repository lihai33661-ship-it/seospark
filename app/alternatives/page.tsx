import Link from "next/link";

export const metadata = {
  title: "SEO Spark Alternatives — How It Compares to ChatGPT, Jasper, SurferSEO, Koala & More | SEO Spark",
  description: "Looking for the best AI blog writer? Compare SEO Spark with ChatGPT, Jasper AI, SurferSEO, Koala AI, and more. See which AI writing tool fits your small business needs and budget.",
};

const ALTERNATIVES = [
  { href: "/vs-chatgpt", name: "SEO Spark vs ChatGPT", desc: "General-purpose AI vs SEO-focused AI blog writer. Which one gets you found on Google?" },
  { href: "/vs-jasper", name: "SEO Spark vs Jasper AI", desc: "Enterprise AI writer at $49/mo vs free AI blog writer for small business." },
  { href: "/vs-surferseo", name: "SEO Spark vs SurferSEO", desc: "Content analysis tool at $89/mo vs content creation + analysis combined, free." },
  { href: "/vs-koala", name: "SEO Spark vs Koala AI", desc: "Long-form SEO writer vs 60-second blog generator. Which fits your workflow?" },
  { href: "/vs-writesonic", name: "SEO Spark vs Writesonic", desc: "All-in-one marketing platform vs specialized SEO blog writer. When to use each." },
  { href: "/vs-copyai", name: "SEO Spark vs Copy.ai", desc: "AI copywriter vs AI blog writer with SEO. Different tools for different content needs." },
];

export default function Alternatives() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12 sm:py-16">
      <h1 className="text-2xl sm:text-3xl font-bold mb-3">Best SEO Spark Alternatives Compared</h1>
      <p className="text-gray-500 mb-8 text-lg">Find the right AI blog writer for your business. Honest comparisons — no affiliate bias.</p>
      <div className="space-y-4">
        {ALTERNATIVES.map((alt) => (
          <Link key={alt.href} href={alt.href} className="block border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition-all">
            <h2 className="font-semibold text-blue-600 mb-1">{alt.name}</h2>
            <p className="text-sm text-gray-500">{alt.desc}</p>
          </Link>
        ))}
      </div>
      <div className="mt-10 p-5 bg-blue-50 rounded-xl border border-blue-100">
        <p className="font-semibold mb-2">Don't want to compare? Just start writing.</p>
        <p className="text-sm text-gray-600 mb-3">3 free articles. No credit card. See your SEO score before publishing.</p>
        <Link href="/dashboard" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700">Try SEO Spark Free →</Link>
      </div>
    </main>
  );
}
