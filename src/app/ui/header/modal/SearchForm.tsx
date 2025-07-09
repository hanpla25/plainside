type Props = {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchForm({ setQuery }: Props) {
  return (
    <form className="border-b border-neutral-300">
      <label htmlFor="gall" className="sr-only">
        갤러리 검색
      </label>
      <input
        type="text"
        name="gall"
        id="gall"
        className="w-full p-2 focus:outline-0"
        placeholder="전체 갤러리 검색"
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
      />
    </form>
  );
}
