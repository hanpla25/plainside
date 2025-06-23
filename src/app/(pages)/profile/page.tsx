import {
  getUserData,
  getUserFromToken,
  getUsersCommentsData,
  getUsersPostsData,
} from "@/app/lib/data";
import { Comment, Post, UserData, UserPayload } from "@/app/lib/definition";
import Comments from "@/app/ui/profile/comment/comments";
import Posts from "@/app/ui/profile/post/posts";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  let user: UserPayload | null = null;
  let userData: UserData | null = null;
  let posts: Post[] = [];
  let comments: Comment[] = [];

  try {
    user = await getUserFromToken();

    if (!user) {
      redirect("/");
    }

    userData = await getUserData(user);

    const [userPosts, userComments] = await Promise.all([
      getUsersPostsData(user),
      getUsersCommentsData(user),
    ]);

    posts = userPosts;
    comments = userComments;
  } catch (error) {
    console.error("프로필 데이터 로딩 실패:", error);
  }

  return (
    <>
      <h1 className="py-2 text-lg font-bold border-b-2 border-neutral-400">
        <div className="px-2">{userData?.user_name}의 프로필</div>
      </h1>
      <Posts posts={posts} userData={userData} />
      <Comments comments={comments} userData={userData} />
    </>
  );
}
