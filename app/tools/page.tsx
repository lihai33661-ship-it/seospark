import Link from "next/link";

export const metadata = {
  title: "Free AI Writing Tools for Small Business | SEO Spark Tools",
  description: "Free AI-powered writing tools for small businesses. Blog generator, proposal writer, FAQ builder, email sequences, product descriptions, and cold email templates — all free, no signup required.",
};

const TOOLS = [
  { href: "/dashboard", icon: "📝", name: "AI Blog Writer", desc: "One keyword → SEO-optimized blog post in 60 seconds. Built-in SEO scoring and EEAT signals." },
  { href: "/p/proposal", icon: "🎯", name: "Proposal Generator", desc: "Generate professional business proposals from a brief description." },
  { href: "/p/faq", icon: "❓", name: "FAQ Builder", desc: "Create comprehensive FAQ pages from your product or service description." },
  { href: "/p/email", icon: "📬", name: "Email Sequences", desc: "Automated email sequence writer for onboarding, nurturing, and sales." },
  { href: "/p/product", icon: "🛍", name: "Product Descriptions", desc: "Write compelling product descriptions optimized for e-commerce." },
  { href: "/p/cold-email", icon: "📧", name: "Cold Email Writer", desc: "Craft personalized cold emails that get replies." },
];

export default function ToolsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 sm:py-16">
      <h1 className="text-3xl font-bold mb-3">Free AI Writing Tools for Small Business</h1>
      <p className="text-gray-500 mb-10 text-lg">100% free. No signup. No credit card. Just enter your topic and get publish-ready content.</p>
      <div className="grid md:grid-cols-2 gap-4">
        {TOOLS.map((tool) => (
          <Link key={tool.href} href={tool.href} className="block border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition-all">
            <span className="text-2xl">{tool.icon}</span>
            <h2 className="font-semibold mt-2 mb-1">{tool.name}</h2>
            <p className="text-sm text-gray-500">{tool.desc}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
