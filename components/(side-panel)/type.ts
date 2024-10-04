export interface Player {
  rating: number;
  result: string;
  username: string;
}

export interface GameModalData {
  url: string;
  white: Player;
  black: Player;
  pgn: string;
}
