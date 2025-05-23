import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    console.log(request.url);
    return NextResponse.redirect(new URL('/signup', request.url));


    // const cookie = request.cookies.get('isLoggedIn')
    // const isLoggedIn = cookie?.value === 'true';
    // const url = request.nextUrl.pathname;
    
    // if (!isLoggedIn)
    // {
    //     if (url == '/' || url == '/signup' || url == '/signin')
    //     {
    //         return NextResponse.next();
    //     }
    //     return NextResponse.redirect(new URL('/signup', request.url));
    // }
    // return NextResponse.next();
}