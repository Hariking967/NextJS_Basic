"use client";

import { signIn, signOut } from "next-auth/react";

export default function AuthButtons({ loggedIn }: { loggedIn: boolean }) {
  const handleLogout = async () => {
    // Sign out from your app
    await signOut({ redirect: false, callbackUrl: '/' });

    // Then redirect to GitHub logout page, which redirects back to your site
    window.location.href = "https://github.com/logout";
  };

  return loggedIn ? (
    <button
      className="text-white bg-red-600 px-4 py-2 rounded"
      onClick={handleLogout}
    >
      Sign Out
    </button>
  ) : (
    <button
      className="text-white bg-green-600 px-4 py-2 rounded"
      onClick={() =>
        signIn("github", {
          prompt: "login", // ✅ always shows GitHub login prompt
          callbackUrl: "/", // ✅ redirect after login
        })
      }
    >
      Sign In
    </button>
  );
}
