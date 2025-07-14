import { RecentGall } from "@/app/lib/definitions";

type Props = {
  setIsModify: React.Dispatch<React.SetStateAction<boolean>>;
  recentGall: RecentGall[];
};

export default function RecentGallHeader({ setIsModify, recentGall }: Props) {
  return (
    <div className="mb-3">
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
