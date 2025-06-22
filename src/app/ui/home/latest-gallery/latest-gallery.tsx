import { Gallery } from "@/app/lib/definition";
import LatestGalleryList from "./latest-gallery-list";

export default function LatestGallery({
  latestGalleryData,
}: {
  latestGalleryData: Gallery[];
}) {
  return (
    <div className="mt-10 border border-neutral-400 p-2 pb-0">
      <h1>최신 갤러리</h1>
      <LatestGalleryList latestGalleryData={latestGalleryData} />
    </div>
  );
}
