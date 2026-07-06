import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Email Sequence Generator — 5 Welcome Emails That Convert",
  description:
    "Generate a 5-email welcome sequence in 30 seconds. Built for SaaS founders, e-commerce stores, and creators. 2 free generations per day. No sign-up.",
  openGraph: {
    title: "Free Email Sequence Generator — 5 Welcome Emails That Convert",
    description:
      "Generate a 5-email welcome sequence. 2 free per day. No credit card.",
  },
};

export default function EmailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
