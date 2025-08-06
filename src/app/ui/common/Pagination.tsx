"use client";

import Link from "next/link";

// --- Utils ---
import generatePagination from "@/app/utils/generate-pagination";

// --- Icons ---
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";

function PaginationArrow({
  href,
  direction,
}: {
  href: string;
  direction: "left" | "right";
}) {
  const arrow = direction === "left" ? <ChevronLeft /> : <ChevronRight />;

  return (
    <Link href={href} className="px-2 md:px-0">
      {arrow}
    </Link>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
}: {
  page: number | string;
  href: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-center text-sm h-9 ${
        typeof page === "number" ? "w-full md:w-9" : "w-9"
      } ${isActive ? "text-white bg-neutral-800 rounded" : "text-neutral-500"}`}
    >
      {page}
    </Link>
  );
}

export default function Pagination({
  currentPage,
  totalPage,
}: {
  currentPage: number;
  totalPage: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageGroup = generatePagination(currentPage, totalPage);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="mt-6 w-full flex flex-col items-center">
      <div className="w-full md:w-auto flex justify-between md:justify-center items-center gap-0 md:gap-2">
        {/* 이전 버튼 */}
        {currentPage > 1 && (
          <PaginationArrow
            href={createPageURL(currentPage - 1)}
            direction="left"
          />
        )}

        {/* 페이지 그룹 */}
        <div className="flex w-full md:w-auto justify-between md:space-x-2">
          {pageGroup.map((page, i) =>
            page === "..." ? (
              <div
                key={i}
                className="flex items-center justify-center w-full md:w-9 text-neutral-400"
              >
                <Ellipsis className="w-4 h-4" />
              </div>
            ) : (
              <PaginationNumber
                key={`${page}-${i}`}
                page={page}
                href={createPageURL(page)}
                isActive={currentPage === page}
              />
            )
          )}
        </div>

        {/* 다음 버튼 */}
        {currentPage < totalPage && (
          <PaginationArrow
            href={createPageURL(currentPage + 1)}
            direction="right"
          />
        )}
      </div>
    </div>
  );
}
