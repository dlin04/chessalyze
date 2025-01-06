"use client";
import { useSession } from "next-auth/react";

export default function Saved() {
  const { data: session } = useSession();

  return (
    <>
      <div>
        {session ? (
          <div>Previously Analyzed:</div>
        ) : (
          <div>
            To view previously analyzed games, please consider signing in with
            your Google account. Thank you!
          </div>
        )}
      </div>
    </>
  );
}
