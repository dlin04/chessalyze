import { Chess } from "chess.js";
import { getStockfish, StockfishEvaluation } from "./stockfish";

export interface PositionEvaluation {
  moveNumber: number;
  move: string | null;
  fen: string;
  evaluation: StockfishEvaluation;
}

export async function analyze(
  pgn: string,
  onProgress?: (current: number, total: number) => void,
): Promise<PositionEvaluation[]> {
  const chess = new Chess();
  chess.loadPgn(pgn);
  const moves = chess.history();
  const positions: PositionEvaluation[] = [];

  chess.reset();
  const stockfish = getStockfish();
  const startEval = await stockfish.evaluatePosition(chess.fen(), 15);
  positions.push({
    moveNumber: 0,
    move: null,
    fen: chess.fen(),
    evaluation: startEval,
  });

  onProgress?.(0, moves.length);
  for (let i = 0; i < moves.length; i++) {
    chess.move(moves[i]);

    const evaluation = await stockfish.evaluatePosition(chess.fen(), 15);
    positions.push({
      moveNumber: i + 1,
      move: moves[i],
      fen: chess.fen(),
      evaluation,
    });

    onProgress?.(i + 1, moves.length);
  }

  return positions;
}
