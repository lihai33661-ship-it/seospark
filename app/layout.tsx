import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SEO Spark - AI SEO Content Generator",
  description:
    "Generate SEO-optimized blog posts, product descriptions, and landing pages in minutes.",
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
