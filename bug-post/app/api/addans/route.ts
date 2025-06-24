import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { prisma } from '@/app/lib/prisma'
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/dist/server/api-utils";

export async function POST(request: NextRequest)
{
    const body = await request.json();
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
                answer: body.answer,
                fromUserId: userId,
                bugId: body.bugId
            }
        })

        const bug = await prisma.bug.update({
            where: {id: body.bugId},
            data: {answered: {increment: 1}}
        })
        return NextResponse.json(answer);
    }
}