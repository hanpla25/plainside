// --- 데이터 ---
import { fetchPostListData } from "@/app/lib/data/gall-data";
import { fetchPostData } from "@/app/lib/data/post-data";
import HeaderText from "@/app/ui/common/HeaderText";

// --- UI ---
import GallUi from "@/app/ui/gall/GallUi";
import PostUi from "@/app/ui/post/PostUi";

type Params = Promise<{ postId: string }>;
type SearchParams = Promise<{ [key: string]: string }>;

export default async function BestPostPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const [params, searchParams] = await Promise.all([
    props.params,
    props.searchParams,
  ]);
  
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

  return (
    <>
      <PostUi postData={postData} />
      <HeaderText text="실시간 베스트" isLink={true} href="/best" />
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
