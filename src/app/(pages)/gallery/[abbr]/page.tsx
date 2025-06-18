import { fetchGalleryName } from "@/app/lib/data";
import RecentGallerySaver from "@/app/ui/recent-visit/RecentGallerySaver";

type Params = Promise<{ abbr: string }>;

export default async function GalleryPage(props: { params: Params }) {
  const params = await props.params;
  const abbr = params.abbr;
  const gallName = await fetchGalleryName(abbr);

  const recentVisitData = {
    abbr: abbr,
    name: gallName,
    href: `/gallery/${params.abbr}`,
  };
  console.log(abbr);

  return (
    <RecentGallerySaver recentVisitData={recentVisitData} gallName={gallName} />
  );
}
