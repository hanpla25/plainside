// --- Data ---
import { getAbbrPageData } from "@/app/lib/abbr-page-helper";

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
  const data = await getAbbrPageData({
    searchParams,
    isPopular: true,
    postId,
  });

  if (!data.postData) {
    return;
  }

  return (
    <div className="space-y-4">
      <PostUi postData={data.postData} postCommentData={data.postCommentData} />
      <GallUi
        abbr={"best"}
        postListData={data.postListData}
        currentPage={data.currentPage}
        totalPage={data.totalPage}
        queryString={data.queryString}
      />
    </div>
  );
}
