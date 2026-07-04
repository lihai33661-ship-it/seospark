import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SEO Spark - AI SEO Content Generator",
  description:
    "Generate SEO-optimized blog posts, product descriptions, and landing pages in minutes. Built for small businesses that want to rank on Google.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
