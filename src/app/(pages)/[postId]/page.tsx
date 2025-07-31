import getBestData from "@/app/lib/data/best-data";
import BestUi from "@/app/ui/home/BestUi";
import { redirect } from "next/navigation";
import Post from "@/app/ui/post/index";
import HeaderText from "@/app/ui/common/HeaderText";

type Params = Promise<{ postId: string }>;
type SearchParams = Promise<{ [key: string]: string }>;

export default async function BestPostPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const postId = Number(params.postId);

  const searchParams = await props.searchParams;
  const { search = "", option = "title", page = "1" } = searchParams;
  const queryString = new URLSearchParams(searchParams).toString();

  if (isNaN(postId)) {
    redirect("/");
  }

  const { postData, postListData } = await getBestData({
    post_id: postId,
    like_count: 10,
    page: page,
    search: search,
    option: option,
  });

  const postList = postListData.postList;
  const totalPages = postListData.totalPages;

  if (!postData) {
    redirect("/");
  }

  return (
    <>
      <HeaderText label={"실시간 베스트"} href={"/"} />
      <Post postData={postData} />
      <BestUi
        popularList={postList}
        currentPage={Number(page)}
        search={search}
        option={option}
        totalPages={totalPages}
        query={queryString}
      />
    </>
  );
}
