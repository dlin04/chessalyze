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
        <h3 className="text-sm font-semibold text-foreground mb-2">
          Engine Evaluation
        </h3>
        <div className="h-10 bg-black rounded overflow-hidden flex items-center relative">
          <div className="h-full bg-white" style={{ width: "50%" }}></div>
          <span className="absolute inset-0 flex items-center justify-center text-foreground font-semibold mix-blend-difference">
            0.0
          </span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-2">
          Current Move
        </h3>
        <div className="bg-card rounded p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-status-excellent"></div>
            <div>
              <p className="text-sm text-foreground font-medium">1.</p>
              <p className="text-xs text-muted">move classification</p>
            </div>
          </div>
          <span className="text-sm text-status-excellent font-medium">
            change in engine
          </span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-2">
          Best Move
        </h3>
        <div className="bg-card rounded p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-status-engine font-medium">best move</p>
            <p className="text-xs text-muted">Engine&apos;s top choice</p>
          </div>
          <span className="text-sm text-status-engine font-medium">
            top choice
          </span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-2">
          Move Accuracy
        </h3>
        <div className="bg-card rounded p-6 flex items-center justify-around gap-8">
          <div className="text-center">
            <p className="text-xs text-muted mb-1">
              white player&apos;s Accuracy
            </p>
            <p className="text-4xl font-bold">X%</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted mb-1">
              black player&apos;s Accuracy
            </p>
            <p className="text-4xl font-bold">Y%</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2">
          Mistakes Overview
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-card rounded p-4">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-interactive">
              <div className="w-3 h-3 rounded-full bg-white"></div>
              <span className="text-xs font-semibold text-foreground">
                White Player
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-status-excellent"></div>
                  <span className="text-xs text-foreground">Excellent</span>
                </div>
                <span className="text-xs text-muted">8</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-status-good"></div>
                  <span className="text-xs text-foreground">Good</span>
                </div>
                <span className="text-xs text-muted">12</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-status-inaccuracy"></div>
                  <span className="text-xs text-foreground">Inaccuracy</span>
                </div>
                <span className="text-xs text-muted">3</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-status-mistake"></div>
                  <span className="text-xs text-foreground">Mistake</span>
                </div>
                <span className="text-xs text-muted">2</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-status-blunder"></div>
                  <span className="text-xs text-foreground">Blunder</span>
                </div>
                <span className="text-xs text-muted">1</span>
              </div>
            </div>
          </div>

          {/* Black Player */}
          <div className="bg-card rounded p-4">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-interactive">
              <div className="w-3 h-3 rounded-full bg-black"></div>
              <span className="text-xs font-semibold text-foreground">
                Black Player
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-status-excellent"></div>
                  <span className="text-xs text-foreground">Excellent</span>
                </div>
                <span className="text-xs text-muted">6</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-status-good"></div>
                  <span className="text-xs text-foreground">Good</span>
                </div>
                <span className="text-xs text-muted">10</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-status-inaccuracy"></div>
                  <span className="text-xs text-foreground">Inaccuracy</span>
                </div>
                <span className="text-xs text-muted">4</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-status-mistake"></div>
                  <span className="text-xs text-foreground">Mistake</span>
                </div>
                <span className="text-xs text-muted">3</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-status-blunder"></div>
                  <span className="text-xs text-foreground">Blunder</span>
                </div>
                <span className="text-xs text-muted">2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
