import {
  fetchCommentsData,
  fetchPostData,
  getProfileData,
} from "@/app/lib/data";
import CommentsPage from "./CommentsPage";
import PostsPage from "./PostsPage";
import ProfileHome from "./ProfileHome";
import { UserPayload } from "@/app/lib/definitions";

type Props = {
  user: UserPayload;
  currentMenu: string;
  page: number;
};

export const ITEM_PER_PAGE = 10;

export default async function Profile({ user, currentMenu, page }: Props) {
  if (currentMenu === "posts") {
    const posts = await fetchPostData({
      user_id: user.user_id,
      page: page,
      item_per_page: ITEM_PER_PAGE,
    });

    return (
      <PostsPage currentMenu={currentMenu} posts={posts} currentPage={page} />
    );
  }

  if (currentMenu === "comments") {
    const comments = await fetchCommentsData({
      user_id: user.user_id,
      page: page,
      item_per_page: ITEM_PER_PAGE,
    });

    return (
      <CommentsPage
        currentMenu={currentMenu}
        comments={comments}
        currentPage={page}
      />
    );
  }

  const { posts, comments } = await getProfileData({ user });

  return <ProfileHome posts={posts} comments={comments} />;
}
