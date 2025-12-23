"use client";

import { Search } from "lucide-react";

interface UsernameStepProps {
  username: string;
  hasSubmitted: boolean;
  onUsernameChange: (username: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function UsernameStep({
  username,
  onUsernameChange,
  onSubmit,
}: UsernameStepProps) {
  return (
    <>
      <div className="mb-4 text-center">
        <h2 className="text-foreground mb-2 text-xl font-semibold">
          Get Started
        </h2>
        <p className="text-muted text-sm">
          Enter a Chess.com username to analyze games
        </p>
      </div>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          type="text"
          value={username}
          onChange={(e) => onUsernameChange(e.target.value)}
          placeholder="Chess.com username..."
          className="bg-card text-foreground border-interactive focus:border-border placeholder:text-muted w-full rounded border px-4 py-3 transition-colors focus:outline-none"
          autoFocus
        />
        <button
          type="submit"
          disabled={!username.trim()}
          className="bg-status-engine text-foreground hover:bg-status-engine/80 flex w-full cursor-pointer items-center justify-center gap-2 rounded px-4 py-3 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Search size={18} />
          Load Games
        </button>
      </form>
    </>
  );
}
