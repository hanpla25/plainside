// --- 타입 ---
import type { DBComment } from "@/app/lib/definitions";

// --- 유틸 ---
import formatDate from "@/app/utils/format-date";

type Props = {
  comments: DBComment[];
};

const CommentItem = ({
  comment,
  replies,
}: {
  comment: DBComment;
  replies: DBComment[];
}) => {
  return (
    <li>
      {/* 댓글 본문 */}
      <div className="px-2 py-3 border-b border-neutral-300 space-y-1.5">
        <p className="text-sm">
          <span className="mr-2 font-semibold">{comment.user_name}</span>
          <span>{formatDate(comment.created_at, "MDT")}</span>
        </p>
        <p className="text-sm">{comment.content}</p>
      </div>

      {/* 대댓글 */}
      {replies.length > 0 && (
        <ul>
          {replies.map((reply) => (
            <li key={reply.id}>
              <div className="px-2 py-3 border-b border-neutral-300 space-y-1.5 bg-neutral-100">
                <p className="ml-2 text-sm">
                  <span className="mr-2 font-semibold text-neutral-400">
                    ㄴ
                  </span>
                  <span className="mr-2 font-semibold">{reply.user_name}</span>
                  <span>{formatDate(reply.created_at, "MDT")}</span>
                </p>
                <p className="ml-2 text-sm">{reply.content}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default function CommentList({ comments }: Props) {
  // 부모 댓글 (parent_id === null)
  const rootComments = comments.filter((c) => c.parent_id === null);

  // 자식 댓글(대댓글) 필터링 함수
  const getReplies = (commentId: number) =>
    comments.filter((c) => c.parent_id === commentId);

  return (
    <ul>
      {rootComments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          replies={getReplies(comment.id)}
        />
      ))}
    </ul>
  );
}
