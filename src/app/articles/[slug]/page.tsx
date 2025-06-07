// src/app/articles/[slug]/page.tsx
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
    <article className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        Publicat la:{" "}
        {new Date(article.publishedAt).toLocaleDateString("ro-RO", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      {article.cover && (
        <img
          src={`http://localhost:1337${article.cover.url}`}
          alt={article.cover.alternativeText || article.title}
          className="w-full h-auto rounded-xl mb-6"
        />
      )}

      <ArticleContent content={article.content} />
    </article>
  );
}
