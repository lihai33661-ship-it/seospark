/**
 * POST /api/generate/blog
 * 免费额度：3 篇/cookie
 * 流式响应：NDJSON 格式，逐 token 推送
 */
import { NextRequest, NextResponse } from "next/server";
import { streamBlogPost } from "@/lib/ai/blog-generator";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const FREE_LIMIT = 3;

function readCount(req: NextRequest): number {
  const raw = req.cookies.get("spark_usage")?.value;
  return raw ? parseInt(raw) || 0 : 0;
}

function getSessionId(req: NextRequest): string {
  const existing = req.cookies.get("spark_sid")?.value;
  if (existing) return existing;
  return crypto.randomUUID();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topic, keyword, secondaryKeywords, audience, tone } = body;

    if (!topic || !keyword) {
      return NextResponse.json(
        { error: "Topic and keyword are required" },
        { status: 400 }
      );
    }

    const count = readCount(req);
    if (count >= FREE_LIMIT) {
      return NextResponse.json(
        { error: "Free limit reached. Upgrade to Pro.", quotaExceeded: true },
        { status: 402 }
      );
    }

    const newCount = count + 1;
    const remaining = FREE_LIMIT - newCount;
    const sessionId = getSessionId(req);

    // Build the streaming response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const generator = streamBlogPost({
            topic,
            keyword,
            secondaryKeywords: secondaryKeywords || [],
            audience: audience || "business professionals",
            tone: tone || "professional",
          });

          for await (const event of generator) {
            let output = event.type === "done"
              ? { ...event, remaining, sessionId }
              : event;

            // Save to DB on done
            if (event.type === "done" && event.title) {
              try {
                await prisma.content.create({
                  data: {
                    sessionId,
                    title: event.title,
                    keywords: keyword,
                    body: event.content || "",
                  },
                });
              } catch (dbErr) {
                console.error("Save content error:", dbErr);
              }
            }

            const line = JSON.stringify(output) + "\n";
            controller.enqueue(encoder.encode(line));
          }
        } catch (error) {
          const errorLine =
            JSON.stringify({
              type: "error",
              error:
                error instanceof Error
                  ? error.message
                  : "Generation failed",
            }) + "\n";
          controller.enqueue(encoder.encode(errorLine));
        }
        controller.close();
      },
    });

    const response = new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "X-Content-Type-Options": "nosniff",
        "Set-Cookie": [
          `spark_usage=${newCount}; HttpOnly; Secure; SameSite=Lax; Max-Age=${60 * 60 * 24 * 365}; Path=/`,
          `spark_sid=${sessionId}; HttpOnly; Secure; SameSite=Lax; Max-Age=${60 * 60 * 24 * 365}; Path=/`,
        ].join(", "),
      },
    });

    return response;
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Content generation failed. Please try again." },
      { status: 500 }
    );
  }
}
