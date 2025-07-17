import type { Post, Post as PostType } from "@/app/lib/definitions";
import formatDate from "@/app/utils/format-date";

export default function Post({ postData }: { postData: PostType }) {
  return (
    <>
      <Title title={postData.title} createdAt={postData.created_at} />
      <Info
        userName={postData.user_name}
        viewCount={postData.view_count}
        likeCount={postData.like_count}
        commentCount={postData.comment_count}
      />
      <Main content={postData.content} />
    </>
  );
}

function Title({ title, createdAt }: { title: string; createdAt: string }) {
  return (
    <div className="flex items-center justify-between px-3 py-1.5 border-y border-neutral-400">
      <h2 className="text-lg font-semibold">{title}</h2>
      <span className="text-sm text-neutral-600">
        {formatDate(createdAt, "YMDT")}
      </span>
    </div>
  );
}

function Info({
  userName,
  viewCount,
  likeCount,
  commentCount,
}: {
  userName: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
}) {
  return (
    <div className="flex items-center justify-between px-3 py-1.5 border-b border-neutral-200">
      <span className="font-medium">{userName}</span>
      <div className="space-x-2 text-sm text-neutral-600">
        <span>조회 {viewCount}</span>
        <span>추천 {likeCount}</span>
        <span>댓글 {commentCount}</span>
      </div>
    </div>
  );
}

function Main({ content }: { content: string }) {
  return (
    <div className="p-3 text-base leading-relaxed whitespace-pre-wrap">
      {content}
    </div>
  );
}
