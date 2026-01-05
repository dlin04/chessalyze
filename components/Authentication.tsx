import { CircleQuestionMark, Menu } from "lucide-react";
import { Tooltip } from "react-tooltip";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import GooglePng from "@/public/Google.png";

interface AuthenticationProps {
  handleShowPrevious: () => void;
}

export default function Authentication({
  handleShowPrevious,
}: AuthenticationProps) {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-3">
      {session ? (
        <div className="relative z-50" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="border-border hover:bg-background flex cursor-pointer items-center gap-2 rounded-md border p-2 transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>

          {isMenuOpen && (
            <div className="bg-panel border-border absolute top-full right-0 mt-2 w-72 rounded-md border shadow-lg">
              <div className="border-border flex items-center gap-3 border-b px-4 py-3">
                {session.user?.image && (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <div className="flex flex-col overflow-hidden">
                  <span className="truncate text-sm font-medium">
                    {session.user?.name}
                  </span>
                  <span className="text-muted truncate text-xs">
                    {session.user?.email}
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  handleShowPrevious();
                  setIsMenuOpen(false);
                }}
                className="hover:bg-background w-full cursor-pointer px-4 py-2.5 text-left text-sm transition-colors"
              >
                Previous Analyzed
              </button>
              <button
                onClick={() => {
                  signOut();
                  setIsMenuOpen(false);
                }}
                className="hover:bg-background w-full cursor-pointer px-4 py-2.5 text-left text-sm transition-colors"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          <button
            onClick={() => signIn("google")}
            className="hover:bg-background border-border flex cursor-pointer items-center gap-2 rounded-md border px-4 py-2.5 text-base font-medium transition-colors"
          >
            <Image src={GooglePng} alt="Google icon" className="h-6 w-6" />
            Sign in with Google
          </button>
          <span
            data-tooltip-id="info-icon"
            data-tooltip-content="Sign in to save and access your previously analyzed games."
            data-tooltip-place="bottom"
            className="cursor-pointer"
          >
            <CircleQuestionMark />
          </span>
          <Tooltip id="info-icon" />
        </>
      )}
    </div>
  );
}
