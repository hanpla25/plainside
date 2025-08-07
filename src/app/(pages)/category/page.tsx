// --- Data ---
import { fetchGallListNameAbbr } from "@/app/lib/data/gall-data";

// --- UI ---
import CategoryList from "@/app/ui/category/CategoryList";

export default async function CategoryPage() {
  const allGalleryData = await fetchGallListNameAbbr({});

  return (
    <>
      <CategoryList allGalleryData={allGalleryData} />
    </>
  );
}
