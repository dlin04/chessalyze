export interface Player {
  rating: number;
  result: string;
  username: string;
}

export interface GameModalData {
  uuid: string;
  white: Player;
  black: Player;
  pgn: string;
}
