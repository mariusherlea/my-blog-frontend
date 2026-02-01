// src/app/articles/[slug]/page.tsx

import { notFound } from "next/navigation";
import { getArticleBySlug, getCommentsByArticle } from "@/lib/api";
import ArticleContent from "../../components/ArticleContent";
import CommentForm from "../../components/CommentForm";
// import SubscribeForm from "@/app/components/SubscribeForm";
import Link from "next/link";
import type { Metadata } from "next";
import TableOfContents from "@/app/components/TableOfContents";
import { getMediaUrl } from "@/lib/media";

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

/* ---------------- METADATA ---------------- */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;

  const articleResponse = await getArticleBySlug(slug);
  const article = articleResponse?.data?.[0];

  if (!article) {
    return {
      title: "Article not found",
      description: "The requested article does not exist.",
    };
  }

  return {
    title: article.title,
    description: article.excerpt ?? article.title,
  };
}


export default async function ArticlePage({ params }: ArticlePageProps) {
  // ⚡ Next 15.3 tipurile stricte cer să aștepți `params`
  const { slug } = await params;

  // 🔹 obținem articolul după slug
  const articleResponse = await getArticleBySlug(slug);
  const article = articleResponse?.data?.[0];
  if (!article) notFound();

  // console.log("ARTICLE RAW:", JSON.stringify(article, null, 2));
// console.log("ARTICLE.CONTENT:", JSON.stringify(article.content, null, 2));

const toc = article.content
  .filter(
    (block: any) =>
      block.type === "heading" && (block.level === 2 || block.level === 3)
  )
  .map((block: any) => {
    const text = block.children.map((c: any) => c.text).join("");
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    return {
      id,
      text,
      level: block.level,
    };
  });

  console.log(article.title);
  console.log(article.cover.url);

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
    src={getMediaUrl(article.cover.url)}
    alt={`Cover pentru ${article.title}`}
    className="w-full max-h-96 object-cover rounded-lg mb-8"
  />
)}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12">
  <ArticleContent content={article.content} />
  <TableOfContents items={toc} />
</div>

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
                <div className="text-xs text-green-400 mt-2">
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

