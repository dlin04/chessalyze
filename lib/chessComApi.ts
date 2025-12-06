export async function getPlayedMonths(username: string) {
  const res = await fetch(
    `https://api.chess.com/pub/player/${username}/games/archives`
  );
  return res.json();
}

export async function getMonthGames(url: string) {
  const res = await fetch(url);
  return res.json();
}
