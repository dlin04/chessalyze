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
    <div className="mb-6 overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 justify-center min-w-max px-4 lg:px-0">
        <button className="px-6 py-2 bg-interactive text-foreground rounded font-semibold whitespace-nowrap">
          Analysis
        </button>
        <button className="px-6 py-2 border border-interactive text-muted rounded hover:text-foreground transition-colors whitespace-nowrap">
          Moves
        </button>
        <button className="px-6 py-2 border border-interactive text-muted rounded hover:text-foreground transition-colors whitespace-nowrap">
          Summary
        </button>
        {hasSubmitted && (
          <button
            onClick={onChangeUser}
            className="px-6 py-2 border border-interactive text-muted rounded hover:text-foreground hover:border-status-engine transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <UserCircle size={16} />
            Change User
          </button>
        )}
      </div>
    </div>
  );
}
