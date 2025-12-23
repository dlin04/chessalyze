"use client";

import { UserRoundSearch, Move, BookOpenCheck } from "lucide-react";

interface AnalysisTabsProps {
  onChangeUser: () => void;
}

export default function AnalysisTabs({ onChangeUser }: AnalysisTabsProps) {
  return (
    <div className="scrollbar-hide mb-6 overflow-x-auto">
      <div className="flex min-w-max justify-center gap-2 px-4 lg:px-0">
        <button className="border-interactive text-muted hover:text-foreground hover:border-status-engine flex cursor-pointer items-center gap-2 rounded border px-6 py-2 whitespace-nowrap transition-colors">
          <BookOpenCheck size={16} />
          Analysis
        </button>
        <button className="border-interactive text-muted hover:text-foreground hover:border-status-engine flex cursor-pointer items-center gap-2 rounded border px-6 py-2 whitespace-nowrap transition-colors">
          <Move size={16} />
          Moves
        </button>
        <button
          onClick={onChangeUser}
          className="border-interactive text-muted hover:text-foreground hover:border-status-engine flex cursor-pointer items-center gap-2 rounded border px-6 py-2 whitespace-nowrap transition-colors"
        >
          <UserRoundSearch size={16} />
          Find Game
        </button>
      </div>
    </div>
  );
}
