import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fen = searchParams.get("fen");

  if (fen === null) {
    return NextResponse.json(
      { error: "FEN paramter is missing" },
      { status: 400 }
    );
  }

  try {
    const stockfishRes = await fetch(
      `https://stockfish.online/api/s/v2.php?fen=${fen}&depth=15`
    );
    const stockfishData = await stockfishRes.json();
    return NextResponse.json(stockfishData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch Stockfish analysis" },
      { status: 500 }
    );
  }
}
