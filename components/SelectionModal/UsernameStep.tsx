"use client";

import { Search } from "lucide-react";

interface UsernameStepProps {
  username: string;
  hasSubmitted: boolean;
  onUsernameChange: (username: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function UsernameStep({
  username,
  hasSubmitted,
  onUsernameChange,
  onSubmit,
  onCancel,
}: UsernameStepProps) {
  return (
    <>
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Get Started
        </h2>
        <p className="text-sm text-muted">
          Enter a Chess.com username to analyze games
        </p>
      </div>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          type="text"
          value={username}
          onChange={(e) => onUsernameChange(e.target.value)}
          placeholder="Chess.com username..."
          className="w-full px-4 py-3 bg-card text-foreground rounded border border-interactive focus:border-border focus:outline-none transition-colors placeholder:text-muted"
          autoFocus
        />
        <button
          type="submit"
          disabled={!username.trim()}
          className="w-full px-4 py-3 bg-status-engine text-foreground rounded font-semibold hover:bg-status-engine/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Search size={18} />
          Load Games
        </button>
        {hasSubmitted && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full px-4 py-2 border border-interactive text-muted rounded hover:text-foreground transition-colors"
          >
            Cancel
          </button>
        )}
      </form>
    </>
  );
}
