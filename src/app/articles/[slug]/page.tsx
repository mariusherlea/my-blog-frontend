// src/app/articles/[slug]/page.tsx

import { notFound } from "next/navigation";
import { getArticleBySlug, getCommentsByArticle } from "@/lib/api";
import ArticleContent from "../../components/ArticleContent"; // asigură-te că există
import CommentForm from "../../components/CommentForm";
import SubscribeForm from "@/app/components/SubscribeForm";

type Props = {
  params: { slug: string };
};

export default async function ArticlePage({ params }: Props) {
  const articleResponse = await getArticleBySlug(params.slug);
  const article = articleResponse?.data?.[0];
  if (!article) notFound();

  const commentsResponse = await getCommentsByArticle(params.slug);
  const comments = commentsResponse?.data || [];

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

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Comentarii</h2>
        {comments.length === 0 ? (
          <p className="text-gray-500">Nu există comentarii încă.</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="border p-4 rounded-md bg-green-300 shadow-sm"
              >
                <div className="font-semibold text-blue-400">{comment.authorName}</div>
                <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
                <div className="text-xs text-gray-400 mt-2">
                  {new Date(comment.createdAt).toLocaleString("ro-RO")}
                </div>
              </li>
            ))}
          </ul>
        )}

        <CommentForm articleId={article.id} />
      </section>
       <main className="space-y-8 p-6">
      <h1 className="text-3xl font-bold">Bine ai venit pe blog!</h1>
      <p>Primește notificări pe email despre cele mai noi articole.</p>
      <SubscribeForm />
    </main>
    </article>
  );
}
