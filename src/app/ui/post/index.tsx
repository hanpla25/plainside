// --- Types ---
import { Post } from "@/app/lib/definitions";

// --- UI ---
import PostTitle from "./PostTitle";
import PostInfo from "./PostInfo";
import PostButtons from "./PostButtons";

type Props = {
  postData: Post;
};

export default function PostUi({ postData }: Props) {
  return (
    <>
      <PostTitle title={postData.title} createdAt={postData.created_at} />
      <PostInfo
        isLogin={postData.is_login}
        userName={postData.user_name}
        viewCount={postData.view_count}
        likeCount={postData.like_count}
        commentCount={postData.comment_count}
        ipAddress={postData.ip_address}
      />
      <div className="px-2">내용</div>
      <PostButtons
        post_id={postData.id}
        like_count={postData.like_count}
        dislike_count={postData.dislike_count}
      />
    </>
  );
}
