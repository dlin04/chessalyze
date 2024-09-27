"use client";

import { useState, FormEvent } from "react";

export const MoveList = () => {
  const [gameUsername, setGameUsername] = useState<string>("");

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

      console.log(data);
    } catch (error) {
      console.error(error);
    }
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
    </>
  );
};
