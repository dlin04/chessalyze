import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const res = await request.json();
  const { username } = res;

  try {
    const archiveRes = await fetch(
      `https://api.chess.com/pub/player/${username}/games/archives`
    );
    const archiveData = await archiveRes.json();

    // use .map on frontend to display and send choice back to other route
    return NextResponse.json(archiveData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user from Chess.com API" },
      { status: 500 }
    );
  }
}
