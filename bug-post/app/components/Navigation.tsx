import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import AuthButtons from "./AuthButtons"; // client component

export default async function Navigation() {
  const session = await getServerSession(authOptions);

  return (
    <div className="bg-blue-500 flex flex-row justify-between items-center h-20">
      <div className="flex flex-row items-center">
        <h2 className="text-4xl font-mono mr-7 ml-3">Stack Overflow</h2>
        <Link href="/" className="text-2xl m-1.5 text-white">Home |</Link>
        <Link href="/about" className="text-2xl m-1.5 text-white">About |</Link>
        <Link href="/help" className="text-2xl m-1.5 text-white">Help |</Link>
      </div>
      <div>
        {session && session.user ? (
          <div className="flex items-center space-x-4 bg-gray-800 p-3 rounded-md">
            <p className="text-white text-lg font-semibold">{session.user.name}</p>
            <AuthButtons loggedIn />
          </div>
        ) : (
          <AuthButtons loggedIn={false} />
        )}
      </div>
    </div>
  );
}
