import Link from "next/link";

type Props = {
  abbr: string;
  gallName: string;
};

export default function GallHeader({ abbr, gallName }: Props) {
  return (
    <h1 className="lg:px-0 px-2 py-2">
      <Link href={`/${abbr}`} className="font bold text-xl">
        {gallName}
      </Link>
    </h1>
  );
}
