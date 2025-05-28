import { NextRequest,NextResponse } from "next/server";
import { RateLimiter } from "limiter";
import data from '../../data/answers.json'
import fs from 'fs'
import path from 'path';
import getAnswerIndexById from "@/app/lib/getAnswerIndexById";

let limiter = new RateLimiter({
    tokensPerInterval: 5,
    interval: "second"
})

let answers = data.answers
const filePath = path.join(process.cwd(), 'app', 'data', 'answers.json')

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
    return withCORS(NextResponse.json(answers));
}

export async function POST(request: NextRequest)
{
    if (limiter.getTokensRemaining() <= 0)
    {
        return withCORS(NextResponse.json('Too many requests. Try later!',{status: 429}));
    }
    await limiter.removeTokens(1);
    const body = await request.json()
    const newAnswer: answerType = {
        id: body.id,
        fromUserId: body.fromUserId,
        bugId: body.bugId,
        answer: body.answer
    }
    answers.push(newAnswer)
    try{fs.writeFileSync(filePath, JSON.stringify({answers}, null, 2))}
    catch(error){return withCORS(NextResponse.json({ error: "Failed to write data" }, { status: 500 }));}
    return withCORS(NextResponse.json(answers));
}

export async function PUT(request: NextRequest)
{
    if (limiter.getTokensRemaining() <= 0)
    {
        return withCORS(NextResponse.json('Too many requests. Try later!',{status: 429}));
    }
    const remaingTokens = await limiter.removeTokens(1);
    const body = await request.json();
    const updateAnswer: answerType = {
        id: body.id,
        fromUserId: body.fromUserId,
        bugId: body.bugId,
        answer: body.answer
    }
    const { id,fromUserId, bugId, answer } = body;
    const answerIndex: number = getAnswerIndexById(id);
    answers[answerIndex].answer = answer;
    try{fs.writeFileSync(filePath, JSON.stringify({ answers }, null, 2));}
    catch(error){return withCORS(NextResponse.json({ error: "Failed to write data" }, { status: 500 }));}
    return withCORS(NextResponse.json(answers));
}

export async function DELETE(request: NextRequest)
{
    if (limiter.getTokensRemaining() <= 0)
    {
        return withCORS(NextResponse.json('Too many requests. Try later!',{status: 429}));
    }
    const remaingTokens = await limiter.removeTokens(1);
    const body = await request.json();
    const updateAnswer: answerType = {
        id: body.id,
        fromUserId: body.fromUserId,
        bugId: body.bugId,
        answer: body.answer
    }
    const { id } = body;
    const answerIndex: number = getAnswerIndexById(id);
    answers.splice(answerIndex, 1);
    try{fs.writeFileSync(filePath, JSON.stringify({ answers }, null, 2));}
    catch(error){return withCORS(NextResponse.json({ error: "Failed to write data" }, { status: 500 }));}
    return withCORS(NextResponse.json(answers));
}