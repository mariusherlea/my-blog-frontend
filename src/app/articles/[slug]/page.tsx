//src/app/articles/[slug]/page.tsx
import { notFound } from "next/navigation";
import { ArticleContent } from "@/lib/article";
import { getArticleBySlug } from "@/lib/api";

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const { title, content, publishedAt, cover } = article;

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6">{title}</h1>

      {cover?.data && (
        <img
          src={`http://localhost:1337${cover.data.attributes.url}`}
          alt={title}
          className="w-full max-h-96 object-cover rounded-lg mb-6"
        />
      )}

      <p className="text-gray-500 mb-6">
        Publicat la:{" "}
        {new Date(publishedAt).toLocaleDateString("ro-RO", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </p>

      <ArticleContent content={content} />
    </article>
  );
}
