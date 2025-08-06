// --- Constatns ---
import { BEST_ABBR } from "@/app/constants/href-constants";

// --- Data ---
import { fetchPostListData } from "@/app/lib/gall-data";

// --- UI ---
import GallUi from "@/app/ui/gall/GallUi";

type SearchParams = Promise<{ [key: string]: string }>;

export default async function BestPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const { search = "", option = "title", page = "1" } = searchParams;

  const bestPostListData = await fetchPostListData({
    popular: true,
    page: Number(page),
    search: search,
    option: option,
  });

  return (
    <>
      <GallUi
        abbr={BEST_ABBR}
        postListData={bestPostListData}
        currentPage={Number(page)}
        totalPage={bestPostListData.total_page}
      />
    </>
  );
}
