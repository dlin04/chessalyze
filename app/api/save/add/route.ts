import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { userEmail, gameData } = await request.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    const newGame = await prisma.game.create({
      data: {
        userId: user.id,
        whitePlayer: gameData.whitePlayer,
        whiteRating: gameData.whiteRating,
        blackPlayer: gameData.blackPlayer,
        blackRating: gameData.blackRating,
        positions: gameData.positions,
        bestMoves: gameData.bestMoves,
      },
    });

    return NextResponse.json({ success: true, game: newGame });
  } catch (error) {
    console.error("Error saving game:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save game" },
      { status: 500 }
    );
  }
}
