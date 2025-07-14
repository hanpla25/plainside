import generatePage from "@/app/utils/generate-page";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import Link from "next/link";

type Props = {
  currentPage: number;
  totalPages: number;
  option?: string;
  search?: string;
};

export default function Pagination({
  currentPage,
  totalPages,
  option,
  search,
}: Props) {
  const { pages, hasPrev, hasNext, prevPage, nextPage } = generatePage(
    currentPage,
    totalPages
  );

  const makeUrl = (page: number) => {
    const params = new URLSearchParams();
    if (option) params.set("option", option);
    if (search) params.set("search", search);
    params.set("page", String(page));
    return `/?${params.toString()}`;
  };

  return (
    <div className="mt-4 flex justify-center gap-1 items-center text-sm">
      {hasPrev && (
        <>
          <Link href={makeUrl(1)}>
            <ChevronsLeft />
          </Link>
          <Link href={makeUrl(prevPage)} className="px-2 py-1 hover:underline">
            이전
          </Link>
        </>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={makeUrl(page)}
          className={`px-2 py-1 border rounded ${
            page === currentPage
              ? "bg-neutral-800 text-white font-bold"
              : "hover:bg-neutral-200"
          }`}
        >
          {page}
        </Link>
      ))}

      {hasNext && (
        <>
          <Link href={makeUrl(nextPage)} className="px-2 py-1 hover:underline">
            다음
          </Link>
          <Link href={makeUrl(totalPages)}>
            <ChevronsRight />
          </Link>
        </>
      )}
    </div>
  );
}
