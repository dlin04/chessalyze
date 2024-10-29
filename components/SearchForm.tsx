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
      alert("Please fill the username field.");
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

      setMonthModalData(data.archives);
      setIsMonthModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
  );
};
