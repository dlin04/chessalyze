/*
  Warnings:

  - A unique constraint covering the columns `[chessComUuid]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chessComUuid` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "chessComUuid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Game_chessComUuid_key" ON "Game"("chessComUuid");
