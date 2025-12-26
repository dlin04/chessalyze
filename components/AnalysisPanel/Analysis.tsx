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
  function getEvalPercent(
    evaluation: PositionEvaluation["evaluation"] | undefined,
  ) {
    if (!evaluation) return 50;
    let cp = 0;
    if (evaluation.type === "cp") {
      cp = evaluation.value;
    } else if (evaluation.type === "mate") {
      cp = evaluation.value > 0 ? 10000 : -10000;
    }

    const clamped = Math.max(-1000, Math.min(1000, cp));
    return Math.round(((clamped + 1000) / 2000) * 100);
  }

  const evalIndex = currentMoveIndex === 0 ? 0 : currentMoveIndex - 1;
  const isStartingPosition = currentMoveIndex === 0;
  const currentEval = analyzedPositions[evalIndex]?.evaluation;
  const evalPercent = isStartingPosition ? 50 : getEvalPercent(currentEval);
  let evalLabel = "";
  let evalLabelSide: "left" | "right" | null = null;
  let evalLabelColor = "text-black";
  if (!isStartingPosition && currentEval) {
    if (currentEval.type === "cp") {
      const cp = currentEval.value;
      evalLabel = (cp / 100).toFixed(2);
      if (cp > 15) {
        evalLabelSide = "left";
        evalLabelColor = "text-black";
      } else if (cp < -15) {
        evalLabelSide = "right";
        evalLabelColor = "text-white";
      } else {
        evalLabelSide = null;
      }
    } else if (currentEval.type === "mate") {
      evalLabel = `#${currentEval.value}`;
      if (currentEval.value > 0) {
        evalLabelSide = "left";
        evalLabelColor = "text-black";
      } else {
        evalLabelSide = "right";
        evalLabelColor = "text-white";
      }
    }
  }

  return (
    <>
      <div className="mb-6">
        <h3 className="text-foreground mb-2 text-sm font-semibold">
          Engine Evaluation
        </h3>
        <div className="relative flex h-10 items-center overflow-hidden rounded bg-black">
          <div
            className="h-full bg-white transition-all duration-300"
            style={{ width: `${evalPercent}%` }}
          ></div>
          {evalLabel && evalLabelSide === "left" && (
            <span className={`absolute left-2 font-semibold ${evalLabelColor}`}>
              {evalLabel}
            </span>
          )}
          {evalLabel && evalLabelSide === "right" && (
            <span
              className={`absolute right-2 font-semibold ${evalLabelColor}`}
            >
              {evalLabel}
            </span>
          )}
          {evalLabel && !evalLabelSide && (
            <span className="text-foreground absolute inset-0 flex items-center justify-center font-semibold mix-blend-difference">
              {evalLabel}
            </span>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-foreground mb-2 text-sm font-semibold">
          Current Move
        </h3>
        <div className="bg-card flex items-center justify-between rounded p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {(() => {
                const classification =
                  analyzedPositions[currentMoveIndex]?.classification;
                if (!classification) return null;
                switch (classification) {
                  case "best":
                    return (
                      <>
                        <Image src={Best} alt="Best" width={24} height={24} />
                      </>
                    );
                  case "great":
                    return (
                      <>
                        <Image src={Great} alt="Great" width={24} height={24} />
                      </>
                    );
                  case "good":
                    return (
                      <>
                        <Image src={Good} alt="Good" width={24} height={24} />
                      </>
                    );
                  case "inaccuracy":
                    return (
                      <>
                        <Image
                          src={Inaccuracy}
                          alt="Inaccuracy"
                          width={24}
                          height={24}
                        />
                      </>
                    );
                  case "mistake":
                    return (
                      <>
                        <Image
                          src={Mistake}
                          alt="Mistake"
                          width={24}
                          height={24}
                        />
                      </>
                    );
                  case "blunder":
                    return (
                      <>
                        <Image
                          src={Blunder}
                          alt="Blunder"
                          width={24}
                          height={24}
                        />
                      </>
                    );
                  default:
                    return null;
                }
              })()}
            </div>
            <p className="text-foreground font-medium">
              {analyzedPositions[currentMoveIndex]?.move}
            </p>
          </div>
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
