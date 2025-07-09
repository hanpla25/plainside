import { Gall } from "@/app/lib/definitions";
import normalize from "@/app/utils/normalize";
import Link from "next/link";

type Props = {
  query: string;
  gallList: Gall[];
};

export default function SearchResult({ query, gallList }: Props) {
  return (
    <div className="p-2 min-h-[120px]">
      <Item query={query} gallList={gallList} />
    </div>
  );
}

function Item({ query, gallList }: Props) {
  const normalizedQuery = normalize(query);

  if (normalizedQuery.length === 0) {
    return <div className="p-10 text-center">검색어를 입력해주세요.</div>;
  }

  const filtered = gallList.filter((gall) =>
    normalize(gall.gall_name).includes(normalizedQuery)
  );

  if (filtered.length === 0) {
    return <div className="p-10 text-center">검색 결과가 없습니다.</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      {filtered.map((gall) => (
        <Link
          href={`/gallery/${gall.abbr}`}
          key={gall.id}
          className="p-2 rounded hover:bg-neutral-200 transition-colors duration-150"
        >
          {gall.gall_name}
        </Link>
      ))}
    </div>
  );
}
