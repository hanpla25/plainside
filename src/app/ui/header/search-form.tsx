type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchForm({ value, onChange }: Props) {
  return (
    <form action="" className="w-full">
      <label htmlFor="search" className="sr-only">
        갤러리 검색
      </label>
      <input
        id="search"
        name="search"
        type="text"
        placeholder="갤러리 검색"
        className="w-full border border-gray-300 rounded px-3 py-2"
        value={value}
        onChange={onChange}
      />
    </form>
  );
}
