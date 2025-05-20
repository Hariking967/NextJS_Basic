import getAllUsers from "@/lib/getAllUsers";
import { Metadata } from "next";
import React from 'react'
import Link from "next/link";

export const metadata:Metadata = {
    title:'Users'
}

export default async function Users() {
    const usersData: Promise<User[]> = getAllUsers();
    const users = await usersData
    const content = (
        <section>
            <h2>
                <Link href="/">Back to Home</Link>
            </h2>
            <br />
            {users.map(user=>{
                return(
                    <>
                        <p key={user.id}>
                            <Link href={`/users/${user.id}`}>
                                {user.name}
                            </Link>
                        </p>
                    </>
                )
            })}
        </section>
    );
  return (content);
}