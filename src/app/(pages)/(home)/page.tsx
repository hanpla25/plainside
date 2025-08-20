// --- 데이터 ---
import { fetchGallListData, fetchPostListData } from "@/app/lib/data/gall-data";

// --- 상수 ---
import { fetchLayoutPostCount } from "@/app/constants/fetch-post-constants";

// --- UI ---
import HeaderText from "@/app/ui/common/HeaderText";
import GallUi from "@/app/ui/gall/GallUi";
import PopularGall from "@/app/ui/home/PopularGall";

type SearchParams = Promise<{ [key: string]: string }>;

export default async function HomePage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const { page = "1" } = searchParams;
  const currentPage = Number(page);
  const queryString = new URLSearchParams(searchParams).toString();

  const popularPostListPromise = fetchPostListData({
    page: currentPage,
    isPopular: true,
  });
  const popularGallPromise = fetchGallListData("popular", fetchLayoutPostCount);

  const [popularGallData, popularPostListData] = await Promise.all([
    popularGallPromise,
    popularPostListPromise,
  ]);

  return (
    <>
      <PopularGall popularGallData={popularGallData} />
      <HeaderText text={"실시간 베스트"} href={"/best"} isLink={true} />
      <GallUi
        abbr="best"
        postList={popularPostListData.post_list}
        currentPage={currentPage}
        totalPage={popularPostListData.total_page}
        queryString={queryString}
      />
    </>
  );
}
