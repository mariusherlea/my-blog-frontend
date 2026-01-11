// src/app/articles/[slug]/page.tsx

import { notFound } from "next/navigation";
import { getArticleBySlug, getCommentsByArticle } from "@/lib/api";
import ArticleContent from "../../components/ArticleContent";
import CommentForm from "../../components/CommentForm";
// import SubscribeForm from "@/app/components/SubscribeForm";
import Link from "next/link";

export const dynamic = "force-dynamic";
// 👉 indicăm Next-ului că pagina poate fi generată dinamic
export const dynamicParams = true;

export async function generateStaticParams() {
  // dacă nu vrei să pregenerezi articole, poți lăsa lista goală
  return [];
}

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  // ⚡ Next 15.3 tipurile stricte cer să aștepți `params`
  const { slug } = await params;

  // 🔹 obținem articolul după slug
  const articleResponse = await getArticleBySlug(slug);
  const article = articleResponse?.data?.[0];
  if (!article) notFound();

  // console.log("ARTICLE RAW:", JSON.stringify(article, null, 2));
// console.log("ARTICLE.CONTENT:", JSON.stringify(article.content, null, 2));

  // 🔹 obținem comentariile
  const commentsResponse = await getCommentsByArticle(slug);
  const comments = commentsResponse?.data || [];

  return (


    
    <article className="max-w-3xl mx-auto px-4 py-8">

<Link
  href="/"
  className="inline-flex items-center text-sm text-blue-600 hover:underline mb-6"
>
  ← Back
</Link>

      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-500 mb-6">
        Published at:{" "}
        {new Date(article.publishedAt).toLocaleDateString("ro-RO", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      {article.cover && (
        <img
          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${article.cover.url}`}
          alt={`Cover pentru ${article.title}`}
          className="w-full max-h-96 object-cover rounded-lg mb-8"
        />
      )}

      <ArticleContent content={article.content} />

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        {comments.length === 0 ? (
          <p className="text-gray-500">Not comments yet.</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((comment: any) => (
              <li key={comment.id} className="border p-4 rounded-md shadow-sm">
                <div className="font-semibold text-blue-400">
                  {comment.authorName}
                </div>
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

      {/* <main className="space-y-8 p-6">
        <h1 className="text-3xl font-bold">Bine ai venit pe blog!</h1>
        <p>Primește notificări pe email despre cele mai noi articole.</p>
        <SubscribeForm />
      </main> */}
    </article>
  );
}

