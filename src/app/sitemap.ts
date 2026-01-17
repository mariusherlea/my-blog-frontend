import { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  // homepage + pagini statice
  const staticRoutes = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
    },
  ];

  // articole dinamice
  const articlesResponse = await getAllArticles();
  const articles = articlesResponse?.data ?? [];

  const articleRoutes = articles.map((article: any) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article.updatedAt),
  }));

  return [...staticRoutes, ...articleRoutes];
}
