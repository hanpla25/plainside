"use client";

import { usePathname, useSearchParams } from "next/navigation";

const style = "border border-neutral-300 rounded-sm outline-none";

export default function PostSearchForm() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const option = searchParams.get("option") ?? "title";

  return (
    <div className="flex justify-center mt-4">
      <form
        className="flex gap-1 w-full max-w-sm"
        action={`${pathname}`}
        method="get"
      >
        <select
          name="option"
          id="option"
          className={style}
          defaultValue={option}
        >
          <option value="title">제목</option>
          <option value="user_name">닉네임</option>
        </select>
        <label htmlFor="search" className="sr-only">
          검색
        </label>
        <input
          type="text"
          id="search"
          name="search"
          defaultValue={search}
          className={`${style} flex-1 min-w-0`}
        />
        <button type="submit" className={`${style} px-4`}>
          검색
        </button>
      </form>
    </div>
  );
}
