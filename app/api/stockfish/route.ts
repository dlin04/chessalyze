import { NextRequest, NextResponse } from "next/server";
import { Chess } from "chess.js";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fenPosition = searchParams.get("fenPosition");

  if (fenPosition === null) {
    return NextResponse.json(
      { error: "FEN paramter is missing" },
      { status: 400 }
    );
  }

  try {
    const chess = new Chess(fenPosition);
    if (chess.isCheckmate()) {
      return NextResponse.json({
        success: true,
        mate: null,
        bestmove: "Checkmate!",
        continuation: null,
      });
    } else if (chess.isStalemate()) {
      return NextResponse.json({
        success: true,
        mate: null,
        bestmove: "Stalemate.",
        continuation: null,
      });
    } else {
      const stockfishRes = await fetch(
        `https://stockfish.online/api/s/v2.php?fen=${fenPosition}&depth=10`
      );
      const stockfishData = await stockfishRes.json();
      const bestMovePart = stockfishData.bestmove.split(" ").slice(1).join(" ");
      stockfishData.bestmove = bestMovePart;
      return NextResponse.json(stockfishData);
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch Stockfish analysis" },
      { status: 500 }
    );
  }
}
