"use client";

import { useState } from "react";
import {
  AnalysisTab,
  Game,
  PlayerMoveStats,
  PositionEvaluation,
} from "@/types";
import { UserRoundSearch, Move, BookOpenCheck } from "lucide-react";
import Analysis from "./Analysis";
import Moves from "./Moves";

interface AnalysisPanelProps {
  currentMoveIndex: number;
  selectedGame: Game;
  analyzedPositions: PositionEvaluation[];
  whitePlayerStats: PlayerMoveStats | null;
  blackPlayerStats: PlayerMoveStats | null;
  onChangeUser: () => void;
}

interface AnalysisTabsProps {
  activeTab: AnalysisTab;
  setActiveTab: (tab: AnalysisTab) => void;
  onChangeUser: () => void;
}

function AnalysisTabs({
  activeTab,
  setActiveTab,
  onChangeUser,
}: AnalysisTabsProps) {
  return (
    <div className="scrollbar-hide mb-6 overflow-x-auto">
      <div className="flex min-w-max justify-center gap-2 px-4 lg:px-0">
        <button
          className={`border-interactive flex cursor-pointer items-center gap-2 rounded border px-6 py-2 whitespace-nowrap transition-colors ${activeTab === "analysis" ? "text-foreground border-status-engine" : "text-muted hover:text-foreground hover:border-status-engine"}`}
          onClick={() => setActiveTab("analysis")}
        >
          <BookOpenCheck size={16} />
          Analysis
        </button>
        <button
          className={`border-interactive flex cursor-pointer items-center gap-2 rounded border px-6 py-2 whitespace-nowrap transition-colors ${activeTab === "moves" ? "text-foreground border-status-engine" : "text-muted hover:text-foreground hover:border-status-engine"}`}
          onClick={() => setActiveTab("moves")}
        >
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

export default function AnalysisPanel({
  selectedGame,
  currentMoveIndex,
  analyzedPositions,
  whitePlayerStats,
  blackPlayerStats,
  onChangeUser,
}: AnalysisPanelProps) {
  const [activeTab, setActiveTab] = useState<AnalysisTab>("analysis");

  return (
    <>
      <AnalysisTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onChangeUser={onChangeUser}
      />
      {activeTab === "analysis" && (
        <Analysis
          selectedGame={selectedGame}
          currentMoveIndex={currentMoveIndex}
          analyzedPositions={analyzedPositions}
          whitePlayerStats={whitePlayerStats}
          blackPlayerStats={blackPlayerStats}
        />
      )}
      {activeTab === "moves" && <Moves />}
    </>
  );
}
