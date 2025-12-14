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
      <h2 className="text-xl font-semibold text-foreground mb-4">
        Select a Game
      </h2>
      <div className="space-y-2 max-h-[400px] overflow-y-auto scrollbar-hide">
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
            }
          );

          return (
            <button
              key={index}
              onClick={() => handleGameSelect(game)}
              className="w-full p-4 bg-background cursor-pointer hover:bg-background/80 border border-border rounded-lg text-left transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">
                    {whitePlayer} ({whitePlayerRating}) vs {blackPlayer} (
                    {blackPlayerRating})
                  </div>
                  <div className="text-sm text-muted">
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
        className="cursor-pointer w-full px-4 py-2 border border-interactive text-muted rounded hover:text-foreground transition-colors mt-4"
      >
        Cancel
      </button>
    </div>
  );
}
