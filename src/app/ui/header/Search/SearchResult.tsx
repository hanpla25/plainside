import Link from "next/link";

// --- 타입 ---
import { Gall } from "@/app/lib/definitions";

// --- 유틸 ---
import normalize from "@/app/utils/normalize";

type Props = {
  query: string;
  gallListData: Gall[];
};

const EmptyUi = ({ text }: { text: string }) => {
  return <div className="p-2">{text}</div>;
};

const SearchList = ({ gallList }: { gallList: Gall[] }) => {
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
};

export default function SearchResult({ query, gallListData }: Props) {
  const normalizedQuery = normalize(query);

  if (normalizedQuery.length === 0)
    return <EmptyUi text="검색어를 입력해주세요." />;

  const filtered = gallListData.filter((gall) =>
    normalize(gall.name).includes(normalizedQuery)
  );

  if (filtered.length === 0) {
    return <EmptyUi text="검색 결과가 없어요." />;
  }

  return <SearchList gallList={filtered} />;
}
