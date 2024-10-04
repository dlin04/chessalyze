import { useState, FormEvent } from "react";
import { MonthModal } from "./MonthModal";

export const MoveList = () => {
  const [gameUsername, setGameUsername] = useState<string>("");
  const [isMonthModalOpen, setIsMonthModalOpen] = useState<boolean>(false);
  const [monthModalData, setMonthModalData] = useState<string[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

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
      setMonthModalData(data.archives);
      setIsMonthModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const closeMonthModal = () => {
    setIsMonthModalOpen(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Chess.com username..."
          value={gameUsername}
          onChange={(e) => setGameUsername(e.target.value)}
        />
        <button type="submit">Find Games</button>
      </form>

      <MonthModal
        selectedPlayer={gameUsername}
        isOpen={isMonthModalOpen}
        onClose={closeMonthModal}
        data={monthModalData}
      />
    </>
  );
};
