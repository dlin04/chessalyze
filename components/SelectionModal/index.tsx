"use client";

import { ModalStep, Game } from "@/types";
import UsernameStep from "./UsernameStep";
import MonthStep from "./MonthStep";
import GameStep from "./GameStep";

interface SelectionModalProps {
  isOpen: boolean;
  step: ModalStep;
  username: string;
  hasSubmitted: boolean;
  months: string[];
  games: Game[];
  onUsernameChange: (username: string) => void;
  onUsernameSubmit: (e: React.FormEvent) => void;
  onMonthSelect: (month_url: string) => void;
  onGameSelect: (game: Game) => void;
  onCancel: () => void;
}

export default function SelectionModal({
  isOpen,
  step,
  username,
  hasSubmitted,
  months,
  games,
  onUsernameChange,
  onUsernameSubmit,
  onMonthSelect,
  onGameSelect,
  onCancel,
}: SelectionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-background/80 backdrop-blur-md rounded-lg flex items-center justify-center z-10">
      <div className="max-w-2xl w-full mx-4">
        <div className="bg-panel rounded-lg p-6 border border-border">
          {step === "username" && (
            <UsernameStep
              username={username}
              hasSubmitted={hasSubmitted}
              onUsernameChange={onUsernameChange}
              onSubmit={onUsernameSubmit}
              onCancel={onCancel}
            />
          )}

          {step === "month" && (
            <MonthStep
              handleMonthSelect={onMonthSelect}
              months={months}
              onCancel={onCancel}
            />
          )}

          {step === "game" && (
            <GameStep handleGameSelect={onGameSelect} games={games} />
          )}
        </div>
      </div>
    </div>
  );
}
