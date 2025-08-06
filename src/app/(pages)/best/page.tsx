// --- Constatns ---
import { BEST_ABBR } from "@/app/constants/href-constants";

// --- Data ---
import { getAbbrPageData } from "@/app/lib/abbr-page-helper";

// --- UI ---
import GallUi from "@/app/ui/gall/GallUi";

type SearchParams = Promise<{ [key: string]: string }>;

export default async function BestPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;

  const data = await getAbbrPageData({
    searchParams,
    isPopular: true,
  });

  return (
    <>
      <GallUi
        abbr={BEST_ABBR}
        postListData={data.postListData}
        currentPage={data.currentPage}
        totalPage={data.totalPage}
        queryString={data.queryString}
      />
    </>
  );
}
