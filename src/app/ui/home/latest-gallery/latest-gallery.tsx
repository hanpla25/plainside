import { Gallery } from "@/app/lib/definition";
import LatestGalleryList from "./latest-gallery-list";
import Link from "next/link";

export default function LatestGallery({
  latestGalleryData,
}: {
  latestGalleryData: Gallery[];
}) {
  return (
    <div className="mt-10 border border-neutral-400 p-2 pb-0">
      <h1 className="flex justify-between items-center">
        <span>최신 갤러리</span>
        <Link href={"/category"} className="text-xs text-neutral-600">
          전체 갤러리 보기
        </Link>
      </h1>
      <LatestGalleryList latestGalleryData={latestGalleryData} />
    </div>
  );
}
