// --- 데이터 ---
import { fetchPostListData } from "@/app/lib/data/gall-data";
import GallButtons from "@/app/ui/gall/GallButtons";

// --- UI ---
import GallUi from "@/app/ui/gall/GallUi";

type Params = Promise<{ abbr: string }>;
type SearchParams = Promise<{ [key: string]: string }>;

export default async function AbbrPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const abbr = params.abbr;

  const searchParams = await props.searchParams;
  const { search = "", option = "title", page = "1", mode = "" } = searchParams;
  const currentPage = Number(page);
  const queryString = new URLSearchParams(searchParams).toString();
  const isPopular = mode === "popular" ? true : false;

  const postListPromise = fetchPostListData({
    abbr,
    page: currentPage,
    isPopular,
    search,
    option,
  });

  const [postListData] = await Promise.all([postListPromise]);

  return (
    <>
      <GallButtons abbr={abbr} isPopular={isPopular} />
      <GallUi
        abbr={abbr}
        postList={postListData.post_list}
        currentPage={currentPage}
        totalPage={postListData.total_page}
        queryString={queryString}
      />
    </>
  );
}
