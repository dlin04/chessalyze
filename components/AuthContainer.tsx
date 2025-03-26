"use client";

import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import GoogleLogo from "../public/Google.png";

export const AuthContainer = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignIn = async () => {
    await signIn("google");
  };
  const handleSignOut = async () => {
    await signOut();
  };

  const handleContinueWithoutAccount = () => {
    router.push("/");
  };

  return (
    <>
      <div className="flex items-start justify-center min-h-screen pt-20">
        <div className="text-center p-4 bg-white rounded shadow-md w-80">
          <p className="mb-4 text-lg font-semibold">
            Welcome to Chessalyze! <br />
            Sign in to view previously analyzed games.
          </p>
          {session ? (
            <div>
              <p className="mb-4">Signed in as {session.user?.name}</p>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <button
                className="flex items-center justify-center px-4 py-2 mb-2 border border-gray-400 rounded w-64"
                onClick={handleSignIn}
              >
                <Image
                  src={GoogleLogo}
                  alt="Google logo"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                Sign in with Google
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 w-64"
                onClick={handleContinueWithoutAccount}
              >
                Continue without Account
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
