import Link from "next/link";

// --- 데이터 ---
import { fetchGallListData } from "@/app/lib/data/gall-data";

// --- UI ---
import EmptyUi from "../common/EmptyUi";

export default async function CategoryList() {
  const allGalleryData = await fetchGallListData();

  if (allGalleryData.length === 0)
    return <EmptyUi text="아직 갤러리가 없어요." />;

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
