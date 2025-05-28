import { cookies } from "next/headers";
import data from '../../data/bugs.json'
import { RateLimiter } from "limiter";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import fs from 'fs';
import path from 'path';
import getBugIndexById from "@/app/lib/getBugIndexById";

const filePath = path.join(process.cwd(), 'app', 'data', 'bugs.json');

let bugDatas = data.bugDatas;

let limiter = new RateLimiter({
    tokensPerInterval: 5,
    interval : 'second'
})

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

function withCORS(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

export async function GET()
{
    if (limiter.getTokensRemaining() <= 0)
    {
        return withCORS(NextResponse.json('Too many requests. Try later!',{status: 429}));
    }
    await limiter.removeTokens(1);
    return withCORS(NextResponse.json(bugDatas));
}

export async function POST(request: NextRequest)
{
    if (limiter.getTokensRemaining() <= 0)
    {
        return withCORS(NextResponse.json('Too many requests. Try later!',{status: 429}));
    }
    const remaingTokens = await limiter.removeTokens(1);
    const body = await request.json();
    const newBug: BugType = {id:body.id, title: body.title, desc:body.desc, userid:body.userid, answered: body.answered, time:body.time};
    bugDatas.push(newBug);
    try{fs.writeFileSync(filePath, JSON.stringify({ bugDatas }, null, 2));}
    catch(error){return withCORS(NextResponse.json({ error: "Failed to write data" }, { status: 500 }));}
    return withCORS(NextResponse.json(bugDatas));
}

export async function PUT(request: NextRequest)
{
    if (limiter.getTokensRemaining() <= 0)
    {
        return withCORS(NextResponse.json('Too many requests. Try later!',{status: 429}));
    }
    const remaingTokens = await limiter.removeTokens(1);
    const body = await request.json();
    const updateBug: BugType = {id:body.id, title: body.title, desc:body.desc, userid:body.user, answered: body.answered, time:body.time};
    const { id, title, desc, userid, answered} = body;
    const bugIndex: number = getBugIndexById(id);
    bugDatas[bugIndex].title = title;
    bugDatas[bugIndex].desc = desc;
    try{fs.writeFileSync(filePath, JSON.stringify({ bugDatas }, null, 2));}
    catch(error){return withCORS(NextResponse.json({ error: "Failed to write data" }, { status: 500 }));}
    return withCORS(NextResponse.json(bugDatas));
}

export async function DELETE(request: NextRequest)
{
    if (limiter.getTokensRemaining() <= 0)
    {
        return withCORS(NextResponse.json('Too many requests. Try later!',{status: 429}));
    }
    const remaingTokens = await limiter.removeTokens(1);
    const body = await request.json();
    const updateBug: BugType = {id:body.id, title: body.title, desc:body.desc, userid:body.user, answered: body.answered, time:body.time};
    const { id } = body;
    const bugIndex: number = getBugIndexById(id);
    bugDatas.splice(bugIndex, 1);
    try{fs.writeFileSync(filePath, JSON.stringify({ bugDatas }, null, 2));}
    catch(error){return withCORS(NextResponse.json({ error: "Failed to write data" }, { status: 500 }));}
    return withCORS(NextResponse.json(bugDatas));
}