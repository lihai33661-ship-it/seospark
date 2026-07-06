import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI Proposal Generator — Win More Clients on Upwork & Fiverr",
  description:
    "Paste a job description, get a personalized proposal in 30 seconds. Built for freelancers on Upwork, Fiverr, and Toptal. 5 free proposals per day. No sign-up.",
  openGraph: {
    title: "Free AI Proposal Generator — Win More Clients on Upwork & Fiverr",
    description:
      "Paste a job description, get a personalized proposal in 30 seconds. 5 free per day.",
  },
};

export default function ProposalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
