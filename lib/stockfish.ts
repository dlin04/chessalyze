import { StockfishEvaluation } from "@/types";

class StockfishEngine {
  private worker: Worker | null = null;
  private messageQueue: Array<(message: string) => void> = [];
  private isReady = false;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.worker = new Worker("/stockfish/stockfish.js");
      this.worker.onerror = (error) => {
        reject(error);
      };

      this.worker.onmessage = (event) => {
        const message = event.data;
        this.messageQueue.forEach((handler) => handler(message));
      };

      const initHandler = (message: string) => {
        if (message === "readyok") {
          this.isReady = true;
          this.messageQueue = this.messageQueue.filter(
            (h) => h !== initHandler,
          );
          resolve();
        }
      };
      this.messageQueue.push(initHandler);

      this.worker.postMessage("uci");
      this.worker.postMessage("isready");
    });
  }

  private postMessage(message: string): void {
    if (!this.worker) {
      throw new Error("Stockfish worker not initialized");
    }
    this.worker.postMessage(message);
  }

  async evaluatePosition(
    fen: string,
    depth: number = 18,
  ): Promise<StockfishEvaluation> {
    if (!this.isReady) {
      await this.init();
    }

    return new Promise((resolve) => {
      let bestMove = "";
      let evaluation: Omit<StockfishEvaluation, "bestMove"> | null = null;

      const handler = (message: string) => {
        if (message.startsWith("info") && message.includes("score")) {
          const depthMatch = message.match(/depth (\d+)/);
          const currentDepth = depthMatch ? parseInt(depthMatch[1]) : 0;

          if (currentDepth >= depth) {
            const cpMatch = message.match(/score cp (-?\d+)/);
            if (cpMatch) {
              evaluation = {
                type: "cp",
                value: parseInt(cpMatch[1]),
              };
            }

            const mateMatch = message.match(/score mate (-?\d+)/);
            if (mateMatch) {
              evaluation = {
                type: "mate",
                value: parseInt(mateMatch[1]),
              };
            }
          }
        }

        if (message.startsWith("bestmove")) {
          const moveMatch = message.match(/bestmove (\S+)/);
          if (moveMatch) {
            bestMove = moveMatch[1];
          }

          if (evaluation) {
            resolve({ ...evaluation, bestMove });
          } else {
            resolve({
              type: "cp",
              value: 0,
              bestMove: bestMove,
            });
          }

          this.messageQueue = this.messageQueue.filter((h) => h !== handler);
        }
      };

      this.messageQueue.push(handler);

      this.postMessage(`position fen ${fen}`);
      this.postMessage(`go depth ${depth}`);
    });
  }

  terminate(): void {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
      this.isReady = false;
      this.messageQueue = [];
    }
  }
}

let stockfishInstance: StockfishEngine | null = null;

export function getStockfish(): StockfishEngine {
  if (!stockfishInstance) {
    stockfishInstance = new StockfishEngine();
  }
  return stockfishInstance;
}
