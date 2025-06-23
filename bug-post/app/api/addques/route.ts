import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { prisma } from '@/app/lib/prisma'
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest)
{
    const body = await request.json();
    const session = await getServerSession(authOptions)
    if (session)
    {
        let userName = session.user?.name || "user"
        const userFind = await prisma.user.findFirst({
            where: {userName: userName}
        })
        const userId = userFind?.id
    }
    const ques = await prisma.bug.create({
        data: {
            title: body.title,
            desc: body.desc,
            userId: body.userId
        }
    })
    return NextResponse.json(ques);
}