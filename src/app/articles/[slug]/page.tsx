// src/app/articles/[slug]/page.tsx

import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/api";
import { ArticleContent } from "../../../lib/article";
import { getCommentsByArticle } from "../../../lib/api";

type Props = {
  params: { slug: string };
};

// 👇 SEO dinamic
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);

  if (!article) return { title: "Articol inexistent" };

  const description =
    typeof article.content === "string"
      ? article.content.slice(0, 150) + "..."
      : "Citește articolul complet.";

  return {
    title: article.title,
    description,
    openGraph: {
      title: article.title,
      description,
      type: "article",
      url: `https://exemplu.ro/articles/${params.slug}`,
      images: article.cover
        ? [`http://localhost:1337${article.cover.url}`]
        : undefined,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug);

  if (!article) notFound();

  const comments = await getCommentsByArticle(params.slug);

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-500 mb-6">
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
          alt={`Cover pentru ${article.title}`}
          className="w-full max-h-96 object-cover rounded-lg mb-8"
        />
      )}

      <ArticleContent content={article.content} />

      {/* 👇 Comentarii */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Comentarii</h2>
        {comments.length === 0 ? (
          <p className="text-gray-500">Nu există comentarii încă.</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="border p-4 rounded-md bg-white shadow-sm"
              >
                <div className="font-semibold">{comment.name}</div>
                <p className="text-sm text-gray-700 mt-1">{comment.text}</p>
                <div className="text-xs text-gray-400 mt-2">
                  {new Date(comment.createdAt).toLocaleString("ro-RO")}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </article>
  );
}
