import { useState, useEffect } from "react";
import { Chess } from "chess.js";

interface StockfishType {
  evaluation: number;
  bestmove: string;
  continuation: string;
}

export const useStockfishAnalysis = (selectedGamePGN: string) => {
  const [allStockfishRes, setAllStockfishRes] = useState<StockfishType[]>([]);
  const [positionsCount, setPositionsCount] = useState<number>(0);
  const [responsesCount, setResponsesCount] = useState<number>(0);
  const [analysisComplete, setAnalysisComplete] = useState<boolean>(false);
  const [PGN, setPGN] = useState<string>(selectedGamePGN);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (selectedGamePGN) {
      const fetchStockfishRes = async () => {
        setIsLoading(true);
        setPGN("");
        setAllStockfishRes([]);
        setAnalysisComplete(false);

        const chess = new Chess();
        const allPositions: string[] = [];

        chess.loadPgn(selectedGamePGN);
        const moves = chess.history();
        const lastMoveIndex = moves.length - 1;

        chess.reset();
        moves.forEach((move, index) => {
          chess.move(move);
          allPositions.push(chess.fen());

          if (
            index === lastMoveIndex &&
            (chess.isCheckmate() ||
              chess.isDraw() ||
              chess.isInsufficientMaterial() ||
              chess.isStalemate() ||
              chess.isThreefoldRepetition())
          ) {
            allPositions.pop();
          }
        });

        setPGN(chess.pgn());
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

  return { isLoading, analysisComplete, allStockfishRes, PGN };
};
