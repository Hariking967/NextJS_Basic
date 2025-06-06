// AuthButtons.tsx (client component)
"use client";

import { signIn, signOut } from "next-auth/react";

interface AuthButtonsProps {
  loggedIn: boolean;
}

export default function AuthButtons({ loggedIn }: AuthButtonsProps) {
  return loggedIn ? (
    <button
      className="text-white bg-red-600 px-4 py-2 rounded"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  ) : (
    <button
      className="text-white bg-green-600 px-4 py-2 rounded"
      onClick={() => signIn("github")}
    >
      Sign In
    </button>
  );
}
