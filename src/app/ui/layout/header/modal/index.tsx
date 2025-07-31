import { useState } from "react";
import SearchForm from "./SearchForm";
import SearchResult from "./SearchResult";
import { GallMeta } from "@/app/lib/definitions";

type Props = {
  onClick: () => void;
  gallList: GallMeta[];
};

export default function SearchModal({ onClick, gallList }: Props) {
  const [query, setQuery] = useState("");

  return (
    <div className="fixed inset-0 z-50 bg-black/10" onClick={onClick}>
      <div className="absolute top-[60px] left-0 w-full">
        <div
          className="lg:max-w-md bg-white shadow-lg p-4 w-full mx-auto rounded-md"
          onClick={(e) => e.stopPropagation()}
        >
          <SearchForm query={query} setQuery={setQuery} />
          <SearchResult query={query} gallList={gallList} />
          <button
            onClick={onClick}
            className="text-neutral-500 text-right w-full"
            aria-label="닫기"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
