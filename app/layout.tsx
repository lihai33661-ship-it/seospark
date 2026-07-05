import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SEO Spark - AI Blog Posts That Rank on Google",
  description:
    "One keyword → complete SEO blog post in 60 seconds. Real stats, real examples, ready to publish. 3 free articles, no credit card.",
  openGraph: {
    title: "SEO Spark - AI Blog Posts That Rank on Google",
    description:
      "One keyword → complete SEO blog post in 60 seconds. 3 free articles, no credit card.",
    url: "https://seospark.net",
    siteName: "SEO Spark",
    type: "website",
    images: [
      {
        url: "https://seospark.net/opengraph-image",
        width: 1200,
        height: 630,
        alt: "SEO Spark - AI Blog Posts That Rank on Google",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Spark - AI Blog Posts That Rank on Google",
    description:
      "One keyword → complete SEO blog post in 60 seconds. 3 free articles.",
    images: ["https://seospark.net/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">{children}</body>
    </html>
  );
}
