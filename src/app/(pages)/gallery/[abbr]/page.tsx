import { fetchGallName } from "@/app/lib/data";
import RecentGallerySaver from "@/app/ui/recent-gall/recent-gall-saver";

type Params = Promise<{ abbr: string }>;

export default async function GalleryPage(props: { params: Params }) {
  const params = await props.params;
  const abbr = params.abbr;
  const gallName = await fetchGallName(abbr);

  const recentGalleryData = {
    abbr: abbr,
    name: gallName,
    href: `/gallery/${params.abbr}`,
  };

  return (
    <div>
      <RecentGallerySaver
        recentGalleryData={recentGalleryData}
        gallName={gallName}
      />
    </div>
  );
}
