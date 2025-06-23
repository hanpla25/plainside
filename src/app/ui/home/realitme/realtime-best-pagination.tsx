"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import generatePagination from "@/app/utils/generate-pagination";

export default function RealtimeBestPagination({
  totalPages,
}: {
  totalPages: number;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page") || "1");
  const { pages, hasPrev, hasNext, prevPage, nextPage } = generatePagination(
    currentPage,
    totalPages
  );

  const goToPage = (page: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", String(page));
    router.push(`/?${newParams.toString()}`);
  };

  return (
    <div className="mt-4 flex justify-center gap-1 items-center text-sm">
      {hasPrev && (
        <button
          onClick={() => goToPage(prevPage)}
          className="flex items-center gap-1 px-2 py-1 text-gray-600 hover:underline cursor-pointer"
        >
          <ChevronLeft size={14} />
          이전
        </button>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`px-2 py-1 border rounded cursor-pointer ${
            page === currentPage
              ? "bg-neutral-800 text-white font-bold"
              : "hover:bg-neutral-200"
          }`}
        >
          {page}
        </button>
      ))}

      {hasNext && (
        <button
          onClick={() => goToPage(nextPage)}
          className="flex items-center gap-1 px-2 py-1 text-gray-600 hover:underline cursor-pointer"
        >
          다음
          <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}
