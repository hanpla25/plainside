// --- 데이터 ---
import { fetchPostListData } from "@/app/lib/data/gall-data";
import { fetchPostData } from "@/app/lib/data/post-data";

// --- UI ---
import GallUi from "@/app/ui/gall/GallUi";
import PostUi from "@/app/ui/post/PostUi";

type Params = Promise<{ postId: string }>;
type SearchParams = Promise<{ [key: string]: string }>;

export default async function BestPostPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const postId = Number(params.postId);
  const { search = "", option = "title", page = "1" } = searchParams;
  const currentPage = Number(page);
  const queryString = new URLSearchParams(searchParams).toString();

  const postDataPromise = fetchPostData("best", postId);

  const popularPostListPromise = fetchPostListData({
    page: currentPage,
    isPopular: true,
    search,
    option,
  });

  const [postData, popularPostListData] = await Promise.all([
    postDataPromise,
    popularPostListPromise,
  ]);

  console.log(postData);

  return (
    <>
      <PostUi postData={postData} />
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
