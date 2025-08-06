import { useState } from "react";

// --- UI ---
import SearchForm from "./SearchForm";
import SearchResult from "./SearchResult";

type Props = {
  onClick: () => void;
  gallList: {
    name: string;
    abbr: string;
  }[];
};

export default function SearchModal({ onClick, gallList }: Props) {
  const [query, setQuery] = useState("");

  return (
    // --- 화면 전체---
    <div className="fixed inset-0 z-50 bg-black/10" onClick={onClick}>
      {/* 모달 영역 */}
      <div className="absolute top-[60px] left-0 w-full">
        {/* 모달 내부 */}
        <div
          className="lg:max-w-md bg-white shadow-lg p-4 w-full mx-auto rounded-md"
          onClick={(e) => e.stopPropagation()}
        >
          <SearchForm query={query} setQuery={setQuery} />
          <SearchResult query={query} gallList={gallList} />

          {/* 모달 내부 하단 */}
          <div className="flex justify-end mt-2">
            <button
              className="text-neutral-500"
              aria-label="닫기"
              onClick={onClick}
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
