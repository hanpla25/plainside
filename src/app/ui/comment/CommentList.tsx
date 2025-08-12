import { CommentData } from "@/app/lib/definitions";
import formatDate from "@/app/utils/format-date";

type Props = {
  postCommentData: CommentData[] | null;
};

export default function CommentList({ postCommentData }: Props) {
  if (!postCommentData || postCommentData.length === 0) return null;

  return (
    <div className="lg:mx-0 mx-2 space-y-4 mb-4">
      {postCommentData.map((comment) => (
        <div
          key={comment.id}
          className="border border-neutral-200 rounded-md p-3 bg-white shadow-sm"
        >
          <Info
            userName={comment.user_name}
            isLogin={comment.is_login}
            ipAddress={comment.ip_address}
            createdAt={comment.created_at}
          />
          <Content content={comment.content} />
        </div>
      ))}
    </div>
  );
}

function Info({
  userName,
  isLogin,
  ipAddress,
  createdAt,
}: {
  userName: string;
  isLogin: boolean;
  ipAddress: string;
  createdAt: string;
}) {
  return (
    <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
      <span className="font-medium text-neutral-700">
        {userName} {!isLogin && ipAddress}
      </span>
      <span className="text-neutral-400">{formatDate(createdAt, "YMDT")}</span>
    </div>
  );
}

function Content({ content }: { content: string }) {
  return (
    <p className="text-sm text-neutral-800 whitespace-pre-wrap">{content}</p>
  );
}
