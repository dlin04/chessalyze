"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

interface Game {
  id: string;
  whitePlayer: string;
  whiteRating: number;
  blackPlayer: string;
  blackRating: number;
}

export default function Saved() {
  const { data: session } = useSession();
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    if (!session?.user?.email) return;
    const fetchGames = async () => {
      try {
        const response = await fetch(
          `/api/save/get?email=${session.user?.email}`
        );
        const data = await response.json();
        setGames(data.games);
        // console.log(games); // doesnt happen immediately
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, [session]);

  return (
    <div>
      {session ? (
        <>
          {games.length > 0 && (
            <div>
              <span className="w-48 inline-block">White</span>
              <span className="w-24 inline-block">vs</span>
              <span className="w-48 inline-block">Black</span>
              <span className="ml-10 w-24 inline-block">Result</span>
            </div>
          )}
          <ul>
            {games.length > 0 ? (
              games.map((game) => (
                <li key={game.id} className="mb-1">
                  <span className="w-48 inline-block">
                    {game.whitePlayer} ({game.whiteRating})
                  </span>
                  <span className="w-24 inline-block">vs</span>
                  <span className="w-48 inline-block">
                    {game.blackPlayer} ({game.blackRating})
                  </span>
                </li>
              ))
            ) : (
              <li>No games found.</li>
            )}
          </ul>
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
