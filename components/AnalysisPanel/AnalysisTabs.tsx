"use client";

import { UserCircle } from "lucide-react";

interface AnalysisTabsProps {
  hasSubmitted: boolean;
  onChangeUser: () => void;
}

export default function AnalysisTabs({
  hasSubmitted,
  onChangeUser,
}: AnalysisTabsProps) {
  return (
    <div className="scrollbar-hide mb-6 overflow-x-auto">
      <div className="flex min-w-max justify-center gap-2 px-4 lg:px-0">
        <button className="bg-interactive text-foreground rounded px-6 py-2 font-semibold whitespace-nowrap">
          Analysis
        </button>
        <button className="border-interactive text-muted hover:text-foreground cursor-pointer rounded border px-6 py-2 whitespace-nowrap transition-colors">
          Moves
        </button>
        <button className="border-interactive text-muted hover:text-foreground cursor-pointer rounded border px-6 py-2 whitespace-nowrap transition-colors">
          Summary
        </button>
        {hasSubmitted && (
          <button
            onClick={onChangeUser}
            className="border-interactive text-muted hover:text-foreground hover:border-status-engine flex cursor-pointer items-center gap-2 rounded border px-6 py-2 whitespace-nowrap transition-colors"
          >
            <UserCircle size={16} />
            Change User
          </button>
        )}
      </div>
    </div>
  );
}
