// --- 데이터 ---
import { fetchPostListData } from "@/app/lib/data/gall-data";

// --- UI ---
import GallUi from "@/app/ui/gall/GallUi";
import PostUi from "@/app/ui/post/PostUi";

type Params = Promise<{ abbr: string; postId: string }>;
type SearchParams = Promise<{ [key: string]: string }>;

export default async function PostPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const { abbr } = params;

  const searchParams = await props.searchParams;
  const { search = "", option = "title", page = "1" } = searchParams;
  const currentPage = Number(page);
  const queryString = new URLSearchParams(searchParams).toString();

  const postListPromise = fetchPostListData({
    abbr,
    page: currentPage,
    isPopular: true,
    search,
    option,
  });

  const [popularPostListData] = await Promise.all([postListPromise]);

  return (
    <>
      <PostUi />
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
