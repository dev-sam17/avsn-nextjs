// app/sitemap.xml/route.ts
import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma'

export async function GET() {
    const baseUrl = 'https://www.avschoolofnursing.in'; // ← Change to your prod domain

    // Fetch dynamic slugs from DB
    // const posts = await prisma.post.findMany({
    //     select: { slug: true, updatedAt: true },
    // });

    // Static routes
    const staticUrls = [
        { path: '/', lastmod: new Date() },
        { path: '/about', lastmod: new Date() },
        { path: '/about/our-mission', lastmod: new Date() },
        { path: '/about/our-story', lastmod: new Date() },
        { path: '/about/principal-message', lastmod: new Date() },
        { path: '/activities', lastmod: new Date() },
        { path: '/campus', lastmod: new Date() },
        { path: '/campus/faculty', lastmod: new Date() },
        { path: '/campus/hostel', lastmod: new Date() },
        { path: '/campus/laboratory', lastmod: new Date() },
        { path: '/campus/library', lastmod: new Date() },
        { path: '/contact', lastmod: new Date() },
        { path: '/courses', lastmod: new Date() },
        { path: '/courses/anm', lastmod: new Date() },
        { path: '/courses/gnm', lastmod: new Date() },
    ];

    // Build XML entries
    const urls = [
        ...staticUrls.map(({ path, lastmod }) => `
      <url>
        <loc>${baseUrl}${path}</loc>
        <lastmod>${lastmod.toISOString()}</lastmod>
      </url>`),

        //     ...posts.map(({ slug, updatedAt }) => `
        //   <url>
        //     <loc>${baseUrl}/blog/${slug}</loc>
        //     <lastmod>${updatedAt.toISOString()}</lastmod>
        //   </url>`),
    ].join('');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`.trim();

    return new NextResponse(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
