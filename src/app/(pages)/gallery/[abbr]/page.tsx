import GalleryList from "@/app/ui/gallery/GalleryList";
import GalleryTap from "@/app/ui/gallery/GalleryTap";

type Params = Promise<{ abbr: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function GalleryPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const abbr = params.abbr;
  const modeParams = searchParams.mode as string | undefined;
  const mode = modeParams || "all";

  return (
    <>
      <GalleryTap abbr={abbr} mode={mode} />
      <GalleryList />
    </>
  );
}
