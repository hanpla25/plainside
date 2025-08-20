"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

// --- Utils ---
import generatePagination from "@/app/utils/generate-pagination";

// --- Icons ---
import { ChevronLeft, ChevronRight } from "lucide-react";

// --- UI ---
import PaginationForm from "./PaginationForm";

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
      className={`flex items-center justify-center text-sm h-9 w-9  ${
        isActive ? "text-white bg-neutral-800 rounded" : "text-neutral-500"
      }`}
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
  const searchParams = useSearchParams();
  const { abbr = "best" } = useParams();

  const pageGroup = generatePagination(currentPage, totalPage);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `/${abbr}?${params.toString()}`;
  };

  return (
    <div className="mt-6 flex flex-col items-center">
      <div className="w-auto flex justify-center items-center gap-2">
        {/* 이전 버튼 */}
        {currentPage === 1 ? (
          <Link href={"#"} className="px-2 md:px-0">
            <ChevronLeft color="#b3b3b3" />
          </Link>
        ) : (
          <PaginationArrow
            href={createPageURL(currentPage - 1)}
            direction="left"
          />
        )}

        {/* 페이지 그룹 */}
        <div className="flex w-full md:w-auto md:space-x-2">
          {pageGroup.map((page, i) => (
            <PaginationNumber
              key={`${page}-${i}`}
              page={page}
              href={createPageURL(page)}
              isActive={currentPage === page}
            />
          ))}
        </div>

        {/* 다음 버튼 */}
        {currentPage === totalPage ? (
          <Link href={"#"} className="px-2 md:px-0">
            <ChevronRight color="#b3b3b3" />
          </Link>
        ) : (
          <PaginationArrow
            href={createPageURL(currentPage + 1)}
            direction="right"
          />
        )}
      </div>
      <PaginationForm
        totalPage={totalPage}
        searchParams={searchParams}
        abbr={abbr}
      />
    </div>
  );
}
