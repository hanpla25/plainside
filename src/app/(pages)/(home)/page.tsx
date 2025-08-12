// --- Constants ---
import { BEST_ABBR } from "@/app/constants/href-constants";
import { getAbbrPageData } from "@/app/lib/abbr-page-helper";

// --- Data ---
import { fetchGallListNameAbbr } from "@/app/lib/data/gall-data";

// --- UI ---
import GallHeader from "@/app/ui/gall/GallHeader";
import GallUi from "@/app/ui/gall/GallUi";
import GallList from "@/app/ui/layout/gall-list";

type Params = Promise<{ abbr: string }>;
type SearchParams = Promise<{ [key: string]: string }>;

export default async function HomePage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;

  const popularGallNameList = await fetchGallListNameAbbr({
    sort: "popular",
    size: 5,
  });

  const data = await getAbbrPageData({ searchParams, isPopular: true });

  return (
    <>
      <div className="mb-2 lg:hidden">
        <GallList label={"인기 갤러리"} gallList={popularGallNameList} />
      </div>
      <GallHeader abbr={BEST_ABBR} gallName={"실시간 베스트"} />
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
