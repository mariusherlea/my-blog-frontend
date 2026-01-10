// src/app/articles/page.tsx
import { getArticles } from "@/lib/api";
import Link from "next/link";
import PaginationControls from "@/app/components/PaginationControls";
import SubscribeForm from "./components/SubscribeForm";

export default async function ArticlesPage(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = parseInt(searchParams?.page || "1", 10);
  const pageSize = 6;

  const { articles, pagination } = await getArticles(currentPage, pageSize);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Toate articolele</h1>

<div className="relative z-50">
  <Link href={`/articles/${articles.slug}`}>
    TEST LINK
  </Link>
</div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article: any) => (
          <Link
            key={article.id}
            href={`/articles/${article.slug}`}
            className="group block border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white"
          >
            {article.cover && (
              <img
                src={`http://localhost:1337${article.cover.url}`}
                alt={`cover for ${article.title}`}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            )}
            <div className="p-4 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-xl font-semibold group-hover:text-blue-600 transition-colors duration-200 mb-2">
                  {article.title}
                </h2>
                <p className="text-gray-600 text-sm mb-3">{article.excerpt}</p>
              </div>
              <div className="mt-auto flex justify-between items-center">
                <p className="text-xs text-gray-500">
                  {new Date(article.publishedAt).toLocaleDateString("ro-RO", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <span className="text-sm text-blue-600 font-medium hover:underline">
                  Citește mai mult →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <PaginationControls
        currentPage={pagination.page}
        totalPages={pagination.pageCount}
      />
      <main className="space-y-8 p-6">
        <h1 className="text-3xl font-bold">Bine ai venit pe blog!</h1>
        <p>Primește notificări pe email despre cele mai noi articole.</p>
        <SubscribeForm />
      </main>
    </div>
  );
}
