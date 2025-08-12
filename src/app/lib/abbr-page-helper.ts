import { fetchPostListData } from "@/app/lib/data/gall-data";
import { fetchCommentData, fetchPostData } from "@/app/lib/data/post-data";

type GetCommonDataOptions = {
  abbr?: string;
  postId?: string;
  isPopular?: boolean;
  searchParams: { [key: string]: string };
};

export async function getAbbrPageData({
  abbr,
  postId,
  isPopular = false,
  searchParams,
}: GetCommonDataOptions) {
  const { search = "", option = "title", page = "1" } = searchParams;

  const pageNum = Number(page);

  const postListPromise = fetchPostListData({
    abbr,
    popular: isPopular,
    page: pageNum,
    search,
    option,
  });

  const postDataPromise = postId
    ? fetchPostData({ postId: Number(postId) })
    : null;

  const commentDataPromise = postId
    ? fetchCommentData({ postId: Number(postId) })
    : null;

  const [postListData, postData, postCommentData] = await Promise.all([
    postListPromise,
    postDataPromise,
    commentDataPromise,
  ]);

  const queryString = new URLSearchParams(searchParams).toString();

  return {
    postListData,
    postData,
    currentPage: pageNum,
    totalPage: postListData.total_page,
    queryString,
    postCommentData,
  };
}
