"use client";
import { Chessboard } from "react-chessboard";

export default function Home() {
  return (
    <>
      <div>home / analyze page</div>
      <div className="w-[500px] h-[500px]">
        <Chessboard id="BasicBoard" />
      </div>
    </>
  );
}
