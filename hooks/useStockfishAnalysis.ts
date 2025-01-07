import { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { useSession } from "next-auth/react";

interface StockfishType {
  success: boolean;
  evaluation: number;
  mate: number | null;
  bestmove: string;
  continuation: string | null;
}

export const useStockfishAnalysis = (selectedGamePGN: string) => {
  const { data: session } = useSession();

  const [allStockfishRes, setAllStockfishRes] = useState<StockfishType[]>([]);
  const [allPositions, setAllPositions] = useState<string[]>([]);
  const [positionsCount, setPositionsCount] = useState<number>(0);
  const [responsesCount, setResponsesCount] = useState<number>(0);
  const [analysisComplete, setAnalysisComplete] = useState<boolean>(false);
  const [PGN, setPGN] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (selectedGamePGN) {
      const fetchStockfishRes = async () => {
        setIsLoading(true);
        setPGN([]);
        setAllStockfishRes([]);
        setAllPositions([]);
        setAnalysisComplete(false);

        const chess = new Chess();
        const allPositions: string[] = [];
        allPositions.push(chess.fen());

        chess.loadPgn(selectedGamePGN);
        const moves = chess.history();

        chess.reset();
        moves.forEach((move) => {
          setPGN((prevMoves) => [...prevMoves, move]);
          chess.move(move);
          allPositions.push(chess.fen());
        });

        setAllPositions(allPositions);
        setPositionsCount(allPositions.length);
        setResponsesCount(0);

        for (const position of allPositions) {
          try {
            const res = await fetch(`/api/stockfish?fenPosition=${position}`);
            const data = await res.json();
            setAllStockfishRes((prevRes) => [...prevRes, data]);
            setResponsesCount((prevCount) => prevCount + 1);
          } catch (error) {
            console.error(error);
          }
        }
        setIsLoading(false);
      };
      fetchStockfishRes();
    }
  }, [selectedGamePGN]);

  useEffect(() => {
    if (positionsCount > 0 && responsesCount === positionsCount) {
      setAnalysisComplete(true);
    }
  }, [responsesCount, positionsCount]);

  return { isLoading, analysisComplete, allPositions, allStockfishRes, PGN };
};
