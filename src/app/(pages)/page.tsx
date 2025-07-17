import { getHomeData } from "../lib/home-data";
import PopularGall from "../ui/popular-gall";
import RealtimeBest from "../ui/realtime-best";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function HomePage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const { search = "", option = "title", page = "1" } = searchParams;

  const { popularGallMeta, popularPostData } = await getHomeData(searchParams);

  return (
    <>
      <PopularGall popularGallData={popularGallMeta} />
      <RealtimeBest
        popularPostData={popularPostData}
        search={search as string}
        option={option as string}
        currentPage={Number(page)}
      />
    </>
  );
}
