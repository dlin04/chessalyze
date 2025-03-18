"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import GithubLogo from "@/public/github.png";

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
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-4">
          <div
            className="cursor-pointer hover:opacity-80 transition text-3xl font-bold"
            onClick={() => router.push("/")}
          >
            Chessalyze
          </div>
          <a
            href="https://github.com/dlin04/chessalyze"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={GithubLogo}
              alt="GitHub"
              width={32}
              height={32}
              className="cursor-pointer hover:opacity-80 transition bg-white p-1 rounded-full"
            />
          </a>
        </div>
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
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xl"
            onClick={() => router.push("/auth")}
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};
