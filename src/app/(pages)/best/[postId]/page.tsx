import { getPostPageData } from "@/app/lib/post-data";
import HeaderText from "@/app/ui/common/HeaderText";
import Post from "@/app/ui/post";
import RealtimeBest from "@/app/ui/realtime-best";
import { redirect } from "next/navigation";

type Params = Promise<{ postId: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function BestPostPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const postId = Number(params.postId);
  const searchParams = await props.searchParams;
  const { search = "", option = "title", page = "1" } = searchParams;

  const { postData, postListData } = await getPostPageData(
    searchParams,
    postId
  );

  if (!postData) redirect("/best");

  return (
    <>
      <HeaderText label="실시간 베스트" href="/best" />
      <Post postData={postData} />
      <div className="my-4">댓글</div>
      <RealtimeBest
        search={search as string}
        option={option as string}
        currentPage={Number(page)}
        popularPostData={postListData}
      />
    </>
  );
}
