import { Gall } from "@/app/lib/definitions";
import Link from "next/link";

type Props = {
  popularGallData: Gall[];
};

export default function PopularGallList({ popularGallData }: Props) {
  return (
    <ul className="flex flex-wrap gap-2 lg:flex-col">
      {popularGallData.map((item, i) => (
        <li key={item.id} className="flex items-center gap-2 lg:gap-0">
          <span className="hidden lg:block py-1">{i + 1}</span>
          <Link
            href={`/gallery/${item.abbr}`}
            className="block px-3 py-1 bg-gray-100 hover:bg-gray-200 text-sm text-neutral-900 rounded-lg transition lg:bg-white lg:rounded-none truncate"
          >
            {item.gall_name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
