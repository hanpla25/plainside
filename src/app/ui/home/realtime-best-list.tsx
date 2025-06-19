
import { Post } from "@/app/lib/definition";
import RealtimeBestItem from "./realtime-best-item";

type Props = {
  realtimeBestData: Post[];
};

export default function RealtimeBestList({ realtimeBestData }: Props) {
  if (realtimeBestData.length === 0) {
    return (
      <div className="flex justify-center py-70">
        아직 실시간 베스트 게시글이 없습니다.
      </div>
    );
  }

  return (
    <div>
      <ul>
        {realtimeBestData.map((post) => (
          <RealtimeBestItem post={post} key={post.id} />
        ))}
      </ul>
    </div>
  );
}
