import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({
        error: "Email does not exist or unauthorized.",
        status: 401,
      });
    }
    const games = await prisma.game.findMany({
      where: { userEmail: email },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ games }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
