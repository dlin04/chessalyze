"use client";
import { Chessboard } from "react-chessboard";
import { useState } from "react";
import { SearchForm } from "@/components/SearchForm";
import { MonthModal } from "@/components/(modals)/MonthModal";
import { LoadingModal } from "@/components/(modals)/LoadingModal"; // Import the LoadingModal
import { useStockfishAnalysis } from "@/hooks/useStockfishAnalysis";

export default function Home() {
  const [gameUsername, setGameUsername] = useState<string>("");
  const [monthModalData, setMonthModalData] = useState<string[]>([]);
  const [isMonthModalOpen, setIsMonthModalOpen] = useState<boolean>(false);
  const [selectedGamePGN, setSelectedGamePGN] = useState<string>("");

  const { isLoading, analysisComplete, allStockfishRes, PGN } =
    useStockfishAnalysis(selectedGamePGN);

  const handleGameSelection = (selectPGN: string) => {
    setSelectedGamePGN(selectPGN);
    setIsMonthModalOpen(false);
  };

  const closeMonthModal = () => {
    setIsMonthModalOpen(false);
  };

  return (
    <>
      <div className="w-[500px] h-[500px]">
        <Chessboard id="BasicBoard" arePiecesDraggable={false} />
      </div>
      <SearchForm
        gameUsername={gameUsername}
        setGameUsername={setGameUsername}
        setMonthModalData={setMonthModalData}
        setIsMonthModalOpen={setIsMonthModalOpen}
      />
      <MonthModal
        selectedPlayer={gameUsername}
        isOpen={isMonthModalOpen}
        onClose={closeMonthModal}
        data={monthModalData}
        onGameSelect={handleGameSelection}
      />
      <LoadingModal isOpen={isLoading} />
      {analysisComplete && (
        <>
          <div>Analysis complete!</div>
          <div>{PGN}</div>
          <br></br>
          <div>
            {allStockfishRes.map((res, index) => (
              <div key={index}>
                <p>Evaluation: {res.evaluation}</p>
                <p>Best Move: {res.bestmove}</p>
                <p>Continuation: {res.continuation}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
