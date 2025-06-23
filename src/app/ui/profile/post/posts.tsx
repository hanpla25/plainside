import { Post, UserData } from "@/app/lib/definition";
import PostList from "./post-list";
import Pagination from "../../common/pagination";

export default function Posts({
  posts,
  userData,
  ITEM_PER_PAGE,
}: {
  posts: Post[];
  userData: UserData | null;
  ITEM_PER_PAGE: number;
}) {
  const writeCount = userData?.write_count ?? 0;
  const totalPages = Math.ceil(writeCount / ITEM_PER_PAGE);

  return (
    <div className="border-b-2 border-neutral-400 pb-2">
      <div className="border-b-2 border-neutral-200">
        <h1 className="p-2 font-bold">
          <span>게시글 </span>
          <span className="text-sm">({userData?.write_count})</span>
        </h1>
      </div>
      <PostList posts={posts} />
      <Pagination totalPages={totalPages} paramKey="postPage" />
    </div>
  );
}
