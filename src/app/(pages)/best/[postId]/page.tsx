// --- Data ---
import { fetchPostListData } from "@/app/lib/gall-data";
import { fetchPostData } from "@/app/lib/post-data";

// --- UI ---
import GallUi from "@/app/ui/gall/GallUi";
import PostUi from "@/app/ui/post";

type Params = Promise<{ postId: string }>;
type SearchParams = Promise<{ [key: string]: string }>;

export default async function BestPostPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const postId = params.postId;

  const searchParams = await props.searchParams;
  const { page = "1" } = searchParams;

  const [bestPostListData, postData] = await Promise.all([
    fetchPostListData({
      popular: true,
      page: Number(page),
    }),
    fetchPostData({ postId: Number(postId) }),
  ]);

  return (
    <div>
      <PostUi postData={postData} />
      <GallUi
        abbr={"best"}
        postListData={bestPostListData}
        currentPage={Number(page)}
        totalPage={bestPostListData.total_page}
      />
    </div>
  );
}
