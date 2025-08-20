"use client";

import { useSearchParams } from "next/navigation";
import Form from "next/form";

const style = "border border-neutral-300 rounded-sm outline-none";

function Select({ option }: { option: string }) {
  return (
    <select name="option" id="option" className={style} defaultValue={option}>
      <option value="title">제목</option>
      <option value="user_name">닉네임</option>
    </select>
  );
}

function Input({ search }: { search: string }) {
  return (
    <>
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
    </>
  );
}

function Button() {
  return (
    <button type="submit" className={`${style} px-4 cursor-pointer`}>
      검색
    </button>
  );
}

export default function GallSearchForm({ abbr }: { abbr: string }) {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const option = searchParams.get("option") ?? "title";

  return (
    <div className="flex justify-center mx-2 mt-4">
      <Form action={`/${abbr}`} className="flex gap-1 w-full max-w-sm">
        <Select option={option} />
        <Input search={search} />
        <Button />
      </Form>
    </div>
  );
}
