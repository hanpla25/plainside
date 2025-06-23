import { Comment, UserData } from "@/app/lib/definition";
import CommentsList from "./comment-list";
import Pagination from "../../common/pagination";

export default function Comments({
  comments,
  userData,
  ITEM_PER_PAGE,
}: {
  comments: Comment[];
  userData: UserData | null;
  ITEM_PER_PAGE: number;
}) {
  const commentCount = userData?.comment_count ?? 0;
  const totalPages = Math.ceil(commentCount / ITEM_PER_PAGE);

  return (
    <div className="border-b-2 border-neutral-400 pb-2">
      <div className="border-b-2 border-neutral-200">
        <h1 className="p-2 font-bold">
          <span>댓글 </span>
          <span className="text-sm">({userData?.comment_count})</span>
        </h1>
      </div>
      <CommentsList comments={comments} />
      <Pagination totalPages={totalPages} paramKey="commentPage" />
    </div>
  );
}
