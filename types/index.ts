export type ModalStep = "username" | "month" | "game";

export interface Player {
  rating: number;
  result: string;
  "@id": string;
  username: string;
  uuid: string;
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
