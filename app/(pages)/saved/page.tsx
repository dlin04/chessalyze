"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGameContext } from "@/context/GameContext";
import { GameDatabase } from "@/types/Types";

export default function Saved() {
  const { data: session } = useSession();
  const [games, setGames] = useState<GameDatabase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { setGameData } = useGameContext();

  useEffect(() => {
    if (!session?.user?.email) return;
    const fetchGames = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/save/get_all?email=${session.user?.email}`
        );
        const data = await response.json();
        setGames(data.games);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, [session]);

  const handleSelectGame = (game: GameDatabase) => {
    setGameData(
      game.id,
      { rating: game.whiteRating, result: "", username: game.whitePlayer },
      { rating: game.blackRating, result: "", username: game.blackPlayer },
      game.bestMoves,
      game.positions
    );
    router.push("/");
  };

  return (
    <div>
      {session ? (
        <>
          {isLoading ? (
            <div>Loading saved games...</div>
          ) : games.length > 0 ? (
            <>
              <div>
                <span className="w-48 inline-block">White</span>
                <span className="w-24 inline-block">vs</span>
                <span className="w-48 inline-block">Black</span>
              </div>
              <ul>
                {games.map((game) => (
                  <li
                    key={game.id}
                    className="mb-1 text-blue-500 hover:underline cursor-pointer"
                    onClick={() => handleSelectGame(game)}
                  >
                    <span className="w-48 inline-block">
                      {game.whitePlayer} ({game.whiteRating})
                    </span>
                    <span className="w-24 inline-block">vs</span>
                    <span className="w-48 inline-block">
                      {game.blackPlayer} ({game.blackRating})
                    </span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div>No games found.</div>
          )}
        </>
      ) : (
        <div>
          To view previously analyzed games, please consider signing in with
          your Google account. Thank you!
        </div>
      )}
    </div>
  );
}
