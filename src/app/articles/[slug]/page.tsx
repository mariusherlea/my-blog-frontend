// src/app/articles/[slug]/page.tsx

import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/api";
import { ArticleContent } from "../../../lib/article"; // importă componenta

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

      {/* Folosește ArticleContent pentru a reda conținutul structurat */}
      <ArticleContent content={article.content} />
    </article>
  );
}
