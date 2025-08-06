import Link from "next/link";

// --- Utils ---
import normalize from "@/app/utils/normalize";

type Props = {
  query: string;
  gallList: {
    name: string;
    abbr: string;
  }[];
};

function EmptyQuery() {
  return <div className="p-10 text-center">검색어를 입력해주세요.</div>;
}

function EmptyResult() {
  return <div className="p-10 text-center">검색 결과가 없습니다.</div>;
}

function ResultList({
  gallList,
}: {
  gallList: {
    name: string;
    abbr: string;
  }[];
}) {
  return (
    <div className="flex flex-col gap-2">
      {gallList.map((gall) => (
        <Link
          href={`/${gall.abbr}`}
          key={gall.abbr}
          className="p-2 rounded hover:bg-neutral-200 transition-colors duration-150"
        >
          {gall.name}
        </Link>
      ))}
    </div>
  );
}

export default function SearchResult({ query, gallList }: Props) {
  const normalizedQuery = normalize(query);

  if (normalizedQuery.length === 0) return <EmptyQuery />;

  const filtered = gallList.filter((gall) =>
    normalize(gall.name).includes(normalizedQuery)
  );

  if (filtered.length === 0) {
    return <EmptyResult />;
  }

  return <ResultList gallList={filtered} />;
}
