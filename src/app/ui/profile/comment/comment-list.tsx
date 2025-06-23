import { Comment } from "@/app/lib/definition";
import CommentItem from "./comment-item";

export default function PostList({ comments }: { comments: Comment[] }) {
  if (comments.length === 0) {
    return (
      <div className="flex items-center justify-center py-10 border-b-2 border-neutral-400">
        게시글이 없습니다.
      </div>
    );
  }
  return (
    <div className=" divide-y divide-neutral-200">
      {comments.map((item) => (
        <CommentItem key={item.id} {...item} />
      ))}
    </div>
  );
}
