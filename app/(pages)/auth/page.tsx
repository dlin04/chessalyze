"use client";

import { AuthContainer } from "@/components/(auth)/AuthContainer";
import { useSession } from "next-auth/react";

export default function Auth() {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <div>
          You&apos;re currently signed in with your Google account.
          <br></br>To sign out, navigate the top right of the page.
          <br></br>Thank you for using Chessalyze!
        </div>
      ) : (
        <AuthContainer />
      )}
    </>
  );
}
