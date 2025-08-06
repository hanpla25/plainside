import Link from "next/link";

// --- Types ---
import { GallMeta } from "@/app/lib/definitions";

// --- Icons ---
import { Trash2 } from "lucide-react";

type Props = {
  recentGallList: GallMeta[];
  removeRecentGall: (abbr: string) => void;
};

function DeleteButton({
  abbr,
  onRemove,
}: {
  abbr: string;
  onRemove: (abbr: string) => void;
}) {
  return (
    <Trash2
      aria-label={`최근 방문 갤러리 ${abbr} 삭제`}
      role="button"
      size={14}
      className="text-red-500 hover:text-red-700 cursor-pointer"
      onClick={() => onRemove(abbr)}
    />
  );
}

function RecentGallItem({
  item,
  onRemove,
}: {
  item: GallMeta;
  onRemove: (abbr: string) => void;
}) {
  return (
    <li className="flex items-center gap-2 flex-shrink-0 bg-gray-100 hover:bg-gray-200 rounded-xl px-4 py-2 text-sm whitespace-nowrap shadow-sm border border-gray-300">
      <Link href={`/${item.abbr}`} className="hover:underline">
        {item.name}
      </Link>
      <DeleteButton abbr={item.abbr} onRemove={onRemove} />
    </li>
  );
}

export default function RecentGallList({
  recentGallList,
  removeRecentGall,
}: Props) {
  return (
    <div className="overflow-x-auto">
      <ul className="lg:px-0 flex gap-3 px-2 py-3 w-max min-w-full scroll-smooth">
        {recentGallList.map((item) => (
          <RecentGallItem
            key={item.abbr}
            item={item}
            onRemove={removeRecentGall}
          />
        ))}
      </ul>
    </div>
  );
}
