import { RecentGall } from "@/app/lib/definition";
import RecentGallItem from "./recent-gall-item";

type Props = {
  recentGallData: RecentGall[];
  onRemove: (abbr: string) => void;
};

export default function RecentGallList({ recentGallData, onRemove }: Props) {
  if (recentGallData.length === 0) {
    return (
      <div className="border border-neutral-300 text-center p-5">
        <span>최근 방문 갤러가 없습니다.</span>
      </div>
    );
  }

  return (
    <div className="border border-neutral-300 grid grid-cols-2 gap-2 p-2">
      {recentGallData.map((item, i) => (
        <RecentGallItem key={i} {...item} onRemove={onRemove} />
      ))}
    </div>
  );
}
