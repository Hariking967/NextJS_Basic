import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const { userId } = await request.json();
    const response = NextResponse.json({ success: true });
    response.cookies.set({
        name: 'loggedin',
        value: String(userId),
        httpOnly: true,
        secure: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7
    });
    return response;
}

export async function GET(request: NextRequest) {
    const cookie = request.cookies.get('loggedin');
    return NextResponse.json({ loggedin: cookie?.value });
}
