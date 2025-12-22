"use client";

import { Chessboard } from "react-chessboard";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Game } from "@/types";

interface BoardProps {
  selectedGame: Game | null;
}

export default function Board({ selectedGame }: BoardProps) {
  const whitePlayer = selectedGame?.white.username || "White Player";
  const whitePlayerRating = selectedGame?.white.rating || "Rating";
  const blackPlayer = selectedGame?.black.username || "Black Player";
  const blackPlayerRating = selectedGame?.black.rating || "Rating";

  return (
    <div className="bg-background p-5">
      <div className="bg-card mb-3 flex items-center justify-between rounded px-4 py-2">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-full bg-black"></div>
          <span>{blackPlayer}</span>
        </div>
        <span>{blackPlayerRating}</span>
      </div>

      <div className="mb-3">
        <Chessboard />
      </div>

      <div className="bg-card mb-4 flex items-center justify-between rounded px-4 py-2">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-full bg-white"></div>
          <span>{whitePlayer}</span>
        </div>
        <span>{whitePlayerRating}</span>
      </div>

      <div className="bg-background flex justify-center gap-2 rounded p-2">
        <button className="bg-interactive text-foreground hover:bg-border flex w-16 cursor-pointer items-center justify-center rounded py-2 transition-colors">
          <ChevronsLeft size={20} />
        </button>
        <button className="bg-interactive text-foreground hover:bg-border flex w-16 cursor-pointer items-center justify-center rounded py-2 transition-colors">
          <ChevronLeft size={20} />
        </button>
        <button className="bg-interactive text-foreground hover:bg-border flex w-16 cursor-pointer items-center justify-center rounded py-2 transition-colors">
          <ChevronRight size={20} />
        </button>
        <button className="bg-interactive text-foreground hover:bg-border flex w-16 cursor-pointer items-center justify-center rounded py-2 transition-colors">
          <ChevronsRight size={20} />
        </button>
      </div>
    </div>
  );
}
