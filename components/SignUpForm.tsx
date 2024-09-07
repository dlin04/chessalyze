"use client";

import { useState, FormEvent } from "react";

type SignUpFormProps = {
  toggleAuthMode: () => void;
};

export const SignUpForm: React.FC<SignUpFormProps> = ({ toggleAuthMode }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [signUpError, setSignUpError] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (username.trim() === "") {
      setSignUpError("Please provide username.");
      return;
    }
    if (password.trim() === "" || confirmPassword.trim() === "") {
      setSignUpError(
        "Password must contain letters, numbers, or special characters."
      );
      return;
    }
    if (password !== confirmPassword) {
      setSignUpError("Passwords do not match.");
      return;
    }
    setSignUpError("");

    try {
      console.log("send to db to find if user exists or not!");
      console.log(
        "if the user does not exist, register them and bring them to analyze page"
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <p>
          Already have an account?{" "}
          <button onClick={toggleAuthMode}>Sign In</button>
        </p>
        {signUpError && <div>{signUpError}</div>}
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
};
