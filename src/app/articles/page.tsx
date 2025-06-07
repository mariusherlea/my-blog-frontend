// src/app/articles/page.tsx
import Link from "next/link";
import { getArticles } from "@/lib/api";

type Props = {
  searchParams?: { page?: string };
};

export default async function ArticlesPage({ searchParams }: Props) {
  const currentPage = parseInt(searchParams?.page || "1", 10);
  const pageSize = 6;

  const { articles, pagination } = await getArticles(currentPage, pageSize);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Articole</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/articles/${article.slug}`}
            className="group block border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white"
          >
            {article.cover && (
              <img
                src={`http://localhost:1337${article.cover.url}`}
                alt={`Cover pentru ${article.title}`}
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
    </div>
  );
}

// Controale simple pentru paginare:
function PaginationControls({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  return (
    <div className="mt-8 flex justify-center gap-4">
      {currentPage > 1 && (
        <Link
          href={`/articles?page=${currentPage - 1}`}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          « Anterior
        </Link>
      )}

      <span className="px-4 py-2 border rounded bg-blue-100 font-semibold">
        Pagina {currentPage} din {totalPages}
      </span>

      {currentPage < totalPages && (
        <Link
          href={`/articles?page=${currentPage + 1}`}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Următor →
        </Link>
      )}
    </div>
  );
}
