// --- Types ---

import { Post } from "@/app/lib/definitions";
import formatDate from "@/app/utils/format-date";
import PostContent from "./PostContent";
import PostButtons from "./PostButtons";

// --- UI ---

type Props = {
  postData: Post;
};

const Title = ({ title, createdAt }: { title: string; createdAt: string }) => {
  return (
    <div className="flex items-center justify-between px-2 lg:px-1 py-1 border-y border-neutral-400">
      <h2 className="text-lg font-semibold">{title}</h2>
      <span className="text-sm text-neutral-600">
        {formatDate(createdAt, "YMDT")}
      </span>
    </div>
  );
};

const Info = ({
  userName,
  viewCount,
  likeCount,
  commentCount,
  ipAddress,
  isLogin,
}: {
  userName: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  ipAddress: string;
  isLogin: boolean;
}) => {
  return (
    <div className="flex items-center justify-between px-3 py-1.5 border-b border-neutral-200 mb-4">
      <span className="font-medium">
        {userName} {!isLogin && ipAddress}
      </span>
      <div className="space-x-2 text-sm text-neutral-600">
        <span>조회 {viewCount}</span>
        <span>추천 {likeCount}</span>
        <span>댓글 {commentCount}</span>
      </div>
    </div>
  );
};

export default function PostUi({ postData }: Props) {
  return (
    <div>
      <Title title={postData.title} createdAt={postData.created_at} />
      <Info
        userName={postData.user_name}
        viewCount={postData.view_count}
        likeCount={postData.like_count}
        commentCount={postData.comment_count}
        isLogin={postData.is_login}
        ipAddress={postData.ip_address}
      />
      <div className="p-2">
        <PostContent content={postData.content} />
      </div>
      <PostButtons
        post_id={postData.id}
        like_count={postData.like_count}
        dislike_count={postData.dislike_count}
      />
    </div>
  );
}
