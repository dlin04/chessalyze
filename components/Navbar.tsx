"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp && decoded.exp > currentTime) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [isAuthenticated]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    router.push("/auth");
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
