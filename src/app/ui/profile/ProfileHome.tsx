import { UserCommentsData, UserPostData } from "@/app/lib/definitions";
import PostsList from "./PostsList";
import CommentsList from "./CommentsList";

type Props = {
  posts: UserPostData;
  comments: UserCommentsData;
};

export default function ProfileHome({ posts, comments }: Props) {
  return (
    <div>
      <PostsList posts={posts} />
      <CommentsList comments={comments} />
    </div>
  );
}
