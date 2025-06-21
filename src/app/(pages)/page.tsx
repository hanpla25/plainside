import { fetchPosts, getUserData, getUserFromToken } from "../lib/data";
import ProfileBox from "../ui/home/profile/profile-box";
import RealtimeBest from "../ui/home/realitme/realtime-best";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Home(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const { search = "", option = "title", page = "1" } = searchParams;

  const realtimeBestData = await fetchPosts({
    page: Number(page),
    search: search as string,
    option: option as "title" | "nickname",
  });

  const user = await getUserFromToken();
  const userData = user ? await getUserData(user) : null;

  return (
    <div className="flex">
      {/* 왼쪽 영역 */}
      <div className="flex-3/4">
        <RealtimeBest realtimeBestData={realtimeBestData} />
      </div>

      {/* 오른쪽 영역 */}
      <div className="hidden lg:block flex-1/4">
        <ProfileBox userData={userData} />
      </div>
    </div>
  );
}
