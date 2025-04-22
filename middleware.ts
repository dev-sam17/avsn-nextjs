// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';

// export default NextAuth(authConfig).auth;

// export const config = {
//     // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
//     matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// };  

// middleware.ts
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextRequest, NextResponse } from "next/server";

// Create the base auth middleware
const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
    // Create a modifiable NextResponse
    const response = NextResponse.next();

    // Add your custom cookie here
    response.cookies.set("currentPath", req.nextUrl.pathname, {
        path: "/",
        httpOnly: false,
    });

    return response;
})

// Match all routes except static/image/api
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
