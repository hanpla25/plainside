import { RecentGall } from "@/app/lib/definition";
import RecentGallItem from "./recent-gall-item";

type Props = {
  recentGall: RecentGall[];
  onRemove: (abbr: string) => void;
};

export default function RecentGallList({ recentGall, onRemove }: Props) {
  if (recentGall.length === 0) {
    return (
      <div className="border border-neutral-300 text-center p-5">
        <span>최근 방문 갤러리가 없습니다.</span>
      </div>
    );
  }

  return (
    <div className="border border-neutral-300 grid grid-cols-2 gap-2 p-2">
      {recentGall.map((item, i) => (
        <RecentGallItem key={i} {...item} onRemove={onRemove} />
      ))}
    </div>
  );
}
