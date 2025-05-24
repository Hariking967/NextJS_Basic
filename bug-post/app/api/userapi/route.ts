import { cookies } from "next/headers";
import data from '../../data/userinfo.json'
import { RateLimiter } from "limiter";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import fs from 'fs';
import path from 'path';
import getUserIndexById from "@/app/lib/getUserIndexById";

const filePath = path.join(process.cwd(),'app', 'data', 'userinfo.json');
console.log(filePath);

let userDatas = data.users;

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
    return withCORS(NextResponse.json(userDatas));
}

export async function POST(request: NextRequest)
{
    if (limiter.getTokensRemaining() <= 0)
    {
        return withCORS(NextResponse.json('Too many requests. Try later!',{status: 429}));
    }
    await limiter.removeTokens(1);
    const body = await request.json();
    const updateUser: userType = {id:body.id, userName: body.username, email : body.email, pwd : body.pwd};
    userDatas.push(updateUser);
    try{fs.writeFileSync(filePath, JSON.stringify({ users: userDatas }, null, 2));}
    catch(error){return withCORS(NextResponse.json({ error: "Failed to write data" }, { status: 500 }));}
    return withCORS(NextResponse.json(userDatas));
}   

export async function PUT(request: NextRequest)
{
    if (limiter.getTokensRemaining() <= 0)
    {
        return withCORS(NextResponse.json('Too many requests. Try later!',{status: 429}));
    }
    await limiter.removeTokens(1);
    const body = await request.json();
    const updateuser: userType = {id:body.id, userName: body.username, email : body.email, pwd : body.pwd};
    const { id, userName, email} = body;
    const userIndex: number = getUserIndexById(id);
    userDatas[userIndex].userName = userName;
    userDatas[userIndex].email = email;
    try
    {fs.writeFileSync(filePath, JSON.stringify({ users: userDatas }, null, 2));}
    catch(error){return withCORS(NextResponse.json({ error: "Failed to write data" }, { status: 500 }));}
    return withCORS(NextResponse.json(userDatas));
}

export async function DELETE(request: NextRequest)
{
    if (limiter.getTokensRemaining() <= 0)
    {
        return withCORS(NextResponse.json('Too many requests. Try later!',{status: 429}));
    }
    await limiter.removeTokens(1);
    const body = await request.json();
    const updateuser: userType = {id:body.id, userName: body.username, email : body.email, pwd : body.pwd};
    const { id } = body;
    const userIndex: number = getUserIndexById(id);
    userDatas.splice(userIndex, 1);
    try{fs.writeFileSync(filePath, JSON.stringify({ users: userDatas }, null, 2));}
    catch(error){return withCORS(NextResponse.json({ error: "Failed to write data" }, { status: 500 }));}
    return withCORS(NextResponse.json(userDatas));
}