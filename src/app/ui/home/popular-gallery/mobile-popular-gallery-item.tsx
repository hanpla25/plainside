import { Gallery } from "@/app/lib/definition";
import Link from "next/link";

export default function MobilePopularGalleryItem({ gall_name, abbr }: Gallery) {
  return (
    <div className="flex-shrink-0 bg-gray-100 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-200 transition">
      <Link href={`/gallery/${abbr}`} className="text-sm font-semibold">
        {gall_name}
      </Link>
    </div>
  );
}
