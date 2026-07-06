import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Cold Email Generator — B2B Outreach That Gets Replies",
  description:
    "Research + write personalized B2B cold emails in 30 seconds. Built for sales reps, startup founders, and BD teams. 5 free emails per day. No sign-up.",
  openGraph: {
    title: "Free Cold Email Generator — B2B Outreach That Gets Replies",
    description:
      "Personalized B2B cold emails that get replies. 5 free per day. No credit card.",
  },
};

export default function ColdEmailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
