"use client";

import { useAuth } from "@/app/context/AuthContext";

export default function Saved() {
  const { isAuthenticated } = useAuth();

  return (
    <>{isAuthenticated ? <div>signed in</div> : <div>not signed in</div>}</>
  );
}
