"use client";

import { useState, FormEvent } from "react";
// import { useRouter } from "next/navigation";

type SignUpFormProps = {
  toggleAuthMode: () => void;
};

export const SignUpForm: React.FC<SignUpFormProps> = ({ toggleAuthMode }) => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [signUpError, setSignUpError] = useState<string>("");

  // const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (username.trim() === "" || username.includes(" ")) {
      setSignUpError("Username cannot include spaces.");
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
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });
      const data = await res.json();

      if (data.message == "Email already registered") {
        setSignUpError("Email already registered");
        return;
      } else if (data.message == "Username already registered") {
        setSignUpError("Username already registered");
        return;
      }

      // everything else works
      if (data.message == "User created") {
        alert("Go to sign in.");
      }
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
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
