import { CircleQuestionMark } from "lucide-react";
import { Tooltip } from "react-tooltip";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import GooglePng from "@/public/Google.png";

export default function Authentication() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center gap-3">
      {session ? (
        <>
          <div className="flex items-center gap-3">
            {session.user?.image && (
              <Image
                src={session.user.image}
                alt={session.user.name || "User"}
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <span className="text-foreground text-base font-medium">
              {session.user?.name}
            </span>
          </div>
          <button
            onClick={() => signOut()}
            className="border-border hover:bg-background cursor-pointer rounded-md border px-4 py-2 text-base font-medium transition-colors"
          >
            Sign Out
          </button>
        </>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="hover:bg-background border-border flex cursor-pointer items-center gap-2 rounded-md border px-4 py-2.5 text-base font-medium transition-colors"
        >
          <Image src={GooglePng} alt="Google icon" className="h-6 w-6" />
          Sign in with Google
        </button>
      )}

      <span
        data-tooltip-id="info-icon"
        data-tooltip-content="Sign in to save and access your previously analyzed games."
        data-tooltip-place="bottom"
        className="cursor-pointer"
      >
        <CircleQuestionMark />
      </span>
      <Tooltip id="info-icon" />
    </div>
  );
}
