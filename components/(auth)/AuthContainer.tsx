"use client";

import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

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
      {session ? (
        <div>
          <p>Signed in as {session.user?.name}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <div>
          <button onClick={handleSignIn}>Sign in with Google</button>
          <button onClick={handleContinueWithoutAccount}>
            Continue without Account
          </button>
        </div>
      )}
    </>
  );
};
