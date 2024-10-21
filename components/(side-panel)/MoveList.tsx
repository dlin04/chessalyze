import { Chess } from "chess.js";
import { useState, FormEvent, useEffect } from "react";
import { MonthModal } from "./MonthModal";

export const MoveList = () => {
  const [gameUsername, setGameUsername] = useState<string>("");
  const [isMonthModalOpen, setIsMonthModalOpen] = useState<boolean>(false);
  const [monthModalData, setMonthModalData] = useState<string[]>([]);
  const [selectedGamePGN, setSelectedGamePGN] = useState<string>("");
  const [allStockfishRes, setAllStockfishRes] = useState<string[]>([]);
  const [positionsCount, setPositionsCount] = useState<number>(0);
  const [responsesCount, setResponsesCount] = useState<number>(0);
  const [analysisComplete, setAnalysisComplete] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (gameUsername.trim() === "") {
      alert("Please fill the username field.");
    }

    try {
      const res = await fetch(
        `/api/archive/month?gameUsername=${gameUsername}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data.message === "Username not found") {
        alert("Player with that username does not exist on Chess.com");
        return;
      }
      if (data.message === "Empty archives") {
        alert("Player has no recorded games on Chess.com");
        return;
      }

      setMonthModalData(data.archives);
      setIsMonthModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const closeMonthModal = () => {
    setIsMonthModalOpen(false);
  };

  const handleGameSelection = (pgn: string) => {
    setSelectedGamePGN(pgn);
    setIsMonthModalOpen(false);
  };

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

        setSelectedGamePGN(chess.pgn());
        setPositionsCount(allPositions.length);
        setResponsesCount(0);
        setAnalysisComplete(false);

        for (const position of allPositions) {
          try {
            const res = await fetch(`/api/stockfish?fenPosition=${position}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
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

  const formatPGN = (pgn: string) => {
    console.log(allStockfishRes);
    const moves = pgn
      .trim()
      .split(/\d+\.\s+/)
      .slice(1);
    return moves.map((move, index) => (
      <p key={index}>
        {index + 1}. {move.trim()}
      </p>
    ));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="username_field"
          type="text"
          placeholder="Chess.com username..."
          value={gameUsername}
          onChange={(e) => setGameUsername(e.target.value)}
        />
        <button type="submit">Find Games</button>
      </form>

      {selectedGamePGN && <div>{formatPGN(selectedGamePGN)}</div>}

      <MonthModal
        selectedPlayer={gameUsername}
        isOpen={isMonthModalOpen}
        onClose={closeMonthModal}
        data={monthModalData}
        onGameSelect={handleGameSelection}
      />

      {analysisComplete}
    </>
  );
};
