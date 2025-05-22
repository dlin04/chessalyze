import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Game ID required." }, { status: 400 });
    }

    const game = await prisma.game.findUnique({ where: { id } });
    if (!game) {
      return NextResponse.json({ error: "Game not found." }, { status: 404 });
    }
    return NextResponse.json({ game }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
