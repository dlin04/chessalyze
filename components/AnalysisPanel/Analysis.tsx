"use client";

import Image from "next/image";
import { Game, PositionEvaluation, PlayerMoveStats } from "@/types";
import Best from "@/public/moveClassifications/best.png";
import Great from "@/public/moveClassifications/great.png";
import Good from "@/public/moveClassifications/good.png";
import Inaccuracy from "@/public/moveClassifications/inaccuracy.png";
import Mistake from "@/public/moveClassifications/mistake.png";
import Blunder from "@/public/moveClassifications/blunder.png";

interface AnalysisProps {
  selectedGame: Game;
  currentMoveIndex: number;
  analyzedPositions: PositionEvaluation[];
  whitePlayerStats: PlayerMoveStats | null;
  blackPlayerStats: PlayerMoveStats | null;
}

export default function Analysis({
  selectedGame,
  currentMoveIndex,
  analyzedPositions,
  whitePlayerStats,
  blackPlayerStats,
}: AnalysisProps) {
  return (
    <>
      <div className="mb-6">
        <h3 className="text-foreground mb-2 text-sm font-semibold">
          Engine Evaluation
        </h3>
        <div className="relative flex h-10 items-center overflow-hidden rounded bg-black">
          <div className="h-full bg-white" style={{ width: "50%" }}></div>
          <span className="text-foreground absolute inset-0 flex items-center justify-center font-semibold mix-blend-difference"></span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-foreground mb-2 text-sm font-semibold">
          Current Move
        </h3>
        <div className="bg-card flex items-center justify-between rounded p-4">
          <div className="flex items-center gap-3">
            <p className="text-foreground text-sm font-medium">
              {currentMoveIndex === 0
                ? "Starting Position"
                : `${Math.floor((currentMoveIndex + 1) / 2)}${
                    currentMoveIndex % 2 === 1 ? "." : ". ..."
                  } ${analyzedPositions[currentMoveIndex].move}`}
            </p>
          </div>
          {currentMoveIndex !== 0 && (
            <span className="text-sm font-medium">Change in Engine</span>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-foreground mb-2 text-sm font-semibold">
          Best Move
        </h3>
        <div className="bg-card flex items-center gap-2 rounded p-4">
          <Image src={Best} alt="Best move icon" width={24} height={24} />{" "}
          {analyzedPositions[currentMoveIndex - 1]?.bestMoveSan}
        </div>
      </div>

      <div>
        <h3 className="text-foreground mb-2 text-sm font-semibold">
          Mistakes Overview
        </h3>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="bg-card rounded p-4">
            <div className="border-interactive mb-3 flex items-center gap-2 border-b pb-2">
              <div className="h-5 w-5 rounded-full bg-white"></div>
              <span className="text-foreground text-xs font-semibold">
                {selectedGame.white.username}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={Best}
                    alt="Best move icon"
                    width={20}
                    height={20}
                  />
                  <span className="text-foreground text-xs">Best</span>
                </div>
                <span className="text-muted text-xs">
                  {whitePlayerStats?.best}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={Great}
                    alt="Great move icon"
                    width={20}
                    height={20}
                  />
                  <span className="text-foreground text-xs">Great</span>
                </div>
                <span className="text-muted text-xs">
                  {whitePlayerStats?.great}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={Good}
                    alt="Good move icon"
                    width={20}
                    height={20}
                  />
                  <span className="text-foreground text-xs">Good</span>
                </div>
                <span className="text-muted text-xs">
                  {whitePlayerStats?.good}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={Inaccuracy}
                    alt="Inaccurate move icon"
                    width={20}
                    height={20}
                  />
                  <span className="text-foreground text-xs">Inaccuracy</span>
                </div>
                <span className="text-muted text-xs">
                  {whitePlayerStats?.inaccuracy}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={Mistake}
                    alt="Mistake icon"
                    width={20}
                    height={20}
                  />
                  <span className="text-foreground text-xs">Mistake</span>
                </div>
                <span className="text-muted text-xs">
                  {whitePlayerStats?.mistake}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={Blunder}
                    alt="Blunder icon"
                    width={20}
                    height={20}
                  />
                  <span className="text-foreground text-xs">Blunder</span>
                </div>
                <span className="text-muted text-xs">
                  {whitePlayerStats?.blunder}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-card rounded p-4">
            <div className="border-interactive mb-3 flex items-center gap-2 border-b pb-2">
              <div className="h-5 w-5 rounded-full bg-black"></div>
              <span className="text-foreground text-xs font-semibold">
                {selectedGame.black.username}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={Best}
                    alt="Best move icon"
                    width={20}
                    height={20}
                  />
                  <span className="text-foreground text-xs">Best</span>
                </div>
                <span className="text-muted text-xs">
                  {blackPlayerStats?.best}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={Great}
                    alt="Great move icon"
                    width={20}
                    height={20}
                  />
                  <span className="text-foreground text-xs">Great</span>
                </div>
                <span className="text-muted text-xs">
                  {blackPlayerStats?.great}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={Good}
                    alt="Good move icon"
                    width={20}
                    height={20}
                  />
                  <span className="text-foreground text-xs">Good</span>
                </div>
                <span className="text-muted text-xs">
                  {blackPlayerStats?.good}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={Inaccuracy}
                    alt="Inaccurate move icon"
                    width={20}
                    height={20}
                  />
                  <span className="text-foreground text-xs">Inaccuracy</span>
                </div>
                <span className="text-muted text-xs">
                  {blackPlayerStats?.inaccuracy}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={Mistake}
                    alt="Mistake icon"
                    width={20}
                    height={20}
                  />
                  <span className="text-foreground text-xs">Mistake</span>
                </div>
                <span className="text-muted text-xs">
                  {blackPlayerStats?.mistake}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={Blunder}
                    alt="Blunder icon"
                    width={20}
                    height={20}
                  />
                  <span className="text-foreground text-xs">Blunder</span>
                </div>
                <span className="text-muted text-xs">
                  {blackPlayerStats?.blunder}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
