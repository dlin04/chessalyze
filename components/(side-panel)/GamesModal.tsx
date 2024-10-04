"use client";

import { GameModalData } from "./type";

interface GamesModalProps {
  selectedPlayer: string;
  isOpen: boolean;
  onClose: () => void;
  data: GameModalData[];
}

export const GameModal: React.FC<GamesModalProps> = ({
  selectedPlayer,
  isOpen,
  onClose,
  data,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-[500px] h-[500px] rounded-lg p-4 overflow-y-auto relative">
        <button
          className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 p-1 rounded-full"
          onClick={onClose}
        >
          &times;
        </button>
        <div>
          <h2 className="text-xl font-bold mb-4">Game Modal Content</h2>
          <ul className="space-y-2">
            {data.map((item, index) => {
              const whitePlayer = item.white.username;
              const blackPlayer = item.black.username;

              if (whitePlayer.toLowerCase() == selectedPlayer) {
                return (
                  <li key={index}>
                    {whitePlayer} (white) vs. {blackPlayer} (black)
                  </li>
                );
              } else {
                return (
                  <li key={index}>
                    {blackPlayer} (black) vs. {whitePlayer} (white)
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
