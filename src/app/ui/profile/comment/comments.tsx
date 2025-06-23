import { Comment, UserData } from "@/app/lib/definition";
import CommentsList from "./comment-list";

export default function Comments({
  comments,
  userData,
}: {
  comments: Comment[];
  userData: UserData | null;
}) {
  return (
    <>
      <h1 className="p-2 font-bold ">
        <span>댓글 </span>
        <span className="text-sm">({userData?.comment_count})</span>
      </h1>
      <CommentsList comments={comments} />
    </>
  );
}
