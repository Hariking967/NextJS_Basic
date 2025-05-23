import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    const isLoggedIn = request.cookies.get('isLoggedIn');
    const url = request.nextUrl.pathname;
    
    if (!isLoggedIn)
    {
        if (url == '/')
        {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL('/signup', request.url));
    }
    return NextResponse.next();
}