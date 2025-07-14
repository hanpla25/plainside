import { getHomeData } from "@/app/lib/home-data";
import RealtimeBest from "@/app/ui/realtime-best";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function BestGallPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const { search = "", option = "title", page = "1" } = searchParams;

  const { popularPostData } = await getHomeData(searchParams);

  return (
    <>
      <RealtimeBest
        popularPostData={popularPostData}
        search={search as string}
        option={option as string}
        currentPage={Number(page)}
      />
    </>
  );
}
