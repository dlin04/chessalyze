"use client";

import { useState, useEffect } from "react";
import { getStored, storeAnalysis } from "@/lib/actions";
import { useSession } from "next-auth/react";
import {
  ModalStep,
  Game,
  PlayerMoveStats,
  PositionEvaluation,
  StoredGame,
} from "@/types";
import Board from "@/components/Board";
import SelectionModal from "@/components/SelectionModal";
import AnalysisPanel from "@/components/AnalysisPanel";
import { getPlayedMonths, getMonthGames } from "@/lib/chessComApi";
import { getStockfish } from "@/lib/stockfish";
import { analyze } from "@/lib/analyze";
import Authentication from "@/components/Authentication";
import PreviousAnalyzedModal from "@/components/PreviousAnalyzedModal";

export default function Home() {
  const { data: session } = useSession();
  const [username, setUsername] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [showPreviousModal, setShowPreviousModal] = useState(false);
  const [previousGames, setPreviousGames] = useState<StoredGame[]>([]);
  const [modalStep, setModalStep] = useState<ModalStep>("username");
  const [availableMonths, setAvailableMonths] = useState<string[]>([]);
  const [availableGames, setAvailableGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [analysisProgress, setAnalysisProgress] = useState<{
    status: "parsing" | "analyzing";
    current: number;
    total: number;
  } | null>(null);
  const [analyzedPositions, setAnalyzedPositions] = useState<
    PositionEvaluation[]
  >([]);
  const [whitePlayerStats, setWhitePlayerStats] =
    useState<PlayerMoveStats | null>(null);
  const [blackPlayerStats, setBlackPlayerStats] =
    useState<PlayerMoveStats | null>(null);

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
    setAnalyzedPositions([]);
    setCurrentMoveIndex(0);
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

    setAnalyzedPositions(result.positions);
    setWhitePlayerStats(result.whitePlayerStats);
    setBlackPlayerStats(result.blackPlayerStats);
    setCurrentMoveIndex(0);
    setAnalysisProgress(null);

    if (session?.user?.email) {
      await storeAnalysis({
        userEmail: session.user.email,
        chessComUuid: game.uuid,
        analyzedPositions: result.positions,
        whitePlayer: game.white,
        blackPlayer: game.black,
        whitePlayerStats: result.whitePlayerStats,
        blackPlayerStats: result.blackPlayerStats,
      });
    }
  };

  const handleShowPrevious = async () => {
    if (session?.user?.email) {
      const previousGames = await getStored(session.user.email);
      setPreviousGames(previousGames);
      setShowPreviousModal(true);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <header className="bg-panel border-border flex h-[70px] items-center justify-between border-b px-8">
        <h1 className="text-foreground text-2xl font-bold">Chessalyze</h1>
        <Authentication handleShowPrevious={handleShowPrevious} />
      </header>

      <main className="p-8">
        <div className="bg-panel mx-auto max-w-[1300px] rounded-lg p-5">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(300px,600px)_1fr]">
            <Board
              selectedGame={selectedGame}
              analyzedPositions={analyzedPositions}
              currentMoveIndex={currentMoveIndex}
              onMoveIndexChange={(index) => setCurrentMoveIndex(index)}
            />

            <div className="bg-background relative min-h-[800px] rounded-lg p-5">
              {showPreviousModal && (
                <PreviousAnalyzedModal
                  isOpen={showPreviousModal}
                  previousAnalyzed={previousGames}
                  onClose={() => setShowPreviousModal(false)}
                />
              )}
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
                              Position {analysisProgress.current} of{" "}
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
                    selectedGame={selectedGame}
                    currentMoveIndex={currentMoveIndex}
                    analyzedPositions={analyzedPositions}
                    whitePlayerStats={whitePlayerStats}
                    blackPlayerStats={blackPlayerStats}
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
