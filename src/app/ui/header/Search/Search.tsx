// --- 데이터 요청 ---
import { fetchGallListData } from "@/app/lib/data/gall-data";

// --- UI ---
import SearchUi from "./SearchUi";

export default async function Search() {
  const gallListData = await fetchGallListData();

  return (
    <>
      <SearchUi gallListData={gallListData} />
    </>
  );
}
