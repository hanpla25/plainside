import { fetchRealtimePosts } from "../lib/data";
import RealtimeBest from "../ui/home/realtime-best";

export default async function Home() {
  const realtimeBestData = await fetchRealtimePosts();
  console.log(realtimeBestData);

  return (
    <div className="flex">
      {/* 왼쪽 영역 */}
      <div className="flex-3/4">
        <RealtimeBest realtimeBestData={realtimeBestData} />
      </div>

      {/* 오른쪽 영역 */}
      <div className="hidden lg:block flex-1/4">오른쪽</div>
    </div>
  );
}
