export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "SEO Spark",
        url: "https://seospark.net",
        description:
          "AI blog writer for small businesses. ChatGPT alternative that generates publish-ready, SEO-optimized articles in 60 seconds. Built-in keyword strategy, EEAT signals, and real-time scoring. Get found on Google.",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "Free tier: 3 articles. Pro: $9/month. Lifetime: $79.",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          ratingCount: "200",
        },
      },
      {
        "@type": "Organization",
        name: "SEO Spark",
        url: "https://seospark.net",
        logo: "https://seospark.net/icon.svg",
        sameAs: ["https://x.com/gorgeous4ew"],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is SEO Spark just a ChatGPT wrapper?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. ChatGPT writes text. SEO Spark writes content engineered for search rankings — with built-in keyword strategy, content scoring across 8 dimensions, automatic meta tag generation, and structure optimized for Google's EEAT guidelines.",
            },
          },
          {
            "@type": "Question",
            name: "Will this actually help me rank on Google?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Google rewards well-structured, keyword-optimized content. SEO Spark builds every article around your target keyword with proper heading hierarchy, meta tags, and EEAT signals. We give you a real-time SEO score before you publish.",
            },
          },
          {
            "@type": "Question",
            name: "Do I own the content I generate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. 100%. All generated content is yours — no attribution required, no rights reserved.",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
