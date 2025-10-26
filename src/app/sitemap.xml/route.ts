import { getArticles } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET() {
  const { articles } = await getArticles(1, 100); // sau un fetch global

  const baseUrl = "https://exemplu.ro";

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${articles
        .map(
          (article:any) => `
        <url>
          <loc>${baseUrl}/articles/${article.slug}</loc>
          <lastmod>${new Date(article.publishedAt).toISOString()}</lastmod>
        </url>
      `
        )
        .join("")}
    </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
