"use client";

import { Chessboard } from "react-chessboard";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Game } from "@/types";
import { PositionEvaluation } from "@/types";

interface BoardProps {
  selectedGame: Game | null;
  analyzedPositions: PositionEvaluation[];
  currentMoveIndex: number;
  onMoveIndexChange: (index: number) => void;
}

export default function Board({
  selectedGame,
  analyzedPositions,
  currentMoveIndex,
  onMoveIndexChange,
}: BoardProps) {
  const whitePlayer = selectedGame?.white.username || "White Player";
  const whitePlayerRating = selectedGame?.white.rating || "Rating";
  const blackPlayer = selectedGame?.black.username || "Black Player";
  const blackPlayerRating = selectedGame?.black.rating || "Rating";

  const defaultFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

  return (
    <div className="bg-background rounded-lg p-5">
      <div className="bg-card mb-3 flex items-center justify-between rounded px-4 py-2">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-full bg-black"></div>
          <span>{blackPlayer}</span>
        </div>
        <span>{blackPlayerRating}</span>
      </div>

      <div className="mb-3">
        <Chessboard
          options={{
            position:
              analyzedPositions.length > 0 &&
              analyzedPositions[currentMoveIndex]?.fen
                ? analyzedPositions[currentMoveIndex].fen
                : defaultFen,
          }}
        />
      </div>

      <div className="bg-card mb-4 flex items-center justify-between rounded px-4 py-2">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-full bg-white"></div>
          <span>{whitePlayer}</span>
        </div>
        <span>{whitePlayerRating}</span>
      </div>

      <div className="bg-background flex justify-center gap-2 rounded p-2">
        <button
          onClick={() => onMoveIndexChange(0)}
          disabled={currentMoveIndex === 0}
          className="bg-interactive text-foreground hover:bg-border flex w-16 cursor-pointer items-center justify-center rounded py-2 transition-colors"
        >
          <ChevronsLeft size={24} />
        </button>
        <button
          onClick={() => onMoveIndexChange(Math.max(0, currentMoveIndex - 1))}
          disabled={currentMoveIndex === 0}
          className="bg-interactive text-foreground hover:bg-border flex w-16 cursor-pointer items-center justify-center rounded py-2 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() =>
            onMoveIndexChange(
              Math.min(
                (analyzedPositions?.length ?? 1) - 1,
                currentMoveIndex + 1,
              ),
            )
          }
          disabled={
            !analyzedPositions ||
            currentMoveIndex === analyzedPositions.length - 1
          }
          className="bg-interactive text-foreground hover:bg-border flex w-16 cursor-pointer items-center justify-center rounded py-2 transition-colors"
        >
          <ChevronRight size={24} />
        </button>
        <button
          onClick={() =>
            onMoveIndexChange((analyzedPositions?.length ?? 1) - 1)
          }
          disabled={
            !analyzedPositions ||
            currentMoveIndex === analyzedPositions.length - 1
          }
          className="bg-interactive text-foreground hover:bg-border flex w-16 cursor-pointer items-center justify-center rounded py-2 transition-colors"
        >
          <ChevronsRight size={24} />
        </button>
      </div>
    </div>
  );
}
