const API_URL = "http://localhost:1337/api";

export const getArticles = async () => {
  const res = await fetch(`${API_URL}/articles?populate=cover`);
  const data = await res.json();

  return data.data.map((item: any) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    cover: item.cover || null,
    publishedAt: item.publishedAt || item.createdAt,
  }));
};

export async function getArticleBySlug(slug: string) {
  const res = await fetch(
    `${API_URL}/articles?filters[slug][$eq]=${slug}&populate=cover`,
    { next: { revalidate: 60 } }
  );
  const data = await res.json();

  if (!data.data || data.data.length === 0) return null;
  return data.data[0]; // articolul direct, fără attributes
}
