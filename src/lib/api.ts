//src/lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

export async function getArticles(page = 1, pageSize = 6) {
  const res = await fetch(
    `${API_URL}/api/articles?populate=cover&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error("Eroare la preluarea articolelor");
  const data = await res.json();

  return {
    articles: data.data.map((item: any) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt,
      cover: item.cover?.data?.url || null,
      publishedAt: item.publishedAt || item.createdAt,
    })),
    pagination: data.meta.pagination,
  };
}

export async function getArticleBySlug(slug: string) {
  const res = await fetch(`${API_URL}/api/articles?filters[slug][$eq]=${slug}&populate=*`);
  if (!res.ok) throw new Error("Eroare la preluarea articolului");
  return await res.json();
}

export async function getCommentsByArticle(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/comments?filters[article][slug][$eq]=${slug}&filters[approved][$eq]=true&populate=*`,
    { cache: "no-store" } // ca să vezi imediat schimbările
  );

  if (!res.ok) {
    console.error("Eroare la fetch comments:", res.status);
    return { data: [] };
  }

  return res.json();
}


export async function postComment(articleId: number, content: string, authorName: string) {
  const res = await fetch(`${API_URL}/api/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: {
        content,
        authorName,
        approved: false,
        article: articleId,
      },
    }),
  });

  if (!res.ok) {
    throw new Error("Eroare la trimiterea comentariului");
  }

  return await res.json();
}

export async function getAllComments() {
  const res = await fetch(`${API_URL}/api/comments?populate=article`);
  if (!res.ok) throw new Error("Eroare la preluarea comentariilor");

  const data = await res.json();

  return data.data.map((item: any) => ({
    id: item.id,
    content: item.content,
    authorName: item.authorName,
    approved: item.approved,
    articleTitle: item.article?.title || "necunoscut",
  }));
}

export async function approveComment(id: number) {
  const res = await fetch(`${API_URL}/api/comments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: { approved: true },
    }),
  });

  if (res.status === 404) {
    console.warn(`Comentariul cu ID ${id} nu a fost găsit (404).`);
    return { status: "not_found", id };
  }

  if (!res.ok) {
    throw new Error("Eroare la aprobarea comentariului");
  }

  return await res.json();
}

export async function deleteComment(id: number) {
  const res = await fetch(`${API_URL}/api/comments/${id}`, {
    method: "DELETE",
  });

  if (res.status === 404) {
    console.warn(`Comentariul cu ID ${id} nu a fost găsit (404) la ștergere.`);
    return { status: "not_found", id };
  }

  if (!res.ok) {
    throw new Error("Eroare la ștergerea comentariului");
  }

  return await res.json();
}

export async function getUnapprovedComments() {
  const res = await fetch(`${API_URL}/api/comments?filters[approved][$eq]=false&populate=article`);
  if (!res.ok) throw new Error("Eroare la preluarea comentariilor neaprobate");
  return await res.json();
}

export async function getAllArticles() {
  const res = await fetch(
    `${API_URL}/api/articles?fields=slug,updatedAt`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch articles for sitemap");
  }

  return res.json();
}
