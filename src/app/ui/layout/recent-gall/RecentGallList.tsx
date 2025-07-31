import { GallMeta } from "@/app/lib/definitions";
import { Trash2 } from "lucide-react";
import Link from "next/link";

type Props = {
  recentGall: GallMeta[];
  isModify: boolean;
  removeRecentGall: (abbr: string) => void;
};

export default function RecentGallList({
  recentGall,
  isModify,
  removeRecentGall,
}: Props) {
  return (
    <ul className="flex flex-wrap gap-2">
      {recentGall.map((item) => (
        <li key={item.abbr} className="flex items-center gap-2">
          <Link
            href={`/gallery/${item.abbr}`}
            className="block px-3 py-1 bg-gray-100 hover:bg-gray-200 text-sm text-neutral-900 rounded-lg transition"
          >
            {item.name}
          </Link>
          {isModify && (
            <Trash2
              size={12}
              onClick={() => removeRecentGall(item.abbr)}
              className="text-red-500 hover:text-red-700 cursor-pointer"
            />
          )}
        </li>
      ))}
    </ul>
  );
}
