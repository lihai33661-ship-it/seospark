import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SEO Spark - AI Blog Posts That Rank on Google";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #2563eb 100%)",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            marginBottom: "48px",
          }}
        >
          <svg width="64" height="64" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="6" fill="white" />
            <path d="M16 4L18.5 12.5L16 14L19 22L11 14L15 12.5L16 4Z" fill="#2563eb" />
          </svg>
          <span
            style={{
              fontSize: "56px",
              fontWeight: 700,
              color: "white",
            }}
          >
            SEO Spark
          </span>
        </div>
        <p
          style={{
            fontSize: "48px",
            fontWeight: 600,
            color: "white",
            textAlign: "center",
            maxWidth: "900px",
            lineHeight: 1.2,
            marginBottom: "32px",
          }}
        >
          AI Blog Posts That Rank on Google
        </p>
        <p
          style={{
            fontSize: "28px",
            color: "#bfdbfe",
            textAlign: "center",
            maxWidth: "700px",
          }}
        >
          One keyword → complete SEO blog post in 60 seconds.
          3 free articles. No credit card.
        </p>
      </div>
    ),
    { ...size }
  );
}
