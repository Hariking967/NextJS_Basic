'use server'
// import React from 'react'
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import {prisma} from "@/app/lib/prisma"

export default async function addAnswer({bugId, ans}:{bugId:string, ans:string}) {
    const session = await getServerSession(authOptions);
    if (session)
    {
        let userName = session.user?.name || "user"
        const userFind = await prisma.user.findFirst({
            where: {userName: userName}
        })
        const userId = userFind?.id
        const answer = await prisma.answer.create({
            data: {
                fromUserId: userId,
                bugId: bugId,
                answer: ans
            }
        })
    }
  return ({success: true})
}
