"use client";

import { useState } from "react";
import { Chessboard } from "react-chessboard";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
} from "lucide-react";
import { Player, PositionEvaluation } from "@/types";

interface BoardProps {
  whitePlayer: Player | null;
  blackPlayer: Player | null;
  analyzedPositions: PositionEvaluation[];
  currentMoveIndex: number;
  onMoveIndexChange: (index: number) => void;
}

type orientation = "white" | "black";

export default function Board({
  whitePlayer,
  blackPlayer,
  analyzedPositions,
  currentMoveIndex,
  onMoveIndexChange,
}: BoardProps) {
  const [orientation, setOrientation] = useState<orientation>("white");
  const defaultFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

  const topPlayer = orientation === "white" ? blackPlayer : whitePlayer;
  const bottomPlayer = orientation === "white" ? whitePlayer : blackPlayer;
  const topColor = orientation === "white" ? "bg-black" : "bg-white";
  const bottomColor = orientation === "white" ? "bg-white" : "bg-black";

  return (
    <div className="bg-background rounded-lg p-5">
      <div className="bg-card mb-3 flex items-center justify-between rounded px-4 py-2">
        <div className="flex items-center gap-3">
          <div className={`h-6 w-6 rounded-full ${topColor}`}></div>
          <span>
            {topPlayer?.username ||
              (orientation === "white" ? "Black Player" : "White Player")}
          </span>
        </div>
        <span>{topPlayer?.rating || "-"}</span>
      </div>

      <div className="mb-3">
        <Chessboard
          options={{
            boardOrientation: orientation,
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
          <div className={`h-6 w-6 rounded-full ${bottomColor}`}></div>
          <span>
            {bottomPlayer?.username ||
              (orientation === "white" ? "White Player" : "Black Player")}
          </span>
        </div>
        <span>{bottomPlayer?.rating || "-"}</span>
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
        <button
          onClick={() =>
            setOrientation(orientation === "white" ? "black" : "white")
          }
          className="bg-interactive text-foreground hover:bg-border flex w-16 cursor-pointer items-center justify-center rounded py-2 transition-colors"
        >
          <ArrowUpDown size={24} />
        </button>
      </div>
    </div>
  );
}
