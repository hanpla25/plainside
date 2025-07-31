import type { Comment as CommentType } from "@/app/lib/definitions";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

type Props = { commentListData: CommentType[] | null };
export default function Comment({ commentListData }: Props) {
  return (
    <div className="mt-4 pt-4 border-t border-neutral-400 space-y-4">
      <CommentList commentListData={commentListData} />
      <CommentForm />
    </div>
  );
}
