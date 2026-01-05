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
  Player,
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
  const [whitePlayer, setWhitePlayer] = useState<Player | null>(null);
  const [blackPlayer, setblackPlayer] = useState<Player | null>(null);
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
    setWhitePlayer(game.white);
    setblackPlayer(game.black);
    setCurrentMoveIndex(0);
    setAnalysisProgress(null);

    if (session?.user?.email) {
      const outcome =
        game.white.result === "win"
          ? "1-0"
          : game.black.result === "win"
            ? "0-1"
            : "½-½";

      await storeAnalysis({
        userEmail: session.user.email,
        chessComUuid: game.uuid,
        analyzedPositions: result.positions,
        whitePlayer: game.white,
        blackPlayer: game.black,
        whitePlayerStats: result.whitePlayerStats,
        blackPlayerStats: result.blackPlayerStats,
        result: outcome,
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

  const handleSelectPrevious = (game: StoredGame) => {
    const positions: PositionEvaluation[] = game.positions.map((pos) => ({
      moveNumber: pos.moveNumber,
      move: pos.move,
      fen: pos.fen,
      evaluation: {
        type: pos.evalType as "cp" | "mate",
        value: pos.evalValue,
        bestMove: pos.bestMove,
      },
      bestMoveSan: pos.bestMove,
      ...(pos.classification && {
        classification: pos.classification as
          | "best"
          | "great"
          | "good"
          | "inaccuracy"
          | "mistake"
          | "blunder",
      }),
    }));

    const whiteStats: PlayerMoveStats = {
      best: game.whiteBest,
      great: game.whiteGreat,
      good: game.whiteGood,
      inaccuracy: game.whiteInaccuracy,
      mistake: game.whiteMistake,
      blunder: game.whiteBlunder,
    };

    const blackStats: PlayerMoveStats = {
      best: game.blackBest,
      great: game.blackGreat,
      good: game.blackGood,
      inaccuracy: game.blackInaccuracy,
      mistake: game.blackMistake,
      blunder: game.blackBlunder,
    };

    const mockGame: Game = {
      url: "",
      pgn: "",
      time_control: "",
      end_time: 0,
      rated: true,
      tcn: "",
      uuid: game.chessComUuid,
      initial_setup: "",
      fen: "",
      time_class: "",
      rules: "",
      white: {
        rating: game.whitePlayerRating,
        result: "",
        "@id": "",
        username: game.whitePlayerName,
        uuid: "",
      },
      black: {
        rating: game.blackPlayerRating,
        result: "",
        "@id": "",
        username: game.blackPlayerName,
        uuid: "",
      },
      eco: "",
    };

    setSelectedGame(mockGame);
    setAnalyzedPositions(positions);
    setWhitePlayerStats(whiteStats);
    setBlackPlayerStats(blackStats);
    setCurrentMoveIndex(0);
    setShowPreviousModal(false);
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
              whitePlayer={whitePlayer}
              blackPlayer={blackPlayer}
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
                  handleSelectPrevious={handleSelectPrevious}
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
