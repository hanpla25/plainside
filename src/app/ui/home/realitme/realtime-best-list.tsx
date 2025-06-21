import { Post } from "@/app/lib/definition";
import RealtimeBestItem from "./realtime-best-item";

type Props = {
  realtimeBestData: {
    data: Post[];
    count: number;
    totalPages: number;
  };
};

export default function RealtimeBestList({ realtimeBestData }: Props) {
  if (realtimeBestData.count === 0) {
    return (
      <div className="flex justify-center py-70 min-h-[80vh]">
        게시글이 없습니다.
      </div>
    );
  }

  return (
    <div className="min-h-[70vh]">
      <ul>
        {realtimeBestData.data.map((post) => (
          <RealtimeBestItem post={post} key={post.id} />
        ))}
      </ul>
    </div>
  );
}
