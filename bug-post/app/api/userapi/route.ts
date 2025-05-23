import { cookies } from "next/headers";
import data from '../../data/userinfo.json'
import { RateLimiter } from "limiter";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import fs from 'fs';
import path from 'path';
import getUserIndexById from "@/app/lib/getUserIndexById";

const filePath = path.join(process.cwd(), 'data', 'userinfo.json');

let userDatas = data.users;

let limiter = new RateLimiter({
    tokensPerInterval: 5,
    interval : 'second'
})

type userType = {
    id : number,
    userName : string,
    email : string,
    pwd : string
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
        return NextResponse.json(userDatas);
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
    const updateUser: userType = {id:body.id, userName: body.username, email : body.email, pwd : body.pwd};
    userDatas.push(updateUser);
    if (remaingTokens > 0)
    {
        fs.writeFileSync(filePath, JSON.stringify(updateUser));
        return NextResponse.json(userDatas);
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
    const updateuser: userType = {id:body.id, userName: body.username, email : body.email, pwd : body.pwd};
    const { id, userName, email} = body;
    const userIndex: number = getUserIndexById(id);
    userDatas[userIndex].userName = userName;
    userDatas[userIndex].email = email;
    if (remaingTokens > 0)
    {
        fs.writeFileSync(filePath, JSON.stringify(userDatas));
        return NextResponse.json(userDatas);
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
    const updateuser: userType = {id:body.id, userName: body.username, email : body.email, pwd : body.pwd};
    const { id } = body;
    const userIndex: number = getUserIndexById(id);
    userDatas.splice(userIndex, 1);
    if (remaingTokens > 0)
    {
        fs.writeFileSync(filePath, JSON.stringify(userDatas));
        return NextResponse.json(userDatas);
    }
    else
    {
        return NextResponse.json('Too many requests. Try later!',{status: 429});
    }
}