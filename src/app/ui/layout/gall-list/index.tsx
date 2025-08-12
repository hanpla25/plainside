import Link from "next/link";

// --- Types ---
import { GallMeta } from "@/app/lib/definitions";

export default function GallList({
  label,
  gallList,
}: {
  label: string;
  gallList: GallMeta[];
}) {
  return (
    <div className="mx-2 lg:mx-0 space-y-2">
      <h2 className="text-xl">{label}</h2>

      <ul className="lg:px-0 px-2 flex flex-wrap gap-2 lg:flex-col">
        {gallList.map((item, i) => (
          <li key={item.abbr} className="flex items-center gap-2 lg:gap-0">
            <span className="hidden lg:block py-1">{i + 1}. </span>
            <Link
              href={`/${item.abbr}`}
              className="block px-3 py-1 bg-gray-100 hover:bg-gray-200 text-sm text-neutral-900 rounded-lg transition lg:bg-white lg:rounded-none truncate"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
