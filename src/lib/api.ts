const API_URL = "http://localhost:1337/api";

export const getArticles = async (page: number = 1, pageSize: number = 6) => {
  const res = await fetch(
    `${API_URL}/articles?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=cover`,
    { cache: "no-store" }
  );

  const data = await res.json();

  return {
    articles: data.data.map((item: any) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt,
      cover: item.cover || null,
      publishedAt: item.publishedAt || item.createdAt,
    })),
    pagination: data.meta.pagination,
  };
};
export async function getArticleBySlug(slug: string) {
  const res = await fetch(
    `${API_URL}/articles?filters[slug][$eq]=${slug}&populate=cover`,
    { next: { revalidate: 60 } }
  );
  const data = await res.json();

  if (!data.data || data.data.length === 0) return null;
  const item = data.data[0];
  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    content: item.content,
    cover: item.cover || null,
    publishedAt: item.publishedAt || item.createdAt,
  };
}
