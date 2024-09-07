import { Chess } from "chess.js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pgn = searchParams.get("pgn");

  if (pgn === null) {
    return NextResponse.json(
      { error: "PGN parameter is missing" },
      { status: 400 } // 400: bad request
    );
  }

  const chess = new Chess();
  const allPositions: string[] = [];

  chess.loadPgn(pgn);
  const moves = chess.history();
  chess.reset();
  moves.forEach((move) => {
    chess.move(move);
    allPositions.push(chess.fen());
  });

  const allStockfishRes = [];
  try {
    for (const position of allPositions) {
      const stockfishRes = await fetch(
        `https://stockfish.online/api/s/v2.php?fen=${position}&depth=15`
      );
      const stockfishData = await stockfishRes.json();
      allStockfishRes.push(stockfishData);
      return NextResponse.json(allStockfishRes);
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch Stockfish analysis" },
      { status: 500 } // 500: internal server error
    );
  }
}
