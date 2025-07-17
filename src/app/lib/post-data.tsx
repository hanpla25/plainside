import { fetchPostData, fetchPostListData } from "./data";

export async function getPostPageData(
  searchParams: {
    search?: string | string[];
    option?: string | string[];
    page?: string | string[];
  },
  postId: number
) {
  const { search = "", option = "title", page = "1" } = searchParams;

  const [postData, postListData] = await Promise.all([
    fetchPostData(postId),
    fetchPostListData({
      item_per_page: 10,
      page: Number(page),
      search: search as string,
      option: option as "title" | "nickname",
      like_count: 10,
    }),
  ]);

  return {
    postData,
    postListData,
  };
}
