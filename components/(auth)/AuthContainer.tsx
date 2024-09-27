"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";

export const AuthContainer = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  const router = useRouter();

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
  };

  const handleClick = () => {
    router.push("/");
  };

  return (
    <>
      <h2>Welcome to Chessalyze!</h2>
      <p>
        An account would allow you to store analzyed games, but isn&#39;t
        necessary.
      </p>
      <div>
        {isSignUp ? (
          <SignUpForm toggleAuthMode={toggleAuthMode} />
        ) : (
          <SignInForm toggleAuthMode={toggleAuthMode} />
        )}
      </div>
      <button onClick={handleClick}>Continue w/o an account</button>
    </>
  );
};
