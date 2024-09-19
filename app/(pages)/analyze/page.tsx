"use client";
import { Chessboard } from "react-chessboard";

export default function Analyze() {
  return (
    <>
      <div>analyze page</div>
      <div className="w-[500px] h-[500px]">
        <Chessboard id="BasicBoard" />
      </div>
    </>
  );
}
