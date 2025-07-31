import Link from "next/link";

type Props = {
  abbr: string;
};

export default function WriteButtons({ abbr }: Props) {
  return (
    <div className="flex items-center justify-end gap-4 mx-2 mt-4">
      <Link
        href={`/gallery/${abbr}`}
        className="px-4 py-2 border border-neutral-400 bg-neutral-600 text-white rounded-sm"
      >
        취소
      </Link>
      <button
        type="submit"
        className="px-4 py-2 border border-neutral-400  rounded-sm cursor-pointer"
      >
        등록
      </button>
    </div>
  );
}
