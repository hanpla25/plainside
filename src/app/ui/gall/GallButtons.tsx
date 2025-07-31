import Link from "next/link";

type Props = {
  abbr: string;
  like_count: number;
};

const selectedButtonStyle = `px-2 py-0.5 bg-neutral-500 text-white rounded-sm  inline-block text-center`;
const notSelectedButtonStyle = `px-2 py-0.5 border border-neutral-500 rounded-sm inline-block text-center`;

export default function GallButtons({ abbr, like_count }: Props) {
  return (
    <div className="flex items-center justify-between mx-2 lg:mx-0">
      <div className="space-x-2">
        <Link
          href={`/gallery/${abbr}`}
          className={`${
            like_count === 10 ? notSelectedButtonStyle : selectedButtonStyle
          }`}
        >
          전체글
        </Link>

        <Link
          href={`/gallery/${abbr}?mode=popular`}
          className={`${
            like_count === 10 ? selectedButtonStyle : notSelectedButtonStyle
          }`}
        >
          인기글
        </Link>
      </div>

      <Link
        href={`/gallery/${abbr}/write`}
        className={`${notSelectedButtonStyle}`}
      >
        글쓰기
      </Link>
    </div>
  );
}
