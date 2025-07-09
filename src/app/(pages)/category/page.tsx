import { fetchGallList } from "@/app/lib/data";
import CategoryHeader from "@/app/ui/category/CategoryHeader";
import CategoryList from "@/app/ui/category/CategoryList";

export default async function CategoryPage() {
  const allGallData = await fetchGallList({ sort: "newest" });

  return (
    <div>
      <CategoryHeader />
      <CategoryList allGallData={allGallData} />
    </div>
  );
}
