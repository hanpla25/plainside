// --- 데이터 ---
import { fetchPostListData } from "@/app/lib/data/gall-data";

// --- UI ---
import GallUi from "@/app/ui/gall/GallUi";
import PostUi from "@/app/ui/post/PostUi";
import GallButtons from "@/app/ui/gall/GallButtons";

type Params = Promise<{ abbr: string; postId: string }>;
type SearchParams = Promise<{ [key: string]: string }>;

export default async function PostPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const { abbr } = params;

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

  const [popularPostListData] = await Promise.all([postListPromise]);

  return (
    <>
      <PostUi />
      <GallButtons abbr={abbr} isPopular={isPopular} />
      <GallUi
        abbr={abbr}
        postList={popularPostListData.post_list}
        currentPage={currentPage}
        totalPage={popularPostListData.total_page}
        queryString={queryString}
      />
    </>
  );
}
