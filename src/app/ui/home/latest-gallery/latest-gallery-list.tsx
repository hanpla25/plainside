import { Gallery } from "@/app/lib/definition";
import LatestGalleryItem from "./latest-gallery-item";

export default function LatestGalleryList({
  latestGalleryData,
}: {
  latestGalleryData: Gallery[];
}) {
  const limitedData = latestGalleryData.slice(0, 5); 

  return (
    <ul className="divide-y divide-neutral-200 overflow-hidden">
      {limitedData.map((item, i) => (
        <LatestGalleryItem key={item.abbr} index={i + 1} {...item} />
      ))}
    </ul>
  );
}
