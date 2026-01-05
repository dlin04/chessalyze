import { StoredGame } from "@/types";
import { ArrowRightToLine } from "lucide-react";

interface PreviousAnalyzedModalProps {
  isOpen: boolean;
  previousAnalyzed: StoredGame[];
  onClose: () => void;
}

export default function PreviousAnalyzedModal({
  isOpen,
  previousAnalyzed,
  onClose,
}: PreviousAnalyzedModalProps) {
  if (!isOpen) return null;

  return (
    <div className="bg-background/80 absolute inset-0 z-50 flex items-center justify-center rounded-lg backdrop-blur-md">
      <div className="mx-4 w-full max-w-2xl">
        <div className="bg-panel border-border rounded-lg border p-6">
          <div className="mb-6">
            <h2 className="text-foreground text-center text-xl font-bold">
              Previously Analyzed
            </h2>
          </div>

          {previousAnalyzed.length === 0 ? (
            <div className="text-muted py-12 text-center">
              No previously analyzed games found.
            </div>
          ) : (
            <div className="scrollbar-hide max-h-[400px] space-y-2 overflow-y-auto">
              {previousAnalyzed.map((game) => {
                const whitePlayer = game.whitePlayerName;
                const whitePlayerRating = game.whitePlayerRating;
                const blackPlayer = game.blackPlayerName;
                const blackPlayerRating = game.blackPlayerRating;

                return (
                  <button
                    key={game.id}
                    className="bg-background hover:bg-background/80 border-border w-full cursor-pointer rounded-lg border p-4 text-left transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">
                          {whitePlayer} ({whitePlayerRating}) vs {blackPlayer} (
                          {blackPlayerRating})
                        </div>
                        <div className="text-muted text-sm">
                          {game.positions?.length || 0} positions analyzed
                        </div>
                      </div>
                      <div className="text-muted group-hover:text-foreground flex gap-2 text-sm transition-colors">
                        Load <ArrowRightToLine className="h-5 w-5" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
          <button
            onClick={onClose}
            className="border-interactive text-muted hover:text-foreground mt-4 w-full cursor-pointer rounded border px-4 py-2 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
