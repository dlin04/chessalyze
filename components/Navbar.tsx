"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  const handleClickSaved = () => {
    router.push("/saved");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div
        className="cursor-pointer text-3xl font-bold"
        onClick={() => router.push("/")}
      >
        Chessalyze
      </div>
      <div className="flex space-x-4">
        {session ? (
          <>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xl"
              onClick={handleClickSaved}
            >
              Saved
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-xl"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xl"
              onClick={() => router.push("/auth")}
            >
              Sign In
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
