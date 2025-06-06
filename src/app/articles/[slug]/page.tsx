import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/api";
import { ArticleContent } from "@/lib/article";

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const article = await getArticleBySlug(slug);

  if (!article) return notFound();

  return (
    <article>
      <h1>{article.title}</h1>
      <p>
        Publicat la:{" "}
        {new Date(article.publishedAt).toLocaleDateString("ro-RO", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      {article.cover && (
        <img
          src={article.cover.url}
          alt={article.cover.alternativeText || article.title}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      )}

      <ArticleContent content={article.content} />
    </article>
  );
}
