// --- 데이터 ---
import { fetchPostListData } from "../lib/data/gall-data";

// --- UI ---
import GallUi from "../ui/gall/GallUi";

type SearchParams = Promise<{ [key: string]: string }>;

export default async function BestPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const { search = "", option = "title", page = "1" } = searchParams;
  const currentPage = Number(page);
  const queryString = new URLSearchParams(searchParams).toString();

  const popularPostListPromise = fetchPostListData({
    page: currentPage,
    isPopular: true,
    search,
    option,
  });

  const [popularPostListData] = await Promise.all([popularPostListPromise]);

  return (
    <>
      <GallUi
        abbr={"best"}
        postList={popularPostListData.post_list}
        currentPage={currentPage}
        totalPage={popularPostListData.total_page}
        queryString={queryString}
      />
    </>
  );
}
