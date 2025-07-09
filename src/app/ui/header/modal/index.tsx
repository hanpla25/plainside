import { Gall } from "@/app/lib/definitions";
import SearchForm from "./SearchForm";
import SearchResult from "./SearchResult";
import useCloseModal from "@/app/hooks/useCloseModal";

type Props = {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  debouncedQuery: string;
  gallList: Gall[];
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SearchModal({
  setQuery,
  debouncedQuery,
  gallList,
  setIsSearchOpen,
}: Props) {
  const modalRef = useCloseModal(() => setIsSearchOpen(false));

  return (
    <div className="fixed inset-0 z-40 bg-black/10 flex justify-center">
      <div className="relative w-full max-w-5xl px-2">
        <div
          ref={modalRef}
          className="absolute right-0 top-14 w-full lg:max-w-md border border-neutral-300 rounded-lg bg-white z-50"
        >
          <SearchForm setQuery={setQuery} />
          <SearchResult query={debouncedQuery} gallList={gallList} />
        </div>
      </div>
    </div>
  );
}
