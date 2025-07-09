import { UserPostData } from "@/app/lib/definitions";
import PostsList from "./PostsList";
import ProfilePagination from "./ProfilePagination";
import { ITEM_PER_PAGE } from ".";

type Props = {
  currentMenu: string;
  posts: UserPostData;
  currentPage: number;
};

export default function PostsPage({ currentMenu, posts, currentPage }: Props) {
  const totalPages = Math.ceil(posts.count / ITEM_PER_PAGE);

  return (
    <>
      <PostsList posts={posts} />
      <ProfilePagination
        currentMenu={currentMenu}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
}
