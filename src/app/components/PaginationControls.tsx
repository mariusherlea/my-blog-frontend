// // src/components/PaginationControls.tsx
"use client";

import Link from "next/link";

export function PaginationControls({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  return (
    <div className="flex gap-4 mt-8">
      {currentPage > 1 && (
        <Link href={`?page=${currentPage - 1}`}>← Pagina anterioară</Link>
      )}
      <span>
        Pagina {currentPage} din {totalPages}
      </span>
      {currentPage < totalPages && (
        <Link href={`?page=${currentPage + 1}`}>Pagina următoare →</Link>
      )}
    </div>
  );
}
