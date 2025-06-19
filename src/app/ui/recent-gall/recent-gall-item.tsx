import { Trash2 } from "lucide-react";
import Link from "next/link";

type Props = {
  abbr: string;
  name: string;
  href: string;
  onRemove: (abbr: string) => void;
};

export default function RecentGallItem({ abbr, name, href, onRemove }: Props) {
  return (
    <div className="flex items-center justify-between gap-1">
      <Link href={href} className="truncate text-sm">
        {name}
      </Link>
      <button onClick={() => onRemove(abbr)} className="p-1 hover:text-red-500">
        <Trash2 size={14} />
      </button>
    </div>
  );
}
