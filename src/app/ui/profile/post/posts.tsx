import { Post, UserData } from "@/app/lib/definition";
import PostList from "./post-list";

export default function Posts({
  posts,
  userData,
}: {
  posts: Post[];
  userData: UserData | null;
}) {
  return (
    <>
      <div className="border-b-2 border-neutral-200">
        <h1 className="p-2 font-bold">
          <span>게시글 </span>
          <span className="text-sm">({userData?.write_count})</span>
        </h1>
      </div>
      <PostList posts={posts} />
    </>
  );
}
