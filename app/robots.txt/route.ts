// app/robots.txt/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
    const robots = `
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /login
Disallow: /register
Disallow: /forgot-password
Disallow: /reset-password

Sitemap: https://www.avschoolofnursing.in/sitemap.xml
  `.trim();

    return new NextResponse(robots, {
        headers: {
            'Content-Type': 'text/plain',
        },
    });
}
