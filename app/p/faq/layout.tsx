import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free FAQ Page Generator — SEO Schema Markup for Google Rich Results",
  description:
    "Enter your website URL, get a complete FAQ page with JSON-LD schema markup. Appear in Google's People Also Ask. 2 free generations per day. No sign-up.",
  openGraph: {
    title: "Free FAQ Page Generator — SEO Schema Markup for Google Rich Results",
    description:
      "Generate FAQ pages with JSON-LD schema that Google shows in search results. 2 free per day.",
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
