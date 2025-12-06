"use client";

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

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
    setShowModal(false);
    // TODO: Load game and start analysis
    console.log("Selected game:", game);
  };

  const handleChangeUsername = () => {
    setShowModal(true);
    setModalStep("username");
  };

  const handleCancelModal = () => {
    setModalStep("username");
    setShowModal(true);
  };

  return (
    <div className="bg-background min-h-screen">
      <header className="h-[70px] bg-panel border-b border-border flex items-center px-8">
        <h1 className="text-2xl font-bold text-foreground">Chessalyze</h1>
      </header>

      <main className="p-8">
        <div className="max-w-[1400px] mx-auto bg-panel rounded-lg p-5">
          <div className="grid grid-cols-1 lg:grid-cols-[600px_1fr] gap-6">
            <Board />

            <div className="bg-background rounded-lg p-5 relative">
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
