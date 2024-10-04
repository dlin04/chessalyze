import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const gamesFromMonthURL = searchParams.get("gamesFromMonthURL");

  if (!gamesFromMonthURL) {
    return NextResponse.json(
      { error: "Missing gamesFromMonthURL parameter" },
      { status: 400 }
    );
  }

  try {
    const gameRes = await fetch(gamesFromMonthURL);
    const gameData = await gameRes.json();
    return NextResponse.json(gameData);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch game from Chess.com API" },
      { status: 500 }
    );
  }
}
