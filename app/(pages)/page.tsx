"use client";
import { Chessboard } from "react-chessboard";
import { useState } from "react";
import { SearchForm } from "@/components/SearchForm";
import { MonthModal } from "@/components/(modals)/MonthModal";
import { LoadingModal } from "@/components/(modals)/LoadingModal";
import { useStockfishAnalysis } from "@/hooks/useStockfishAnalysis";
import { Player } from "@/types/ModalTypes";

export default function Home() {
  const [gameUsername, setGameUsername] = useState<string>("");
  const [monthModalData, setMonthModalData] = useState<string[]>([]);
  const [isMonthModalOpen, setIsMonthModalOpen] = useState<boolean>(false);

  const [uuid, setUUID] = useState<string>("");
  const [selectedGamePGN, setSelectedGamePGN] = useState<string>("");
  const [whitePlayer, setWhitePlayer] = useState<Player | null>(null);
  const [blackPlayer, setBlackPlayer] = useState<Player | null>(null);

  const [currentPosition, setCurrentPosition] = useState(0);
  const [orientation, setOrientation] = useState<"white" | "black">("white");

  const { isLoading, analysisComplete, allPositions, allStockfishRes, PGN } =
    useStockfishAnalysis(uuid, selectedGamePGN, whitePlayer, blackPlayer);

  const handleGameSelection = (
    uuid: string,
    selectPGN: string,
    white: Player,
    black: Player
  ) => {
    setUUID(uuid);
    setSelectedGamePGN(selectPGN);
    setWhitePlayer(white);
    setBlackPlayer(black);
    setIsMonthModalOpen(false);
  };

  const closeMonthModal = () => {
    setIsMonthModalOpen(false);
  };

  const toggleBoardOrientation = () => {
    setOrientation((prevOrientation) =>
      prevOrientation === "white" ? "black" : "white"
    );
  };
  const prevPosition = () => {
    if (currentPosition > 0 && analysisComplete) {
      setCurrentPosition((prevIndex) => prevIndex - 1);
    }
  };
  const nextPosition = () => {
    if (currentPosition < allPositions.length - 1 && analysisComplete) {
      setCurrentPosition((prevIndex) => prevIndex + 1);
    }
  };

  const getBestMove = () => {
    if (allStockfishRes[currentPosition]) {
      return allStockfishRes[currentPosition].bestmove;
    }
    return null;
  };

  const getPlayedMove = () => {
    if (PGN[currentPosition]) {
      return PGN[currentPosition];
    }
    return null;
  };

  return (
    <>
      <div className="flex justify-center gap-4 mt-10">
        <div className="flex flex-col items-center">
          <div className="flex flex-col mb-4">
            {orientation === "white" ? (
              <>
                <div>
                  Black Player: {blackPlayer?.username} {blackPlayer?.rating}
                </div>
              </>
            ) : (
              <>
                <div>
                  White Player: {whitePlayer?.username} {whitePlayer?.rating}
                </div>
              </>
            )}
          </div>

          <div className="w-[500px] h-[500px]">
            <Chessboard
              id="BasicBoard"
              arePiecesDraggable={false}
              position={allPositions[currentPosition] || "start"}
              boardOrientation={orientation}
            />
          </div>

          <div className="flex flex-col mt-4">
            {orientation === "white" ? (
              <>
                <div>
                  White Player: {whitePlayer?.username} {whitePlayer?.rating}
                </div>
              </>
            ) : (
              <>
                <div>
                  Black Player: {blackPlayer?.username} {blackPlayer?.rating}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 mt-10">
          <SearchForm
            gameUsername={gameUsername}
            setGameUsername={setGameUsername}
            setMonthModalData={setMonthModalData}
            setIsMonthModalOpen={setIsMonthModalOpen}
          />

          {analysisComplete && (
            <>
              <div className="flex gap-4">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                  onClick={toggleBoardOrientation}
                >
                  Switch
                </button>
                <button
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                  onClick={prevPosition}
                >
                  Prev
                </button>
                <button
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                  onClick={nextPosition}
                >
                  Next
                </button>
              </div>

              <div className="mt-4">
                <h3>Best Move: {getBestMove()}</h3>
                <h3>Played Move: {getPlayedMove()}</h3>
              </div>
            </>
          )}
        </div>
      </div>

      <MonthModal
        selectedPlayer={gameUsername}
        isOpen={isMonthModalOpen}
        onClose={closeMonthModal}
        data={monthModalData}
        onGameSelect={handleGameSelection}
      />
      <LoadingModal isOpen={isLoading} />
    </>
  );
}
