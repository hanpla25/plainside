import getHomeData from "@/app/lib/data/home-data";
import BestUi from "@/app/ui/home/BestUi";
import PopularGallList from "@/app/ui/layout/right-items/gall-list/PopularGallList";

type SearchParams = Promise<{ [key: string]: string }>;

export default async function HomePage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const { search = "", option = "title", page = "1" } = searchParams;
  const queryString = new URLSearchParams(searchParams).toString();

  const { popularGallMeta, bestPostListData } = await getHomeData({
    search,
    option,
    page,
  });
  const popularList = bestPostListData.postList;
  const totalPages = bestPostListData.totalPages;

  return (
    <>
      <div className="lg:hidden">
        <PopularGallList popularGallMeta={popularGallMeta} />
      </div>
      <BestUi
        popularList={popularList}
        search={search as string}
        option={option as string}
        currentPage={Number(page)}
        totalPages={totalPages}
        query={queryString}
      />
    </>
  );
}
