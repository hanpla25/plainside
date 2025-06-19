import { SetStateAction } from "react";

type Props = {
  query: string;
  setQuery: React.Dispatch<SetStateAction<string>>;
};

export default function SearchForm({ query, setQuery }: Props) {
  return (
    <form action="">
      <label htmlFor="gallery" className="sr-only">
        갤러리 검색
      </label>
      <input
        type="text"
        id="gallery"
        name="gallery"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="갤러리 검색"
        className="w-full px-2 border rounded-md border-neutral-900"
        required
        autoFocus
      />
    </form>
  );
}
