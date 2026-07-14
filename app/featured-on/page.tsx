export const metadata = { title: "SEO Spark — As Featured On | Directories, Platforms & Press", description: "SEO Spark has been listed on leading startup directories and launch platforms. See where we've been featured, and embed our badge on your site." };

const FEATURED = [
  { name: "Product Hunt", url: "https://www.producthunt.com/products/seo-spark", date: "July 2026", icon: "🏆" },
  { name: "PostYourStartup", url: "https://postyourstartup.co/startup/seo-spark-1", date: "July 2026", icon: "🚀" },
  { name: "Hacker News", url: "https://news.ycombinator.com", date: "July 2026", icon: "💡" },
];

export default function FeaturedOn() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-4xl mx-auto px-6 py-16 sm:py-20">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">As Featured On</h1>
        <p className="text-gray-400 mb-12 text-lg">Where SEO Spark has been listed and recognized.</p>

        <div className="grid md:grid-cols-3 gap-4 mb-16">
          {FEATURED.map((f) => (
            <a key={f.name} href={f.url} target="_blank" rel="noopener noreferrer" className="bg-white/[0.03] border border-white/5 rounded-xl p-6 hover:bg-white/[0.06] hover:border-white/10 transition-all">
              <span className="text-2xl mb-3 block">{f.icon}</span>
              <h2 className="font-semibold text-white">{f.name}</h2>
              <p className="text-sm text-gray-500 mt-1">{f.date}</p>
            </a>
          ))}
        </div>

        {/* Embed badge section */}
        <div className="border-t border-white/5 pt-12">
          <h2 className="text-2xl font-bold mb-4">Put SEO Spark on your site</h2>
          <p className="text-gray-400 mb-6">Using SEO Spark for your blog? Let readers know and give us a backlink. Copy the badge code below.</p>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 mb-4 inline-block">
            <a href="https://seospark.net" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-blue-400 hover:to-purple-400 transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              Powered by SEO Spark
            </a>
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-2">Copy this HTML and paste it into your blog footer or article:</p>
            <pre className="text-xs text-gray-400 bg-black/30 p-3 rounded-lg overflow-x-auto">{`<a href="https://seospark.net" target="_blank" rel="noopener">
  <img src="https://seospark.net/badge.svg" alt="Powered by SEO Spark" width="180" height="40" />
</a>`}</pre>
          </div>
        </div>
      </div>
    </main>
  );
}
