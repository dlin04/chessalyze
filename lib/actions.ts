"use server";

import prisma from "./prisma";
import { Player, PositionEvaluation, PlayerMoveStats } from "@/types";

interface StoreAnalysisProps {
  userEmail: string;
  chessComUuid: string;
  analyzedPositions: PositionEvaluation[];
  whitePlayer: Player;
  blackPlayer: Player;
  whitePlayerStats: PlayerMoveStats | null;
  blackPlayerStats: PlayerMoveStats | null;
}

export async function storeAnalysis({
  userEmail,
  chessComUuid,
  analyzedPositions,
  whitePlayer,
  blackPlayer,
  whitePlayerStats,
  blackPlayerStats,
}: StoreAnalysisProps) {
  if (!whitePlayerStats || !blackPlayerStats) return;

  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  if (!user) throw new Error("User not found");

  await prisma.game.create({
    data: {
      userId: user.id,
      chessComUuid: chessComUuid,
      whitePlayerName: whitePlayer.username,
      whitePlayerRating: whitePlayer.rating,
      whiteBest: whitePlayerStats.best,
      whiteGreat: whitePlayerStats.great,
      whiteGood: whitePlayerStats.good,
      whiteInaccuracy: whitePlayerStats.inaccuracy,
      whiteMistake: whitePlayerStats.mistake,
      whiteBlunder: whitePlayerStats.blunder,
      blackPlayerName: blackPlayer.username,
      blackPlayerRating: blackPlayer.rating,
      blackBest: blackPlayerStats.best,
      blackGreat: blackPlayerStats.great,
      blackGood: blackPlayerStats.good,
      blackInaccuracy: blackPlayerStats.inaccuracy,
      blackMistake: blackPlayerStats.mistake,
      blackBlunder: blackPlayerStats.blunder,
      positions: {
        create: analyzedPositions.map((pos) => ({
          moveNumber: pos.moveNumber,
          move: pos.move,
          fen: pos.fen,
          evalType: pos.evaluation.type,
          bestMove: pos.evaluation.bestMove,
          classification: pos.classification || "best",
        })),
      },
    },
  });
}

export async function getStored(userEmail: string) {
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    include: {
      analyzedGames: {
        include: {
          positions: true,
        },
      },
    },
  });

  if (!user) throw new Error("User not found");

  return user.analyzedGames;
}
