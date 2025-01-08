"use client";
import { GameModalData } from "@/types/ModalTypes";
import { Player } from "@/types/ModalTypes";

interface GamesModalProps {
  selectedPlayer: string;
  isOpen: boolean;
  onClose: () => void;
  data: GameModalData[];
  onGameSelect: (pgn: string, white: Player, black: Player) => void;
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
    const whitePlayer: Player = {
      rating: game.white.rating,
      result: game.white.result,
      username: game.white.username,
    };

    const blackPlayer: Player = {
      rating: game.black.rating,
      result: game.black.result,
      username: game.black.username,
    };

    onGameSelect(game.pgn.split("\n")[22], whitePlayer, blackPlayer);
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
          <h2 className="text-xl font-bold mb-4">Games from </h2>
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
