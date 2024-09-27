"use client";
import { MoveList } from "@/components/(side-panel)/MoveList";
import { Chessboard } from "react-chessboard";

export default function Home() {
  return (
    <div className="flex justify-center mt-10">
      <div className="w-[500px] h-[500px]">
        <Chessboard position="rn1q1rk1/pp2b1pp/2p2n2/3p1pB1/3P4/1QP2N2/PP1N1PPP/R4RK1 b - - 1 11" />
      </div>
      <MoveList />
    </div>
  );
}
