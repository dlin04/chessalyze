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
  onCancel: (current_step: string) => void;
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
    <div className="bg-background/80 absolute inset-0 z-10 flex items-center justify-center rounded-lg backdrop-blur-md">
      <div className="mx-4 w-full max-w-2xl">
        <div className="bg-panel border-border rounded-lg border p-6">
          {step === "username" && (
            <UsernameStep
              username={username}
              hasSubmitted={hasSubmitted}
              onUsernameChange={onUsernameChange}
              onSubmit={onUsernameSubmit}
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
            <GameStep
              handleGameSelect={onGameSelect}
              onCancel={onCancel}
              games={games}
            />
          )}
        </div>
      </div>
    </div>
  );
}
