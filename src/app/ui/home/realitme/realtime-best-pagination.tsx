"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function RealtimeBestPagination({
  totalPages,
}: {
  totalPages: number;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page") || "1");
  const groupSize = 5;

  const currentGroup = Math.floor((currentPage - 1) / groupSize);
  const groupStart = currentGroup * groupSize + 1;
  const groupEnd = Math.min(groupStart + groupSize - 1, totalPages);

  const goToPage = (page: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", String(page));
    router.push(`/?${newParams.toString()}`);
  };

  return (
    <div className="mt-4 flex justify-center gap-1 items-center text-sm">
      {groupStart > 1 && (
        <button
          onClick={() => goToPage(groupStart - 1)}
          className="flex items-center gap-1 px-2 py-1 text-gray-600 hover:underline"
        >
          <ChevronLeft size={14} />
          이전
        </button>
      )}

      {Array.from({ length: groupEnd - groupStart + 1 }, (_, i) => {
        const page = groupStart + i;
        const isActive = page === currentPage;

        return (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`px-2 py-1 border rounded ${
              isActive
                ? "bg-neutral-800 text-white font-bold"
                : "hover:bg-neutral-200"
            }`}
          >
            {page}
          </button>
        );
      })}

      {groupEnd < totalPages && (
        <button
          onClick={() => goToPage(groupEnd + 1)}
          className="flex items-center gap-1 px-2 py-1 text-gray-600 hover:underline"
        >
          다음
          <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}
