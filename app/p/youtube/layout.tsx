import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free YouTube SEO Optimizer — Titles, Tags, Description Generator",
  description:
    "Generate optimized YouTube titles, tags, descriptions, and file names for your videos. Built for content creators. 2 free generations per day. No sign-up.",
  openGraph: {
    title: "Free YouTube SEO Optimizer — Titles, Tags, Description Generator",
    description:
      "Generate optimized YouTube SEO. 2 free per day. No credit card.",
  },
};

export default function YoutubeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
