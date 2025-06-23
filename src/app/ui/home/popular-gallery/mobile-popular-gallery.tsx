import { Gallery } from "@/app/lib/definition";
import MobilePopularGalleryList from "./mobile-popular-gallery-list";

export default function MobilePopularGallery({
  galleryData,
}: {
  galleryData: Gallery[];
}) {
  return (
    <div className="lg:hidden p-2">
      <h2 className="text-lg font-bold mb-2">인기 갤러리</h2>
      <MobilePopularGalleryList galleryData={galleryData} />
    </div>
  );
}
