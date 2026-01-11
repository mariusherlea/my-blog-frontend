// src/app/sitemap.xml/route.ts
import { getArticles } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://exemplu.ro"; // 🔁 schimbă cu domeniul tău Vercel

  try {
    const { articles } = await getArticles(1, 100);

    const urls = articles
      .map(
        (article: any) => `
  <url>
    <loc>${baseUrl}/articles/${article.slug}</loc>
    <lastmod>${new Date(article.publishedAt).toISOString()}</lastmod>
  </url>`
      )
      .join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
  </url>
  ${urls}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: { "Content-Type": "application/xml" },
    });
  } catch (error) {
    // 🚑 Fallback — NU crăpăm build-ul
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
  </url>
</urlset>`;

    return new NextResponse(fallbackSitemap, {
      headers: { "Content-Type": "application/xml" },
    });
  }
}
