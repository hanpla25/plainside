import Link from "next/link";

// --- 타입 ---
import { Gall } from "@/app/lib/definitions";

/// --- UI ---
import HeaderText from "../common/HeaderText";

type Props = {
  popularGallData: Gall[];
};

const List = ({ popularGallData }: { popularGallData: Gall[] }) => {
  return (
    <div className="flex flex-wrap gap-2 px-3">
      {popularGallData.map((item) => (
        <Link
          key={item.abbr}
          href={item.abbr}
          className="px-3 py-1 text-sm rounded-full bg-neutral-100 text-neutral-700"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default function PopularGall({ popularGallData }: Props) {
  return (
    <div className="lg:hidden mb-2">
      <HeaderText text="인기 갤러리" />
      <List popularGallData={popularGallData} />
    </div>
  );
}
