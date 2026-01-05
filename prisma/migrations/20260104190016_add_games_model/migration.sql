-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "whitePlayer" TEXT NOT NULL,
    "whiteBest" INTEGER NOT NULL,
    "whiteGreat" INTEGER NOT NULL,
    "whiteGood" INTEGER NOT NULL,
    "whiteInaccuracy" INTEGER NOT NULL,
    "whiteMistake" INTEGER NOT NULL,
    "whiteBlunder" INTEGER NOT NULL,
    "blackPlayer" TEXT NOT NULL,
    "blackBest" INTEGER NOT NULL,
    "blackGreat" INTEGER NOT NULL,
    "blackGood" INTEGER NOT NULL,
    "blackInaccuracy" INTEGER NOT NULL,
    "blackMistake" INTEGER NOT NULL,
    "blackBlunder" INTEGER NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Position" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "moveNumber" INTEGER NOT NULL,
    "move" TEXT,
    "fen" TEXT NOT NULL,
    "evalType" TEXT NOT NULL,
    "bestMove" TEXT NOT NULL,
    "classification" TEXT NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
