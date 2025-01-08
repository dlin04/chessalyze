"use client";
import { GameModal } from "./GamesModal";
import { useState } from "react";
import { Player, GameModalData } from "@/types/ModalTypes";

interface MonthModalProps {
  selectedPlayer: string;
  isOpen: boolean;
  onClose: () => void;
  data: string[];
  onGameSelect: (pgn: string, white: Player, black: Player) => void;
}

export const MonthModal: React.FC<MonthModalProps> = ({
  selectedPlayer,
  isOpen,
  onClose,
  data,
  onGameSelect,
}) => {
  const [isGameModalOpen, setIsGameModalOpen] = useState<boolean>(false);
  const [gameModalData, setGameModalData] = useState<GameModalData[]>([]);

  const handleOpenGameModal = async (item: string) => {
    try {
      const res = await fetch(`/api/archive/game?gamesFromMonthURL=${item}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setGameModalData(data.games.reverse());
      setIsGameModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const closeGameModal = () => {
    setIsGameModalOpen(false);
  };

  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white w-[500px] h-[500px] rounded-lg p-4 overflow-y-auto relative">
          <button
            className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 p-1 rounded-full"
            onClick={onClose}
          >
            &times;
          </button>
          <div>
            <h2 className="text-xl font-bold mb-4">
              Choose games from Month / Year
            </h2>
            <ul className="space-y-2">
              {data.map((item, index) => {
                const urlParts = item.split("/");
                const year = urlParts[7];
                const month = urlParts[8];

                return (
                  <li key={index}>
                    <button onClick={() => handleOpenGameModal(item)}>
                      {month}/{year}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <GameModal
        selectedPlayer={selectedPlayer}
        isOpen={isGameModalOpen}
        onClose={closeGameModal}
        data={gameModalData}
        onGameSelect={onGameSelect}
      />
    </>
  );
};
