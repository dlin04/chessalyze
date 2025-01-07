import { FormEvent } from "react";

interface SearchFormProps {
  gameUsername: string;
  setGameUsername: (username: string) => void;
  setMonthModalData: (data: string[]) => void;
  setIsMonthModalOpen: (isOpen: boolean) => void;
}

export const SearchForm = ({
  gameUsername,
  setGameUsername,
  setMonthModalData,
  setIsMonthModalOpen,
}: SearchFormProps) => {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (gameUsername.trim() === "") {
      return;
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

      setMonthModalData(data.archives.reverse());
      setIsMonthModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        className="border border-gray-300 rounded-lg py-1 px-2"
        name="username_field"
        type="text"
        placeholder="Chess.com username..."
        value={gameUsername}
        onChange={(e) => setGameUsername(e.target.value)}
      />
      <button className="bg-lime-500 rounded py-1 px-2" type="submit">
        Find Games
      </button>
    </form>
  );
};
