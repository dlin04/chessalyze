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
  bestMoveSan?: string;
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
