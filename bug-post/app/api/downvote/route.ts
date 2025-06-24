import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { prisma } from '@/app/lib/prisma'

export async function POST(request: NextRequest)
{
    const body = await request.json();
    const down = await prisma.answer.update({
              where: { id: body.ans.id },
              data: { downvote: {increment: 1} },
            });
    return NextResponse.json(down.downvote);
}