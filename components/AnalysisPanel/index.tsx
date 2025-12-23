"use client";

import Image from "next/image";
import AnalysisTabs from "./AnalysisTabs";
import Best from "@/public/moveClassifications/best.png";
import Great from "@/public/moveClassifications/great.png";
import Good from "@/public/moveClassifications/good.png";
import Inaccuracy from "@/public/moveClassifications/inaccuracy.png";
import Mistake from "@/public/moveClassifications/mistake.png";
import Blunder from "@/public/moveClassifications/blunder.png";

interface AnalysisPanelProps {
  onChangeUser: () => void;
}

export default function AnalysisPanel({ onChangeUser }: AnalysisPanelProps) {
  return (
    <>
      <AnalysisTabs onChangeUser={onChangeUser} />

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
            <div>icon</div>
            <div>
              <p className="text-foreground text-sm font-medium">1.</p>
            </div>
          </div>
          <span className="text-sm font-medium">change in engine</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-foreground mb-2 text-sm font-semibold">
          Best Move
        </h3>
        <div className="bg-card flex items-center gap-2 rounded p-4">
          <Image src={Best} alt="Best move icon" width={24} height={24} /> best
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-foreground mb-2 text-sm font-semibold">
          Move Accuracy
        </h3>
        <div className="bg-card flex items-center justify-around gap-8 rounded p-6">
          <div className="text-center">
            <p className="text-muted mb-1 text-xs">
              white player&apos;s Accuracy
            </p>
            <p className="text-4xl font-bold">X%</p>
          </div>
          <div className="text-center">
            <p className="text-muted mb-1 text-xs">
              black player&apos;s Accuracy
            </p>
            <p className="text-4xl font-bold">Y%</p>
          </div>
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
                White Player
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
                <span className="text-muted text-xs">8</span>
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
                <span className="text-muted text-xs">12</span>
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
                <span className="text-muted text-xs">3</span>
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
                <span className="text-muted text-xs">2</span>
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
                <span className="text-muted text-xs">1</span>
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
                <span className="text-muted text-xs">1</span>
              </div>
            </div>
          </div>

          <div className="bg-card rounded p-4">
            <div className="border-interactive mb-3 flex items-center gap-2 border-b pb-2">
              <div className="h-5 w-5 rounded-full bg-black"></div>
              <span className="text-foreground text-xs font-semibold">
                Black Player
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
                <span className="text-muted text-xs">8</span>
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
                <span className="text-muted text-xs">12</span>
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
                <span className="text-muted text-xs">3</span>
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
                <span className="text-muted text-xs">2</span>
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
                <span className="text-muted text-xs">1</span>
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
                <span className="text-muted text-xs">1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
