"use client";

import { Chessboard } from "react-chessboard";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export default function Board() {
  return (
    <div className="bg-background p-5">
      <div className="bg-card rounded px-4 py-2 flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-black"></div>
          <span>Black Player</span>
        </div>
        <span>Rating</span>
      </div>

      <div className="mb-3">
        <Chessboard />
      </div>

      <div className="bg-card rounded px-4 py-2 flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-white"></div>
          <span>White Player</span>
        </div>
        <span>Rating</span>
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
