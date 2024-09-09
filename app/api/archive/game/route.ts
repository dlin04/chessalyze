import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const res = request.json();

  try {
    const gameRes = await fetch(``);
    const gameData = await gameRes.json();
    return NextResponse.json(gameData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch game from Chess.com API" },
      { status: 500 }
    );
  }
}
