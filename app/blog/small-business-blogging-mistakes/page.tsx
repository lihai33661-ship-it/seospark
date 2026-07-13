export const metadata = {
  title: "Small Business Blogging Mistakes — 7 Errors That Kill Your SEO | SEO Spark",
  description: "7 common blogging mistakes small businesses make that hurt SEO. Avoid these errors and write blog content that actually ranks on Google.",
};

export default function Post() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12 sm:py-16">
      <p className="text-sm text-gray-400 mb-2">July 12, 2026</p>
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">7 Blogging Mistakes Killing Your SEO</h1>
      <article className="prose max-w-none space-y-4 text-gray-700 leading-relaxed">
        <p>Most small businesses make the same blogging mistakes. Here's what kills your SEO and how to fix it.</p>

        <h2 className="text-xl font-bold mt-8 mb-3">1. Writing About Yourself Instead of What Customers Search</h2>
        <p>"Our commitment to quality" gets zero searches. "How much does a roof repair cost" gets hundreds. Write for search intent, not your brochure.</p>

        <h2 className="text-xl font-bold mt-8 mb-3">2. Publishing 3 Posts and Giving Up</h2>
        <p>SEO takes 3-6 months of consistent publishing. Three posts won't rank. Thirty might. Publish weekly for six months before judging the results.</p>

        <h2 className="text-xl font-bold mt-8 mb-3">3. No Meta Descriptions</h2>
        <p>Google picks random text if you don't write a meta description. Write one for every post — include your keyword and a click-worthy hook.</p>

        <h2 className="text-xl font-bold mt-8 mb-3">4. Images Without Alt Text</h2>
        <p>Google Images is a search engine too. Add descriptive alt text to every image. It's free traffic you're leaving on the table.</p>

        <h2 className="text-xl font-bold mt-8 mb-3">5. No Internal Links</h2>
        <p>Orphan pages (pages with no links pointing to them) get ignored by Google. Link between your blog posts. It spreads ranking power across your site.</p>

        <h2 className="text-xl font-bold mt-8 mb-3">6. Inconsistent Publishing</h2>
        <p>Publishing 10 posts in a week then nothing for 6 months tells Google your blog is abandoned. Steady weekly publishing beats burst-and-quit every time.</p>

        <h2 className="text-xl font-bold mt-8 mb-3">7. Generic AI Content Without Personal Experience</h2>
        <p>AI-generated text is everywhere in 2026. Google looks for EEAT — Experience, Expertise, Authority, Trust. Add your story, your data, your voice. Generic AI content doesn't rank.</p>

        <h2 className="text-xl font-bold mt-8 mb-3">The Fix</h2>
        <p>It's not complicated. Write what customers search. Publish consistently. Add meta tags and alt text. Link between posts. Use AI to draft fast, then add your experience.</p>

        <p className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-6">
          <a href="/dashboard" className="text-blue-600 underline font-semibold">Try SEO Spark free — 3 articles, no credit card.</a>
        </p>
      </article>
    </main>
  );
}
