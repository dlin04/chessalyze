import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const res = await request.json();
  const { username } = res;

  try {
    const archiveRes = await fetch(
      `https://api.chess.com/pub/player/${username}/games/archives`
    );
    const archiveData = await archiveRes.json();

    // use .map on frontend to display and send choice back to other route
    // returns something like this
    // "https://api.chess.com/pub/player/magnuscarlsen/games/2017/02",
    // "https://api.chess.com/pub/player/magnuscarlsen/games/2017/03",
    // "https://api.chess.com/pub/player/magnuscarlsen/games/2017/05",
    // "https://api.chess.com/pub/player/magnuscarlsen/games/2017/10",
    // "https://api.chess.com/pub/player/magnuscarlsen/games/2017/11",
    // "https://api.chess.com/pub/player/magnuscarlsen/games/2018/01"
    // allow the option to sort by date
    // dont want to make another api route to fetch the games from that month
    // probably could do it here?
    // the game endpoint is to parse the information and send to the frontend,
    // split up the code
    return NextResponse.json(archiveData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user from Chess.com API" },
      { status: 500 }
    );
  }
}
