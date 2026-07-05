import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const sid = req.cookies.get("spark_sid")?.value;
  if (!sid) return NextResponse.json([]);

  const articles = await prisma.content.findMany({
    where: { sessionId: sid },
    orderBy: { createdAt: "desc" },
    take: 20,
    select: { id: true, title: true, keywords: true, createdAt: true },
  });

  return NextResponse.json(articles);
}
