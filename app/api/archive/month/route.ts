import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("gameUsername");

  try {
    const archiveRes = await fetch(
      `https://api.chess.com/pub/player/${username}/games/archives`
    );
    const archiveData = await archiveRes.json();

    if (archiveData.code) {
      return NextResponse.json(
        { message: "Username not found" },
        { status: 404 }
      );
    }

    if (archiveData.archives.length == 0) {
      return NextResponse.json({ message: "Empty archives" }, { status: 204 });
    }
    return NextResponse.json(archiveData);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch user from Chess.com API" },
      { status: 500 }
    );
  }
}
