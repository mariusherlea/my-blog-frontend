//src/app/articles/page.tsx
import Link from "next/link";
import { getArticles } from "@/lib/api";
import { getMediaUrl } from "@/lib/media";

export const dynamicParams = true;
export async function generateStaticParams() {
  return [];
}

type ArticleListPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function ArticlePage({ searchParams }: ArticleListPageProps) {
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page, 10) : 1;
  const pageSize = 6;

  const { articles, pagination } = await getArticles(currentPage, pageSize);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Articole</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article: any) => (
          <Link
  key={article.id}
  href={`/articles/${article.slug}`}
  className="group block border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white"
>
  <div>
    {article.cover && (
      <img
        src={article.cover}
        alt={article.title}
        className="w-full h-48 object-cover border-4 border-red-500"
      />
    )}

    <div className="p-4 flex flex-col justify-between h-full">
      <h2 className="text-xl font-semibold group-hover:text-blue-600 mb-2">
        {article.title}
      </h2>
      <p className="text-gray-600 text-sm mb-3">{article.excerpt}</p>
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
        Page {currentPage} din {totalPages}
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
