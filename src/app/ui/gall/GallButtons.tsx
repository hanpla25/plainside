import Link from "next/link";

type Props = {
  abbr: string;
  isPopular: boolean;
};

const activeCss =
  "text-neutral-700 hover:text-neutral-900 border-b-2 border-neutral-700";

const inActiveCss = "text-neutral-500 hover:text-neutral-800";

const Tap = ({
  name,
  href,
  isActive,
}: {
  name: string;
  href: string;
  isActive: boolean;
}) => {
  return (
    <Link href={href} className={isActive ? activeCss : inActiveCss}>
      {name}
    </Link>
  );
};

const WriteLink = ({ abbr }: { abbr: string }) => {
  return (
    <Link
      href={`/${abbr}/write`}
      className="px-4 py-1.5 rounded-xl bg-neutral-800 text-white text-sm font-medium hover:bg-neutral-700 transition-colors shadow-sm"
    >
      글쓰기
    </Link>
  );
};

export default function GallButtons({ abbr, isPopular }: Props) {
  return (
    <div className="flex items-center justify-between border-b border-neutral-200 px-2 lg:px-0 pb-2 mb-2">
      <div className="flex gap-4 text-sm font-medium">
        <Tap name="전체글" href={`/${abbr}`} isActive={!isPopular} />
        <Tap
          name="개념글"
          href={`/${abbr}?mode=popular`}
          isActive={isPopular}
        />
      </div>
      <WriteLink abbr={abbr} />
    </div>
  );
}
