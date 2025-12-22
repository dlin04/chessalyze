"use client";

import AnalysisTabs from "./AnalysisTabs";

interface AnalysisPanelProps {
  hasSubmitted: boolean;
  onChangeUser: () => void;
}

export default function AnalysisPanel({
  hasSubmitted,
  onChangeUser,
}: AnalysisPanelProps) {
  return (
    <>
      <AnalysisTabs hasSubmitted={hasSubmitted} onChangeUser={onChangeUser} />

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
            <div className="bg-status-excellent h-4 w-4 rounded-full"></div>
            <div>
              <p className="text-foreground text-sm font-medium">1.</p>
              <p className="text-muted text-xs">move classification</p>
            </div>
          </div>
          <span className="text-status-excellent text-sm font-medium">
            change in engine
          </span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-foreground mb-2 text-sm font-semibold">
          Best Move
        </h3>
        <div className="bg-card flex items-center justify-between rounded p-4">
          <div>
            <p className="text-status-engine text-sm font-medium">best move</p>
            <p className="text-muted text-xs">Engine&apos;s top choice</p>
          </div>
          <span className="text-status-engine text-sm font-medium">
            top choice
          </span>
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
              <div className="h-3 w-3 rounded-full bg-white"></div>
              <span className="text-foreground text-xs font-semibold">
                White Player
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-status-excellent h-2 w-2 rounded-full"></div>
                  <span className="text-foreground text-xs">Excellent</span>
                </div>
                <span className="text-muted text-xs">8</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-status-good h-2 w-2 rounded-full"></div>
                  <span className="text-foreground text-xs">Good</span>
                </div>
                <span className="text-muted text-xs">12</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-status-inaccuracy h-2 w-2 rounded-full"></div>
                  <span className="text-foreground text-xs">Inaccuracy</span>
                </div>
                <span className="text-muted text-xs">3</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-status-mistake h-2 w-2 rounded-full"></div>
                  <span className="text-foreground text-xs">Mistake</span>
                </div>
                <span className="text-muted text-xs">2</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-status-blunder h-2 w-2 rounded-full"></div>
                  <span className="text-foreground text-xs">Blunder</span>
                </div>
                <span className="text-muted text-xs">1</span>
              </div>
            </div>
          </div>

          {/* Black Player */}
          <div className="bg-card rounded p-4">
            <div className="border-interactive mb-3 flex items-center gap-2 border-b pb-2">
              <div className="h-3 w-3 rounded-full bg-black"></div>
              <span className="text-foreground text-xs font-semibold">
                Black Player
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-status-excellent h-2 w-2 rounded-full"></div>
                  <span className="text-foreground text-xs">Excellent</span>
                </div>
                <span className="text-muted text-xs">6</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-status-good h-2 w-2 rounded-full"></div>
                  <span className="text-foreground text-xs">Good</span>
                </div>
                <span className="text-muted text-xs">10</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-status-inaccuracy h-2 w-2 rounded-full"></div>
                  <span className="text-foreground text-xs">Inaccuracy</span>
                </div>
                <span className="text-muted text-xs">4</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-status-mistake h-2 w-2 rounded-full"></div>
                  <span className="text-foreground text-xs">Mistake</span>
                </div>
                <span className="text-muted text-xs">3</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-status-blunder h-2 w-2 rounded-full"></div>
                  <span className="text-foreground text-xs">Blunder</span>
                </div>
                <span className="text-muted text-xs">2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
