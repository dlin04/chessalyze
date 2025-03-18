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
    <form className="flex items-center" onSubmit={handleSubmit}>
      <input
        className="border border-gray-300 rounded-l-xl py-2 px-4 w-full max-w-[400px] focus:outline-none focus:ring-2 focus:ring-lime-500"
        name="username_field"
        type="text"
        placeholder="Chess.com username..."
        value={gameUsername}
        onChange={(e) => setGameUsername(e.target.value)}
      />
      <button
        className="bg-lime-500 border border-gray-300 rounded-r-xl px-4 py-2"
        type="submit"
      >
        Find
      </button>
    </form>
  );
};
