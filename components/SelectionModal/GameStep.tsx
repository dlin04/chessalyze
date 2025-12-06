"use client";

import { Game } from "@/types";

interface GameStepProps {
  games: Game[];
  handleGameSelect: (game: Game) => void;
}

export default function GameStep({ games, handleGameSelect }: GameStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground mb-4">
        Select a Game
      </h2>
      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {games.map((game, index) => {
          const whitePlayer = game.white.username;
          const blackPlayer = game.black.username;
          const result =
            game.white.result === "win"
              ? "1-0"
              : game.black.result === "win"
              ? "0-1"
              : "½-½";
          const date = new Date(game.end_time * 1000).toLocaleDateString();

          return (
            <button
              key={index}
              onClick={() => handleGameSelect(game)}
              className="w-full p-4 bg-background hover:bg-background/80 border border-border rounded-lg text-left transition-colors"
            >
              {whitePlayer} vs. {blackPlayer} result: {result} on {date}
            </button>
          );
        })}
      </div>
    </div>
  );
}
