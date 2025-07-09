import { UserCommentsData } from "@/app/lib/definitions";
import CommentsList from "./CommentsList";
import ProfilePagination from "./ProfilePagination";
import { ITEM_PER_PAGE } from ".";

type Props = {
  currentMenu: string;
  comments: UserCommentsData;
  currentPage: number;
};

export default function CommentsPage({
  currentMenu,
  comments,
  currentPage,
}: Props) {
  const totalPages = Math.ceil(comments.count / ITEM_PER_PAGE);

  return (
    <>
      <CommentsList comments={comments} />
      <ProfilePagination
        currentMenu={currentMenu}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
}
