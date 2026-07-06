import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Product Description Generator — Amazon, Shopify, Etsy Listings",
  description:
    "Generate SEO-optimized product descriptions for Amazon, Shopify, Etsy, eBay, and Walmart. Platform-specific formatting with built-in keyword optimization. 3 free per day.",
  openGraph: {
    title: "Free Product Description Generator — Amazon, Shopify, Etsy Listings",
    description:
      "SEO-optimized product descriptions for Amazon, Shopify, Etsy. 3 free per day.",
  },
};

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
