import { Gallery } from "@/app/lib/definition";
import MobilePopularGalleryItem from "./mobile-popular-gallery-item";

export default function MobilePopularGalleryList({
  galleryData,
}: {
  galleryData: Gallery[];
}) {
  const slicedGalleryData = galleryData.slice(0, 5);
  return (
    <div className="flex flex-wrap gap-3">
      {slicedGalleryData.map((item) => (
        <MobilePopularGalleryItem key={item.abbr} {...item} />
      ))}
    </div>
  );
}
