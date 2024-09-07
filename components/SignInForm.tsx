"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

type SignInFormProps = {
  toggleAuthMode: () => void;
};

export const SignInForm: React.FC<SignInFormProps> = ({ toggleAuthMode }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signInError, setSignInError] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (username.trim() === "" || password.trim() === "") {
      setSignInError("Please fill out all fields.");
      return;
    }
    setSignInError("");

    try {
      console.log("send to db to find if user credentials are right");

      // if successful, do router.push("/analyze");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <p>
          An account would allow you to store analzyed games, but isn't
          necessary. Dont have an account?{" "}
          <button onClick={toggleAuthMode}>Sign Up</button>
        </p>
        {signInError && <div>{signInError}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign In</button>
        </form>
      </div>
    </>
  );
};
