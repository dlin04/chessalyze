import { useState, useEffect } from "react";
import { Chess } from "chess.js";

export const useStockfishAnalysis = (selectedGamePGN: string) => {
  const [allStockfishRes, setAllStockfishRes] = useState<string[]>([]);
  const [positionsCount, setPositionsCount] = useState<number>(0);
  const [responsesCount, setResponsesCount] = useState<number>(0);
  const [analysisComplete, setAnalysisComplete] = useState<boolean>(false);
  const [PGN, setPGN] = useState<string>(selectedGamePGN);

  useEffect(() => {
    if (selectedGamePGN) {
      const fetchStockfishRes = async () => {
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
        setAnalysisComplete(false);

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
      };

      fetchStockfishRes();
    }
  }, [selectedGamePGN]);

  useEffect(() => {
    if (positionsCount > 0 && responsesCount === positionsCount) {
      setAnalysisComplete(true);
    }
  }, [responsesCount, positionsCount]);

  return { allStockfishRes, analysisComplete, PGN };
};
