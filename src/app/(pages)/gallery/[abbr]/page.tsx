import { fetchPostListData, fetchUserData } from "@/app/lib/data/data";
import GallUi from "@/app/ui/gall/GallUi";

type Params = Promise<{ abbr: string }>;
type SearchParams = Promise<{ [key: string]: string }>;

const LIKE_CUT = 10;

export default async function GallPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { search = "", option = "title", page = "1", mode = "" } = searchParams;
  const queryString = new URLSearchParams(searchParams).toString();

  const abbr = params.abbr;
  const like_count = mode === "popular" ? LIKE_CUT : 0;

  const postListData = await fetchPostListData({
    item_per_page: 10,
    page: Number(page),
    search: search as string,
    option: option as "title" | "nickname",
    like_count,
  });

  return (
    <>
      <GallUi
        abbr={abbr}
        postListData={postListData.postList}
        currentPage={Number(page)}
        search={search}
        option={option}
        totalPages={postListData.totalPages}
        query={queryString}
        like_count={like_count}
        mode={mode}
      />
    </>
  );
}
