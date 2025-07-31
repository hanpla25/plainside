import { fetchPostData, fetchPostListData } from "./data";

type Props = {
  post_id: number;
  like_count: number;
  page: string;
  search: string;
  option: string;
};

export default async function getBestData({
  post_id,
  like_count,
  page,
  search,
  option,
}: Props) {
  const [postData, postListData] = await Promise.all([
    fetchPostData(post_id, like_count),
    fetchPostListData({
      item_per_page: 10,
      page: Number(page),
      search: search as string,
      option: option as "title" | "nickname",
      like_count: 10,
    }),
  ]);

  return { postData, postListData };
}
