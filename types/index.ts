export type AnalysisTab = "analysis" | "moves";
export type ModalStep = "username" | "month" | "game";
export type MoveClassification =
  | "best"
  | "great"
  | "good"
  | "inaccuracy"
  | "mistake"
  | "blunder";

export interface Player {
  rating: number;
  result: string;
  "@id": string;
  username: string;
  uuid: string;
}

export interface PlayerMoveStats {
  best: number;
  great: number;
  good: number;
  inaccuracy: number;
  mistake: number;
  blunder: number;
}

export interface StockfishEvaluation {
  type: "cp" | "mate";
  value: number;
  bestMove: string;
}

export interface PositionEvaluation {
  moveNumber: number;
  move: string | null;
  fen: string;
  evaluation: StockfishEvaluation;
  bestMoveSan: string;
  classification?: MoveClassification;
}

export interface Game {
  url: string;
  pgn: string;
  time_control: string;
  end_time: number;
  rated: boolean;
  tcn: string;
  uuid: string;
  initial_setup: string;
  fen: string;
  time_class: string;
  rules: string;
  white: Player;
  black: Player;
  eco: string;
}

export interface StoredPosition {
  id: string;
  moveNumber: number;
  move: string | null;
  fen: string;
  evalType: string;
  evalValue: number;
  bestMove: string;
  classification: string;
}

export interface StoredGame {
  id: string;
  chessComUuid: string;
  whitePlayerName: string;
  whitePlayerRating: number;
  whiteBest: number;
  whiteGreat: number;
  whiteGood: number;
  whiteInaccuracy: number;
  whiteMistake: number;
  whiteBlunder: number;
  blackPlayerName: string;
  blackPlayerRating: number;
  blackBest: number;
  blackGreat: number;
  blackGood: number;
  blackInaccuracy: number;
  blackMistake: number;
  blackBlunder: number;
  result: string;
  positions: StoredPosition[];
  userId?: string | null;
}
