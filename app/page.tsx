"use client";

import { useState, useEffect } from "react";
import { ModalStep, Game } from "@/types";
import Board from "@/components/Board";
import SelectionModal from "@/components/SelectionModal";
import AnalysisPanel from "@/components/AnalysisPanel";
import { getPlayedMonths, getMonthGames } from "@/lib/chessComApi";
import { getStockfish } from "@/lib/stockfish";
import { analyze, PositionEvaluation } from "@/lib/analyze";

export default function Home() {
  const [username, setUsername] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [modalStep, setModalStep] = useState<ModalStep>("username");
  const [availableMonths, setAvailableMonths] = useState<string[]>([]);
  const [availableGames, setAvailableGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [analysisResult, setAnalysisResult] = useState<PositionEvaluation[]>(
    [],
  );
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [analysisProgress, setAnalysisProgress] = useState<{
    status: "parsing" | "analyzing";
    current: number;
    total: number;
  } | null>(null);

  useEffect(() => {
    return () => {
      getStockfish().terminate();
    };
  }, []);

  const handleUsernameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setHasSubmitted(true);

      const data = await getPlayedMonths(username);
      setAvailableMonths(data.archives || []);

      setModalStep("month");
    }
  };

  const handleMonthSelect = async (month_url: string) => {
    const data = await getMonthGames(month_url);
    setAvailableGames(data.games || []);
    setModalStep("game");
  };

  const handleChangeUsername = () => {
    setSelectedGame(null);
    setShowModal(true);
    setModalStep("username");
  };

  const handleCancelModal = (current_step: string) => {
    if (current_step == "month") {
      setModalStep("username");
    } else if (current_step == "game") {
      setModalStep("month");
    }
    setShowModal(true);
  };

  const handleGameSelect = async (game: Game) => {
    setSelectedGame(game);
    setShowModal(false);
    setAnalysisProgress({ status: "parsing", current: 0, total: 0 });

    const result = await analyze(game.pgn, (status, current, total) => {
      setAnalysisProgress({ status, current, total });
    });

    console.log(result);

    setAnalysisResult(result);
    setCurrentMoveIndex(0);
    setAnalysisProgress(null);
  };

  return (
    <div className="bg-background min-h-screen">
      <header className="bg-panel border-border flex h-[70px] items-center border-b px-8">
        <h1 className="text-foreground text-2xl font-bold">Chessalyze</h1>
      </header>

      <main className="p-8">
        <div className="bg-panel mx-auto max-w-[1300px] rounded-lg p-5">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[600px_1fr]">
            <Board
              selectedGame={selectedGame}
              analysisResult={analysisResult}
              currentMoveIndex={currentMoveIndex}
              onMoveIndexChange={(index) => setCurrentMoveIndex(index)}
            />

            <div className="bg-background relative min-h-[800px] rounded-lg p-5">
              {!selectedGame ? (
                <SelectionModal
                  months={availableMonths}
                  games={availableGames}
                  isOpen={showModal}
                  step={modalStep}
                  username={username}
                  hasSubmitted={hasSubmitted}
                  onUsernameChange={setUsername}
                  onUsernameSubmit={handleUsernameSubmit}
                  onMonthSelect={handleMonthSelect}
                  onGameSelect={handleGameSelect}
                  onCancel={handleCancelModal}
                />
              ) : (
                <>
                  {analysisProgress && (
                    <div className="bg-background/90 absolute inset-0 z-20 flex items-center justify-center rounded-lg backdrop-blur-sm">
                      <div className="text-center">
                        <div className="mb-4">
                          <div className="border-status-engine inline-block h-12 w-12 animate-spin rounded-full border-b-2"></div>
                        </div>
                        <p className="text-foreground mb-2 text-xl font-semibold">
                          {analysisProgress.status === "parsing"
                            ? "Parsing PGN..."
                            : "Analyzing Game..."}
                        </p>
                        {analysisProgress.status === "analyzing" && (
                          <>
                            <p className="text-muted mb-4 text-lg">
                              Move {analysisProgress.current} of{" "}
                              {analysisProgress.total}
                            </p>
                            {analysisProgress.total > 0 && (
                              <div className="bg-border mx-auto h-2 w-64 overflow-hidden rounded-full">
                                <div
                                  className="bg-status-engine h-full transition-all duration-300"
                                  style={{
                                    width: `${(analysisProgress.current / analysisProgress.total) * 100}%`,
                                  }}
                                />
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                  <AnalysisPanel
                    hasSubmitted={hasSubmitted}
                    onChangeUser={handleChangeUsername}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
