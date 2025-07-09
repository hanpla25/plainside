import { RecentGall } from "@/app/lib/definitions";

type Props = {
  setIsModify: React.Dispatch<React.SetStateAction<boolean>>;
  recentGall: RecentGall[];
};

export default function RecentGallHeader({ setIsModify, recentGall }: Props) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <h2 className="text-lg font-semibold">최근 방문 갤러리</h2>
      {recentGall.length !== 0 && (
        <button
          className="text-xs text-neutral-600 cursor-pointer"
          onClick={() => setIsModify((prev) => !prev)}
        >
          수정하기
        </button>
      )}
    </div>
  );
}
