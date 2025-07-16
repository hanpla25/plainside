import { fetchPostData } from "@/app/lib/data";
import HeaderText from "@/app/ui/common/HeaderText";
import Post from "@/app/ui/post";
import { redirect } from "next/navigation";

type Params = Promise<{ postId: string }>;

export default async function BestPostPage(props: { params: Params }) {
  const params = await props.params;
  const postId = Number(params.postId);
  const postData = await fetchPostData(postId);

  if (!postData) redirect("/best");

  return (
    <>
      <HeaderText label="실시간 베스트" href="/best" />
      <Post postData={postData} />
    </>
  );
}
