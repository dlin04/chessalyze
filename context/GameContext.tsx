"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Player, BestMove } from "@/types/Types";

type GameContextType = {
  uuid: string;
  whitePlayer: Player | null;
  blackPlayer: Player | null;
  bestMoves: BestMove[];
  positions: string[];
  setGameData: (
    uuid: string,
    white: Player,
    black: Player,
    bestMoves: BestMove[],
    positions: string[]
  ) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [uuid, setUUID] = useState("");
  const [whitePlayer, setWhitePlayer] = useState<Player | null>(null);
  const [blackPlayer, setBlackPlayer] = useState<Player | null>(null);
  const [bestMoves, setBestMoves] = useState<BestMove[]>([]);
  const [positions, setPositions] = useState<string[]>([]);

  const setGameData = (
    uuid: string,
    white: Player,
    black: Player,
    bestMoves: BestMove[],
    positions: string[]
  ) => {
    setUUID(uuid);
    setWhitePlayer(white);
    setBlackPlayer(black);
    setBestMoves(bestMoves);
    setPositions(positions);
  };

  return (
    <GameContext.Provider
      value={{
        uuid,
        whitePlayer,
        blackPlayer,
        bestMoves,
        positions,
        setGameData,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context)
    throw new Error("useGameContext must be used within GameProvider");
  return context;
};
