import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const url = req.nextUrl.pathname;
    const res = NextResponse.next();

    //Middleware to set current: Set a cookie to store current route
    res.cookies.set('currentPath', url, { path: '/' });
    return res;
}

// Apply middleware to all routes
export const config = {
    matcher: '/:path*',
};
