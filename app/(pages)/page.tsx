"use client";
import { Chessboard } from "react-chessboard";
import { useState } from "react";
import { SearchForm } from "@/components/SearchForm";
import { MonthModal } from "@/components/(modals)/MonthModal";
import { LoadingModal } from "@/components/(modals)/LoadingModal";
import { ToolBar } from "@/components/ToolBar";
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

  const getPlayedMove = () => {
    if (PGN[currentPosition]) {
      return PGN[currentPosition];
    }
    return null;
  };

  const getBestMove = () => {
    if (allStockfishRes[currentPosition]) {
      return allStockfishRes[currentPosition].bestmove;
    }
    return null;
  };

  const getEvaluation = () => {
    if (allStockfishRes[currentPosition]) {
      return allStockfishRes[currentPosition].evaluation;
    }
    return null;
  };

  return (
    <>
      <div className="flex justify-center gap-4 mt-10">
        <div className="flex flex-col items-center">
          <div className="flex flex-col w-full max-w-[500px]">
            {orientation === "white" ? (
              <>
                <div className="bg-black p-2 text-left text-white">
                  Black Player: {blackPlayer?.username} {blackPlayer?.rating}
                </div>
              </>
            ) : (
              <>
                <div className="bg-white p-2 text-left text-black">
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

          <div className="flex flex-col w-full max-w-[500px]">
            {orientation === "white" ? (
              <>
                <div className="bg-white p-2 text-left text-black">
                  White Player: {whitePlayer?.username} {whitePlayer?.rating}
                </div>
              </>
            ) : (
              <>
                <div className="bg-black p-2 text-left text-white">
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
              <ToolBar
                onSwap={toggleBoardOrientation}
                onFirst={() => setCurrentPosition(0)}
                onPrev={prevPosition}
                onNext={nextPosition}
                onLast={() => setCurrentPosition(allPositions.length - 1)}
              />
              <div className="mt-4 w-full text-left">
                <div className="flex items-center ml-1">
                  <span className="w-28 font-semibold">Played Move</span>
                  <h3 className="flex-1">{getPlayedMove()}</h3>
                </div>
                <div className="flex items-center ml-1">
                  <span className="w-28 font-semibold">Best Move</span>
                  <h3 className="flex-1">{getBestMove()}</h3>
                </div>
                <div className="flex items-center ml-1">
                  <span className="w-28 font-semibold">Evaluation</span>
                  <h3 className="flex-1">{getEvaluation()}</h3>
                </div>
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
