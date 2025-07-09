import RealtimeBest from "../ui/home/realtime-best";
import { fetchPostData } from "../lib/data";
import { getHomeData } from "../lib/home-data";
import PopularGall from "../ui/popular-gall";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function HomePage(props: { searchParams: SearchParams }) {
  const { popularGallList } = await getHomeData();

  const searchParams = await props.searchParams;
  const { search = "", option = "title", page = "1" } = searchParams;

  const realtimeBestData = await fetchPostData({
    page: Number(page),
    search: search as string,
    option: option as "title" | "nickname",
    like_count: 10,
  });

  return (
    <div>
      <PopularGall popularGallData={popularGallList} />
      <RealtimeBest
        realtimeBestData={realtimeBestData}
        currentPage={Number(page)}
        search={search as string}
        option={option as string}
      />
    </div>
  );
}
