import generatePagination from "@/app/utils/generate-page";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import Link from "next/link";

type Props = {
  href: string;
  currentPage: number;
  totalPages: number;
  option?: string;
  search?: string;
  mode?: string;
};

export default function Pagination({
  href,
  currentPage,
  totalPages,
  option,
  search,
  mode,
}: Props) {
  const { pages, hasPrev, hasNext, prevPage, nextPage } = generatePagination(
    currentPage,
    totalPages
  );

  const makeUrl = (page: number) => {
    const params = new URLSearchParams();
    if (mode) params.set("mode", mode);
    if (option) params.set("option", option);
    if (search) params.set("search", search);
    params.set("page", String(page));
    return `${href}?${params.toString()}`;
  };

  return (
    <div className="flex items-center flex-col mt-4">
      <div className="mt-4 flex justify-center gap-1 items-center text-sm">
        {hasPrev && (
          <>
            <Link href={makeUrl(1)}>
              <ChevronsLeft />
            </Link>
            <Link
              href={makeUrl(prevPage)}
              className="px-2 py-1 hover:underline"
            >
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
            <Link
              href={makeUrl(nextPage)}
              className="px-2 py-1 hover:underline"
            >
              다음
            </Link>
            <Link href={makeUrl(totalPages)}>
              <ChevronsRight />
            </Link>
          </>
        )}
      </div>
      <form action={`${href}`} method="get" className="mt-4 space-x-2">
        {option && <input type="hidden" name="option" value={option} />}
        {search && <input type="hidden" name="search" value={search} />}
        {mode && <input type="hidden" name="mode" value={mode} />}

        <label htmlFor="page" className="sr-only">
          페이지
        </label>
        <input
          id="page"
          name="page"
          type="text"
          className="w-12 h-10 border border-neutral-400 rounded-md p-1 text-center"
        />
        <span>/{totalPages}</span>
        <button className="w-12 h-10 rounded-md border border-neutral-600 bg-neutral-400 text-white cursor-pointer">
          이동
        </button>
      </form>
    </div>
  );
}
