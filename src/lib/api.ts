//src/lib/api.ts
const API_URL = "http://localhost:1337/api";

export const getArticles = async (page = 1, pageSize = 5) => {
  const res = await fetch(
    `${API_URL}/articles?populate=cover&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
    { next: { revalidate: 60 } }
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

export async function getCommentsByArticle(slug: string) {
  const res = await fetch(
    `${API_URL}/comments?filters[article][slug][$eq]=${slug}&filters[approved][$eq]=true&populate=article`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch comments");
  }

  const data = await res.json();
  return data.data;
}
