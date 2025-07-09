import { Gall } from "@/app/lib/definitions";
import Link from "next/link";

export default function CategoryList({ allGallData }: { allGallData: Gall[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {allGallData.map((gall) => (
        <Link
          key={gall.id}
          href={`/gallery/${gall.abbr}`}
          className="block bg-white rounded-2xl shadow hover:shadow-lg transition duration-200 border border-neutral-200 p-4"
        >
          <h2 className="text-lg font-semibold text-neutral-800 mb-1">
            {gall.gall_name}
          </h2>
        </Link>
      ))}
    </div>
  );
}
