import { fetchGallListData } from "@/app/lib/data/data";
import { CreateGallLink } from "@/app/ui/category/buttons";
import HeaderText from "@/app/ui/common/HeaderText";
import GallList from "@/app/ui/gall/GallList";

export default async function CategoryPage() {
  const gallList = await fetchGallListData({ sort: "newest" });

  return (
    <>
      <div className="flex items-center justify-between">
        <HeaderText label={"전체 갤러리"} href={"/category"} />
        <CreateGallLink />
      </div>
      <GallList gallList={gallList} />
    </>
  );
}
