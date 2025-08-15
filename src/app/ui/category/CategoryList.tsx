import Link from "next/link";

// --- Types ---
import { GallMeta } from "@/app/lib/definitions";

type Props = {
  allGalleryData: GallMeta[];
};

export default function CategoryList({ allGalleryData }: Props) {
  return (
    <div className="lg:mx-0 mx-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {allGalleryData.map((gallery) => (
        <Link
          key={gallery.abbr}
          href={`/${gallery.abbr}`}
          className="block border border-neutral-200 rounded px-3 py-2 text-sm text-neutral-800"
        >
          {gallery.name}
        </Link>
      ))}
    </div>
  );
}
