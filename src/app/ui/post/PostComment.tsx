// --- 데이터 ---
import { fetchCommentData } from "@/app/lib/data/post-data";

// --- UI ---
import CommentList from "./PostCommentList";

type Props = {
  postId: number;
  commentCount: number;
};

const Header = ({ commentCount }: { commentCount: number }) => {
  return (
    <h2 className="p-2 space-x-2">
      <span className="font-bold">댓글</span>
      <span className="text-neutral-600">[{commentCount}]</span>
    </h2>
  );
};

export default async function PostComment({ postId, commentCount }: Props) {
  const commentData = await fetchCommentData(postId);

  return (
    <div className="border-t border-neutral-400">
      <Header commentCount={commentCount} />
      <CommentList comments={commentData} />
    </div>
  );
}
