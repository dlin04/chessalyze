import { Chess } from "chess.js";
import { getStockfish } from "./stockfish";
import {
  PlayerMoveStats,
  PositionEvaluation,
  MoveClassification,
} from "@/types";

const whitePlayerStats: PlayerMoveStats = {
  best: 0,
  great: 0,
  good: 0,
  inaccuracy: 0,
  mistake: 0,
  blunder: 0,
};

const blackPlayerStats: PlayerMoveStats = {
  best: 0,
  great: 0,
  good: 0,
  inaccuracy: 0,
  mistake: 0,
  blunder: 0,
};

function classifyMove(cpLoss: number): MoveClassification {
  if (cpLoss <= 20) return "great";
  if (cpLoss <= 50) return "good";
  if (cpLoss <= 100) return "inaccuracy";
  if (cpLoss <= 300) return "mistake";
  return "blunder";
}

export async function analyze(
  pgn: string,
  onProgress?: (
    status: "parsing" | "analyzing",
    current: number,
    total: number,
  ) => void,
): Promise<{
  positions: PositionEvaluation[];
  whitePlayerStats: PlayerMoveStats;
  blackPlayerStats: PlayerMoveStats;
}> {
  const chess = new Chess();
  chess.loadPgn(pgn);
  const moves = chess.history();
  const positions: (PositionEvaluation & {
    classification?: MoveClassification;
  })[] = [];

  chess.reset();
  const stockfish = getStockfish();
  const startEval = await stockfish.evaluatePosition(chess.fen(), 15);
  positions.push({
    moveNumber: 0,
    move: null,
    fen: chess.fen(),
    evaluation: startEval,
    bestMoveSan: "e4",
    classification: undefined,
  });

  let prevEval = startEval;

  onProgress?.("analyzing", 0, moves.length);
  for (let i = 0; i < moves.length; i++) {
    const moveObj = chess.move(moves[i]);
    const evaluation = await stockfish.evaluatePosition(chess.fen(), 15);

    const player = i % 2 === 0 ? "white" : "black";
    const uciMove =
      moveObj.from + moveObj.to + (moveObj.promotion ? moveObj.promotion : "");

    let bestMoveSan = null;
    if (evaluation.bestMove) {
      const moveObj = chess.move({
        from: evaluation.bestMove.slice(0, 2),
        to: evaluation.bestMove.slice(2, 4),
        promotion:
          evaluation.bestMove.length > 4 ? evaluation.bestMove[4] : undefined,
      });
      bestMoveSan = moveObj ? moveObj.san : null;
      if (moveObj) chess.undo();
    }

    let classification: MoveClassification | "best" = "best";
    if (uciMove === prevEval.bestMove) {
      if (player === "white") {
        whitePlayerStats.best++;
      } else {
        blackPlayerStats.best++;
      }
      classification = "best";
    } else {
      const cpBefore =
        prevEval.type === "cp"
          ? prevEval.value
          : prevEval.type === "mate"
            ? prevEval.value > 0
              ? 10000
              : -10000
            : 0;
      const cpAfter =
        evaluation.type === "cp"
          ? evaluation.value
          : evaluation.type === "mate"
            ? evaluation.value > 0
              ? 10000
              : -10000
            : 0;
      const cpLoss =
        player === "white" ? cpBefore - cpAfter : cpAfter - cpBefore;
      classification = classifyMove(cpLoss);

      if (player === "white") {
        whitePlayerStats[classification]++;
      } else {
        blackPlayerStats[classification]++;
      }
    }

    positions.push({
      moveNumber: i + 1,
      move: moveObj.san,
      fen: chess.fen(),
      evaluation: evaluation,
      bestMoveSan: bestMoveSan ?? undefined,
      classification,
    });

    prevEval = evaluation;
    onProgress?.("analyzing", i + 1, moves.length);
  }

  return {
    positions,
    whitePlayerStats,
    blackPlayerStats,
  };
}
