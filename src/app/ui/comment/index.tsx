// --- UI ---
import { CommentData } from "@/app/lib/definitions";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

type Props = {
  postCommentData: CommentData[] | null;
};

export default function CommentUi({ postCommentData }: Props) {
  return (
    <>
      <CommentList postCommentData={postCommentData} />
      <CommentForm />
    </>
  );
}
