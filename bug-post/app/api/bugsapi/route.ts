import { cookies } from "next/headers";
import data from '../../data/bugs.json'
import { RateLimiter } from "limiter";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

let bugDatas = data.bugs;

let limiter = new RateLimiter({
    tokensPerInterval: 5,
    interval : 'second'
})

type BugType = {
    id : number,
    title: string,
    desc: string,
    userid: number,
    answered: string
}

export async function POST(request: NextRequest)
{
    const remaingTokens = await limiter.removeTokens(1);
    const body = await request.json();
    const newBug: BugType = {id:body.id, title: body.title, desc:body.desc, userid:body.user, answered: "false"};
    bugDatas.push(newBug);
    if (remaingTokens > 0)
    {
        return NextResponse.json(bugDatas);
    }
    else
    {
        return NextResponse.json('Too many requests. Try later!',{status: 429});
    }
}