/*
  Warnings:

  - You are about to drop the column `blackPlayer` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `whitePlayer` on the `Game` table. All the data in the column will be lost.
  - Added the required column `blackPlayerName` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blackPlayerRating` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whitePlayerName` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whitePlayerRating` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "blackPlayer",
DROP COLUMN "whitePlayer",
ADD COLUMN     "blackPlayerName" TEXT NOT NULL,
ADD COLUMN     "blackPlayerRating" INTEGER NOT NULL,
ADD COLUMN     "whitePlayerName" TEXT NOT NULL,
ADD COLUMN     "whitePlayerRating" INTEGER NOT NULL;
