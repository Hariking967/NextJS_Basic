'use server'
// import React from 'react'
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import {prisma} from "@/app/lib/prisma"

export default async function addQuestion({title, desc}:{title:string, desc:string}) {
  const session = await getServerSession(authOptions);
    if (session)
    {
        let userName = session.user?.name || "user"
        const userFind = await prisma.user.findFirst({
            where: {userName: userName}
        })
        const userId = userFind?.id
        const bug = await prisma.bug.create({
            data: {
                title: title,
                desc: desc,
                userId: userId
            }
        })
    }
}