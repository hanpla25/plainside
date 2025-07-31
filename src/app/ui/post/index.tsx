import type {
  Comment as CommentType,
  Post,
  Post as PostType,
} from "@/app/lib/definitions";
import formatDate from "@/app/utils/format-date";
import PostContent from "./PostContent";
import Comment from "../comment";
import { DisLikeButton, LikeButton } from "./PostButtons";

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
  userId,
  ipAddress,
}: {
  userName: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  userId: string;
  ipAddress: string;
}) {
  return (
    <div className="flex items-center justify-between px-3 py-1.5 border-b border-neutral-200 mb-4">
      <span className="font-medium">
        {userName} {!userId && `(${ipAddress})`}
      </span>
      <div className="space-x-2 text-sm text-neutral-600">
        <span>조회 {viewCount}</span>
        <span>추천 {likeCount}</span>
        <span>댓글 {commentCount}</span>
      </div>
    </div>
  );
}

function Buttons({
  post_id,
  like_count,
  dislike_count,
}: {
  like_count: number;
  dislike_count: number;
  post_id: number;
}) {
  return (
    <div className="flex items-center justify-center gap-4">
      <LikeButton postId={post_id} initialCount={like_count} />
      <DisLikeButton postId={post_id} initialCount={dislike_count} />
    </div>
  );
}

export default function Post({
  postData,
  commentListData,
}: {
  postData: PostType;
  commentListData: CommentType[] | null;
}) {
  return (
    <div className="border-b border-neutral-400 pb-4 mb-4">
      <Title title={postData.title} createdAt={postData.created_at} />
      <Info
        userId={postData.user_id}
        userName={postData.user_name}
        viewCount={postData.view_count}
        likeCount={postData.like_count}
        commentCount={postData.comment_count}
        ipAddress={postData.ip_address}
      />
      <div className="px-2">
        <PostContent content={postData.content} />
      </div>
      <Buttons
        post_id={postData.id}
        like_count={postData.like_count}
        dislike_count={postData.dislike_count}
      />
      <Comment commentListData={commentListData} />
    </div>
  );
}
