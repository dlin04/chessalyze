"use client";
import { MoveList } from "@/components/(side-panel)/MoveList";
import { Chessboard } from "react-chessboard";

export default function Home() {
  return (
    <div className="flex justify-center mt-10">
      <div className="w-[500px] h-[500px]">
        <Chessboard id="BasicBoard" arePiecesDraggable={false} />
      </div>
      <MoveList />
    </div>
  );
}
