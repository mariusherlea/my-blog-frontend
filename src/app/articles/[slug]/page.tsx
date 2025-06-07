import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/api";
import { ArticleContent } from "@/lib/article";

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticleBySlug(params.slug);

  if (!article) notFound();

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

      <ArticleContent content={article.content} />
    </article>
  );
}
