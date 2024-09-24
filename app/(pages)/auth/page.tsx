"use client";

import { AuthContainer } from "@/components/(auth)/AuthContainer";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export default function Auth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
  }, []);

  return (
    <>
      <div>auth page</div>
      {isAuthenticated ? (
        <div>You are already authenticated.</div>
      ) : (
        <AuthContainer />
      )}
    </>
  );
}
