import { GallMeta } from "@/app/lib/definitions";
import { Settings } from "lucide-react";

type Props = {
  setIsModify: React.Dispatch<React.SetStateAction<boolean>>;
  recentGall: GallMeta[];
};

export default function RecentGallHeader({ setIsModify, recentGall }: Props) {
  return (
    <div className="mb-3">
      {recentGall.length !== 0 && (
        <button
          className="flex items-center gap-0.5 text-xs text-neutral-600 cursor-pointer"
          onClick={() => setIsModify((prev) => !prev)}
        >
          <span>수정</span>
          <Settings size={14} />
        </button>
      )}
    </div>
  );
}
