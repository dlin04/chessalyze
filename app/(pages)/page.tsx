"use client";
import { Chessboard } from "react-chessboard";
import { useState } from "react";
import { SearchForm } from "@/components/SearchForm";
import { MonthModal } from "@/components/(modals)/MonthModal";
import { useStockfishAnalysis } from "@/hooks/useStockfishAnalysis";

export default function Home() {
  const [gameUsername, setGameUsername] = useState<string>("");
  const [isMonthModalOpen, setIsMonthModalOpen] = useState<boolean>(false);
  const [monthModalData, setMonthModalData] = useState<string[]>([]);
  const [selectedGamePGN, setSelectedGamePGN] = useState<string>("");

  const { allStockfishRes, analysisComplete, PGN } =
    useStockfishAnalysis(selectedGamePGN);

  const handleGameSelection = (pgn: string) => {
    setSelectedGamePGN(pgn);
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

      {analysisComplete && (
        <>
          <div>Analysis complete!</div>
          <div>{PGN}</div>
          <div>{allStockfishRes}</div>
        </>
      )}
    </>
  );
}
