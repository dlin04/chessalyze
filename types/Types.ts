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

export interface BestMove {
  mate: number | null;
  success: boolean;
  bestmove: string;
  evaluation: number;
  continuation: string | null;
}

export interface GameDatabase {
  id: string;
  whitePlayer: string;
  whiteRating: number;
  blackPlayer: string;
  blackRating: number;
  bestMoves: BestMove[];
  positions: string[];
}
