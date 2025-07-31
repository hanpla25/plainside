import { GallMeta } from "@/app/lib/definitions";
import Link from "next/link";

type Props = {
  gallList: GallMeta[];
};

export default function GallList({ gallList }: Props) {
  return (
    <ul className="lg:px-0 px-2 flex flex-wrap gap-2 lg:flex-col">
      {gallList.map((item, i) => (
        <li key={item.abbr} className="flex items-center gap-2 lg:gap-0">
          <span className="hidden lg:block py-1">{i + 1}. </span>
          <Link
            href={`/gallery/${item.abbr}`}
            className="block px-3 py-1 bg-gray-100 hover:bg-gray-200 text-sm text-neutral-900 rounded-lg transition lg:bg-white lg:rounded-none truncate"
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
