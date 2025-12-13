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
      <div className="bg-card rounded px-4 py-2 flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-black"></div>
          <span>{blackPlayer}</span>
        </div>
        <span>{blackPlayerRating}</span>
      </div>

      <div className="mb-3">
        <Chessboard />
      </div>

      <div className="bg-card rounded px-4 py-2 flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-white"></div>
          <span>{whitePlayer}</span>
        </div>
        <span>{whitePlayerRating}</span>
      </div>

      <div className="flex justify-center gap-2 bg-background rounded p-2">
        <button className="w-16 py-2 bg-interactive text-foreground rounded hover:bg-border transition-colors flex items-center justify-center cursor-pointer">
          <ChevronsLeft size={20} />
        </button>
        <button className="w-16 py-2 bg-interactive text-foreground rounded hover:bg-border transition-colors flex items-center justify-center cursor-pointer">
          <ChevronLeft size={20} />
        </button>
        <button className="w-16 py-2 bg-interactive text-foreground rounded hover:bg-border transition-colors flex items-center justify-center cursor-pointer">
          <ChevronRight size={20} />
        </button>
        <button className="w-16 py-2 bg-interactive text-foreground rounded hover:bg-border transition-colors flex items-center justify-center cursor-pointer">
          <ChevronsRight size={20} />
        </button>
      </div>
    </div>
  );
}
