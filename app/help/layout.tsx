import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help Center — SEO Spark Free AI Tools",
  description:
    "How to use all 6 free AI tools from SEO Spark. Guides, tips, FAQs, and contact information.",
};

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
