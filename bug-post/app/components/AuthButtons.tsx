"use client";

import React from "react";
import { signIn, signOut } from "next-auth/react";

interface AuthButtonsProps {
  loggedIn: boolean;
}

export default function AuthButtons({ loggedIn }: AuthButtonsProps) {
  // Logout handler
  const handleLogout = () => {
    signOut({ redirect: false }).then(() => {
      const githubLogoutUrl = "https://github.com/logout";
      const redirectAfterLogout = "/";

      const popup = window.open(
        githubLogoutUrl,
        "GitHub Logout",
        "width=600,height=600"
      );

      if (!popup) {
        alert("Please allow popups for this site to logout properly.");
        window.location.href = redirectAfterLogout;
        return;
      }

      const timer = setInterval(() => {
        if (popup.closed) {
          clearInterval(timer);
          window.location.href = redirectAfterLogout;
        }
      }, 500);
    });
  };

  // Signin handler, forcing account selection
  const handleLogin = () => {
    signIn("github", { prompt: "login" });
  };

  return loggedIn ? (
    <button
      className="text-white bg-red-600 px-4 py-2 rounded"
      onClick={handleLogout}
    >
      Logout
    </button>
  ) : (
    <button
      className="text-white bg-green-600 px-4 py-2 rounded"
      onClick={handleLogin}
    >
      Sign In
    </button>
  );
}
