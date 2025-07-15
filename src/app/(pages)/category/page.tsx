import { fetchGallData } from "@/app/lib/data";
import GallList from "@/app/ui/common/GallList";
import HeaderText from "@/app/ui/common/HeaderText";

export default async function CategoryPage() {
  const gallData = await fetchGallData({ sort: "name" });

  const gallMeta = gallData.map((g) => ({
    abbr: g.abbr,
    name: g.name,
  }));

  return (
    <>
      <HeaderText label="전체 갤러리" href="#" />
      <GallList gallData={gallMeta} />
    </>
  );
}
