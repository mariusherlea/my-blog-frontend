//src/lib/api.ts

export async function getArticles(page = 1, pageSize = 6) {
  const res = await fetch(
    `http://localhost:1337/api/articles?populate=cover&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  );
  if (!res.ok) throw new Error("Eroare la preluarea articolelor");
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
}

export async function getArticleBySlug(slug: string) {
  const res = await fetch(`http://localhost:1337/api/articles?filters[slug][$eq]=${slug}&populate=*`);
  if (!res.ok) throw new Error("Eroare la preluarea articolului");
  return await res.json();
}

export async function getCommentsByArticle(slug: string) {
  // const res = await fetch(`http://localhost:1337/api/comments?filters[article][slug][$eq]=${slug}&populate=*`);
  const res = await fetch(`http://localhost:1337/api/comments?filters[article][slug][$eq]=${slug}&filters[approved][$eq]=true&populate=*`);
  
  if (!res.ok) throw new Error("Eroare la preluarea comentariilor");
  return await res.json();
}

export async function postComment(articleId: number, content: string, authorName: string) {
  const res = await fetch("http://localhost:1337/api/comments", {
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


