# Chessalyze

## Stockfish Integration Overview

Chessalyze uses the Stockfish chess engine (running in a Web Worker) to analyze every position in a user's game. The integration works as follows:

1. **Game Selection**: The user selects a game (PGN) from their Chess.com archive.
2. **Position Extraction**: The app uses `chess.js` to replay the game move by move, generating the FEN (Forsyth-Edwards Notation) for each position.
3. **Engine Evaluation**: For each position, the FEN is sent to Stockfish via a Web Worker. The engine is asked to analyze the position to a fixed depth (default: 15 plies).
4. **Result Parsing**: Stockfish returns an evaluation for each position, including:
   - **Type**: `cp` (centipawn) or `mate` (forced mate in N moves)
   - **Value**: Numeric score (see below)
   - **Depth**: How deep the engine searched
   - **Best Move**: The move Stockfish recommends
5. **Move Comparison**: The user's move is compared to Stockfish's best move. The difference in evaluation ("centipawn loss") is used to classify the move.
6. **Progress Tracking**: The UI shows progress as each move is analyzed, with a progress bar and move counter.

## What is a Centipawn (cp)?

- **Centipawn** is 1/100th of a pawn. Stockfish evaluates positions in centipawns.
- **+100 cp** means White is up by 1 pawn; **-50 cp** means Black is up by half a pawn.
- **Mate scores**: If Stockfish finds a forced mate, it returns `type: "mate"` and `value: N` (mate in N moves).
- For move classification, mate scores are treated as ±10,000 cp (very decisive).

## Move Classification Logic

Each move is classified based on the centipawn loss compared to Stockfish's best move:

| Classification | Centipawn Loss (cp)      |
| -------------- | ------------------------ |
| Best           | matches stockfish output |
| Great          | ≤ 20                     |
| Good           | ≤ 50                     |
| Inaccuracy     | ≤ 100                    |
| Mistake        | ≤ 300                    |
| Blunder        | > 300                    |

- **Best**: User played the engine's top move.
- **Great/Good**: User's move is nearly as strong as the best move.
- **Inaccuracy**: Small but non-trivial mistake.
- **Mistake**: Significant error, but not losing.
- **Blunder**: Major error, likely losing the game.

---

For more details, see the code in `lib/analyze.ts` and `lib/stockfish.ts`.
