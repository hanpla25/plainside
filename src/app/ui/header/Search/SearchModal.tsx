import { useRef, useState } from "react";

// --- 타입 ---
import { Gall } from "@/app/lib/definitions";

// --- 훅 ---
import useOnClickOutside from "@/app/hooks/useOnClickOutside";

// --- UI ---
import SearchForm from "./SearchForm";
import SearchResult from "./SearchResult";

export default function SearchModal({
  gallListData,
  closeModal,
}: {
  gallListData: Gall[];
  closeModal: () => void;
}) {
  const [query, setQuery] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(modalRef, () => closeModal());

  return (
    <div
      ref={modalRef}
      className="absolute left-0 z-50 bg-white w-[100vw] border-b border-neutral-200 lg:w-auto lg:left-auto lg:border lg:border-neutral-400 shadow-md"
    >
      <SearchForm query={query} setQuery={setQuery} />
      <SearchResult query={query} gallListData={gallListData} />
    </div>
  );
}
