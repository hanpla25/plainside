// --- 데이터 ---
import { fetchCommentData } from "@/app/lib/data/post-data";

// --- UI ---
import CommentList from "./PostCommentList";
import PostCommentForm from "./PostCommentForm";
import { getUserToken } from "@/app/lib/data/user-data";

type Props = {
  abbr: string;
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

export default async function PostComment({
  abbr,
  postId,
  commentCount,
}: Props) {
  const [userToken, commentData] = await Promise.all([
    getUserToken(),
    fetchCommentData(postId),
  ]);

  const isLogin = userToken ? true : false;
  const userName = userToken ? userToken.user_name : "ㅇㅇ";

  return (
    <div className="border-t border-neutral-400">
      <Header commentCount={commentCount} />
      <CommentList comments={commentData} />
      <PostCommentForm
        abbr={abbr}
        postId={postId}
        isLogin={isLogin}
        userName={userName}
      />
    </div>
  );
}
