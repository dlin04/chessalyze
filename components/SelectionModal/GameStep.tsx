"use client";

import { Game } from "@/types";

interface GameStepProps {
  onCancel: (current_step: string) => void;
  games: Game[];
  handleGameSelect: (game: Game) => void;
}

export default function GameStep({
  onCancel,
  games,
  handleGameSelect,
}: GameStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-foreground mb-4 text-center text-xl font-semibold">
        Select Game
      </h2>
      <div className="scrollbar-hide max-h-[400px] space-y-2 overflow-y-auto">
        {games.map((game, index) => {
          const whitePlayer = game.white.username;
          const whitePlayerRating = game.white.rating;
          const blackPlayer = game.black.username;
          const blackPlayerRating = game.black.rating;
          const result =
            game.white.result === "win"
              ? "1-0"
              : game.black.result === "win"
                ? "0-1"
                : "½-½";

          const date = new Date(game.end_time * 1000).toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
              year: "numeric",
            },
          );

          return (
            <button
              key={index}
              onClick={() => handleGameSelect(game)}
              className="bg-background hover:bg-background/80 border-border w-full cursor-pointer rounded-lg border p-4 text-left transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">
                    {whitePlayer} ({whitePlayerRating}) vs {blackPlayer} (
                    {blackPlayerRating})
                  </div>
                  <div className="text-muted text-sm">
                    {date} • {game.time_class} • {game.time_control}
                  </div>
                </div>
                <div className="text-lg font-bold">{result}</div>
              </div>
            </button>
          );
        })}
      </div>
      <button
        onClick={() => onCancel("game")}
        className="border-interactive text-muted hover:text-foreground mt-4 w-full cursor-pointer rounded border px-4 py-2 transition-colors"
      >
        Cancel
      </button>
    </div>
  );
}
