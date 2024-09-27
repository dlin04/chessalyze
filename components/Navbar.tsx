"use client";

import { useAuth } from "@/app/context/AuthContext"; // Replace with your actual path
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div
        className="cursor-pointer text-lg font-bold"
        onClick={() => router.push("/")}
      >
        Chessalyze
      </div>
      <div className="flex space-x-4">
        {!isAuthenticated ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => router.push("/auth")}
          >
            Sign In
          </button>
        ) : (
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
};
