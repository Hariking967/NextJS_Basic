"use client";

import { useEffect } from "react";
import { signIn } from "next-auth/react";

export default function ContinuePage() {
  useEffect(() => {
    const githubLogoutWindow = window.open("https://github.com/logout", "_blank");

    const loginAfterLogout = setTimeout(() => {
      if (githubLogoutWindow) githubLogoutWindow.close();

      // Now force GitHub to show login screen
      signIn("github", {
        prompt: "login",
        callbackUrl: "/", // or your desired page
      });
    }, 3000); // Give GitHub logout time to process

    return () => clearTimeout(loginAfterLogout);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white flex-col">
      <h1 className="text-2xl font-bold mb-4">Redirecting to GitHub login...</h1>
      <p className="text-gray-400">Please wait a few seconds while we log you out securely.</p>
    </div>
  );
}
