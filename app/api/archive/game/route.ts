import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const res = await request.json();
    const { monthURL } = res;

    const gameRes = await fetch(monthURL);
    const gameData = await gameRes.json();
    // returns the whole list of games from that month
    // can parse the data in the frontend to display to user and
    // choose which game they want to analyze
    return NextResponse.json(gameData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch game from Chess.com API" },
      { status: 500 }
    );
  }
}
