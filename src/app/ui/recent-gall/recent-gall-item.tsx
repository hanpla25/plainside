import type { RecentGall } from "@/app/lib/definition";
import { Trash2 } from "lucide-react";
import Link from "next/link";

type Props = RecentGall & {
  onRemove: (abbr: string) => void;
};

export default function RecentGallItem({ abbr, name, href, onRemove }: Props) {
  return (
    <li className="flex items-center gap-1 whitespace-nowrap">
      <Link href={href} className="truncate hover:underline">
        {name}
      </Link>
      <button
        onClick={() => onRemove(abbr)}
        className="text-xs text-red-500 hover:text-red-700 cursor-pointer"
        type="button"
      >
        <Trash2 size={14} />
      </button>
    </li>
  );
}
