"use client";

import { printFEN } from "@/lib/stockfish";
import { useState } from "react";
import { ModalStep, Game } from "@/types";
import Board from "@/components/Board";
import SelectionModal from "@/components/SelectionModal";
import AnalysisPanel from "@/components/AnalysisPanel";
import { getPlayedMonths, getMonthGames } from "@/lib/chessComApi";

export default function Home() {
  const [username, setUsername] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [modalStep, setModalStep] = useState<ModalStep>("username");
  const [availableMonths, setAvailableMonths] = useState<string[]>([]);
  const [availableGames, setAvailableGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

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

  const handleGameSelect = async (game: Game) => {
    setSelectedGame(game);
    setShowModal(false);

    // TODO: load game and start analysis
    console.log(game.pgn);
    printFEN(game.pgn);
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

  return (
    <div className="bg-background min-h-screen">
      <header className="bg-panel border-border flex h-[70px] items-center border-b px-8">
        <h1 className="text-foreground text-2xl font-bold">Chessalyze</h1>
      </header>

      <main className="p-8">
        <div className="bg-panel mx-auto max-w-[1300px] rounded-lg p-5">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[600px_1fr]">
            <Board selectedGame={selectedGame} />

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
                <AnalysisPanel
                  hasSubmitted={hasSubmitted}
                  onChangeUser={handleChangeUsername}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
