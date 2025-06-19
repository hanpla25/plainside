import { fetchGallName } from "@/app/lib/data";

type Params = Promise<{ abbr: string }>;

export default async function GalleryPage(props: { params: Params }) {
  const params = await props.params;
  const abbr = params.abbr;
  const gallName = await fetchGallName(abbr);

  return <div>갤러리</div>;
}
