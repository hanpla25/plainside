import { fetchGallName } from "@/app/lib/data";
import Link from "next/link";
import { WriteLinkButton } from "./clientButtons";

type Props = {
  abbr: string;
};

export default async function GalleryHeader({ abbr }: Props) {
  const gallName = await fetchGallName(abbr);

  return (
    <header className="text-lg px-2 lg:px-0 py-2 flex justify-between items-center">
      <Link href={`/gallery/${abbr}`}>{gallName}</Link>
      <WriteLinkButton abbr={abbr} />
    </header>
  );
}
