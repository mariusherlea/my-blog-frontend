// src/app/articles/pagination-controls.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function PaginationControls({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-4 py-2 bg-red-200 rounded disabled:opacity-50"
      >
        Înapoi
      </button>

      <span>
        Pagina {currentPage} din {totalPages}
      </span>

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-4 py-2 bg-red-200 rounded disabled:opacity-50"
      >
        Înainte
      </button>
    </div>
  );
}
