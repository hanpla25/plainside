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

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
const ITEM_PER_PAGE = 5;

export default async function ProfilePage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const { postPage = "1", commentPage = "1" } = searchParams;
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
      getUsersPostsData(user, Number(postPage), ITEM_PER_PAGE),
      getUsersCommentsData(user, Number(commentPage), ITEM_PER_PAGE),
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
      <Posts posts={posts} userData={userData} ITEM_PER_PAGE={ITEM_PER_PAGE} />
      <Comments
        comments={comments}
        userData={userData}
        ITEM_PER_PAGE={ITEM_PER_PAGE}
      />
    </>
  );
}
