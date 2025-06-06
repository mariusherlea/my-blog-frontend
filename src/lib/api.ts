// lib/api.ts
const API_URL = "http://localhost:1337/api";

export const getArticles = async () => {
  const res = await fetch(`${API_URL}/articles?populate=cover`);
  const data = await res.json();

  // Console log să vezi structura completă (poți șterge după ce verifici)
  console.log("getArticles response:", JSON.stringify(data, null, 2));

  return data.data.map((item: any) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    cover: item.cover,
    publishedAt: item.publishedAt,
  }));
};

export async function getArticleBySlug(slug: string) {
  const res = await fetch(
    `${API_URL}/articles?filters[slug][$eq]=${slug}&populate=cover`,
    { next: { revalidate: 60 } }
  );
  const data = await res.json();

  console.log("getArticleBySlug response:", JSON.stringify(data, null, 2));

  if (!data.data || data.data.length === 0) return null;

  const article = data.data[0];
  return {
    id: article.id,
    ...article.attributes,
  };
}
