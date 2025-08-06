// --- Data ---
import { fetchPostListData } from "@/app/lib/gall-data";
import { fetchPostData } from "@/app/lib/post-data";

// --- UI ---
import GallUi from "@/app/ui/gall/GallUi";
import PostUi from "@/app/ui/post";

type Params = Promise<{ postId: string; abbr: string }>;
type SearchParams = Promise<{ [key: string]: string }>;

export default async function AbbrPostPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const abbr = params.abbr;
  const postId = params.postId;

  const searchParams = await props.searchParams;
  const { search = "", option = "title", page = "1" } = searchParams;

  const [postListData, postData] = await Promise.all([
    fetchPostListData({
      page: Number(page),
      search: search,
      option: option,
    }),
    fetchPostData({ postId: Number(postId) }),
  ]);

  return (
    <div>
      <PostUi postData={postData} />
      <GallUi
        abbr={abbr}
        postListData={postListData}
        currentPage={Number(page)}
        totalPage={postListData.total_page}
      />
    </div>
  );
}
