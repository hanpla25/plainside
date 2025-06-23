import { Post } from "@/app/lib/definition";
import PostItem from "./post-item";

export default function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center py-10 border-b-2 border-neutral-400">
        게시글이 없습니다.
      </div>
    );
  }
  return (
    <div className="border-b-2 border-neutral-400 divide-y divide-neutral-200">
      {posts.map((item) => (
        <PostItem key={item.id} {...item} />
      ))}
    </div>
  );
}
