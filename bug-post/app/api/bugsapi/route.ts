import { cookies } from "next/headers";
import data from '../../data/bugs.json'
import { RateLimiter } from "limiter";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import fs from 'fs';
import path from 'path';
import getBugIndexById from "@/app/lib/getBugIndexById";

const filePath = path.join(process.cwd(), 'data', 'bugs.json');

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

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function GET()
{
    const remaingTokens = await limiter.removeTokens(1);
    if (remaingTokens > 0)
    {
        return NextResponse.json(bugDatas);
    }
    else
    {
        return NextResponse.json('Too many requests. Try later!',{status: 429});
    }
}

export async function POST(request: NextRequest)
{
    const remaingTokens = await limiter.removeTokens(1);
    const body = await request.json();
    const newBug: BugType = {id:body.id, title: body.title, desc:body.desc, userid:body.user, answered: "false"};
    bugDatas.push(newBug);
    if (remaingTokens > 0)
    {
        fs.writeFileSync(filePath, JSON.stringify(bugDatas));
        return NextResponse.json(bugDatas);
    }
    else
    {
        return NextResponse.json('Too many requests. Try later!',{status: 429});
    }
}

export async function PUT(request: NextRequest)
{
    const remaingTokens = await limiter.removeTokens(1);
    const body = await request.json();
    const updateBug: BugType = {id:body.id, title: body.title, desc:body.desc, userid:body.user, answered: "false"};
    const { id, title, desc, userid, answered} = body;
    const bugIndex: number = getBugIndexById(id);
    bugDatas[bugIndex].title = title;
    bugDatas[bugIndex].desc = desc;
    if (remaingTokens > 0)
    {
        fs.writeFileSync(filePath, JSON.stringify(bugDatas));
        return NextResponse.json(bugDatas);
    }
    else
    {
        return NextResponse.json('Too many requests. Try later!',{status: 429});
    }
}

export async function DELETE(request: NextRequest)
{
    const remaingTokens = await limiter.removeTokens(1);
    const body = await request.json();
    const updateBug: BugType = {id:body.id, title: body.title, desc:body.desc, userid:body.user, answered: "false"};
    const { id } = body;
    const bugIndex: number = getBugIndexById(id);
    bugDatas.splice(bugIndex, 1);
    if (remaingTokens > 0)
    {
        fs.writeFileSync(filePath, JSON.stringify(bugDatas));
        return NextResponse.json(bugDatas);
    }
    else
    {
        return NextResponse.json('Too many requests. Try later!',{status: 429});
    }
}