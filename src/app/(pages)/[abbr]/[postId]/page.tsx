// --- Data ---
import { getAbbrPageData } from "@/app/lib/abbr-page-helper";

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
  const data = await getAbbrPageData({
    abbr,
    searchParams,
    postId,
  });

  if (!data.postData) {
    return;
  }

  return (
    <div>
      <PostUi postData={data.postData} />
      <GallUi
        abbr={abbr}
        postListData={data.postListData}
        currentPage={data.currentPage}
        totalPage={data.totalPage}
        queryString={data.queryString}
      />
    </div>
  );
}
