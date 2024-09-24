"use client";
// import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();

  // check if token in localStoage still valid
  // display

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div
        className="cursor-pointer text-lg font-bold"
        onClick={() => router.push("/")}
      >
        Chessalyze
      </div>
    </nav>
  );
};
