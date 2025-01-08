"use client";

import { AuthContainer } from "@/components/AuthContainer";
import { useSession } from "next-auth/react";

export default function Auth() {
  const { data: session } = useSession();

  return (
    <>
      <div className="flex items-start justify-center min-h-screen bg-gray-100 pt-20">
        <div className="text-center p-4 bg-white rounded shadow-md w-[500px]">
          {session ? (
            <div>
              <p>
                You're currently signed in with your Google account.
                <br />
                To get to the home page, click the icon on the top left.
                <br />
                To sign out, navigate to the top right.
                <br />
                Thank you for using Chessalyze!
              </p>
            </div>
          ) : (
            <AuthContainer />
          )}
        </div>
      </div>
    </>
  );
}
