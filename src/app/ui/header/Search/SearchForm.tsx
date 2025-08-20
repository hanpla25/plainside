type Props = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchForm({ query, setQuery }: Props) {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="border-b border-neutral-300"
    >
      <label htmlFor="gall" className="sr-only">
        갤러리 검색
      </label>
      <input
        type="text"
        name="gall"
        id="gall"
        className="w-full p-2 focus:outline-0"
        placeholder="전체 갤러리 검색"
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
