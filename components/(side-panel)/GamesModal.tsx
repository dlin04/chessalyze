"use client";

import { GameModalData } from "./type";

interface GamesModalProps {
  selectedPlayer: string;
  isOpen: boolean;
  onClose: () => void;
  data: GameModalData[];
  onGameSelect: (pgn: string) => void;
}

export const GameModal: React.FC<GamesModalProps> = ({
  selectedPlayer,
  isOpen,
  onClose,
  data,
  onGameSelect,
}) => {
  if (!isOpen) return null;

  const handleSelectGame = (game: GameModalData) => {
    // onGameSelect(game.pgn.split("\n")[22]);
    onGameSelect("1. e4 e5 2. Bc4 Nc6 3. Qh5 Nf6 4. Qxf7#");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-[700px] h-[700px] rounded-lg p-4 overflow-y-auto relative">
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
                    <button onClick={() => handleSelectGame(item)}>
                      {whitePlayer} (white, {item.white.rating}) vs.
                      {blackPlayer} (black, {item.black.rating})
                    </button>
                  </li>
                );
              } else {
                return (
                  <li key={index}>
                    <button onClick={() => handleSelectGame(item)}>
                      {blackPlayer} (black, {item.black.rating}) vs.
                      {whitePlayer} (white, {item.white.rating})
                    </button>
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
