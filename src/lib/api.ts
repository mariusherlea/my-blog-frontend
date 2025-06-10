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

  return data.data.map((item: any) => ({
    id: item.id,
    content: item.content,
    authorName: item.authorName,
    createdAt: item.createdAt,
  }));
}



export async function getUnapprovedComments() {
  const res = await fetch(
    `http://localhost:1337/api/comments?filters[approved][$eq]=false&populate=article`,
    {
      cache: "no-store", // mereu proaspăt
    }
  );

  const data = await res.json();
  return data.data;
}

export async function approveComment(id: number) {
  const res = await fetch(`http://localhost:1337/api/comments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.STRAPI_ADMIN_TOKEN}`, // token secret
    },
    body: JSON.stringify({
      data: {
        approved: true,
      },
    }),
  });

  if (!res.ok) throw new Error("Aprobarea a eșuat");
  return res.json();
}

export async function postComment(articleId: number, content: string, authorName: string) {
  const res = await fetch(`${API_URL}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        content,
        authorName,
        article: articleId,
        approved: false,
      },
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to post comment");
  }

  return res.json();
}
