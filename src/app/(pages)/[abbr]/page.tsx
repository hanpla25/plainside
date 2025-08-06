// --- Data ---
import { fetchPostListData } from "@/app/lib/gall-data";

/// --- UI ---
import GallUi from "@/app/ui/gall/GallUi";

type Params = Promise<{ abbr: string }>;
type SearchParams = Promise<{ [key: string]: string }>;

export default async function AbbrPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const abbr = params.abbr;

  const searchParams = await props.searchParams;
  const { search = "", option = "title", page = "1" } = searchParams;

  const [postListData] = await Promise.all([
    fetchPostListData({
      abbr,
      page: Number(page),
      search: search,
      option: option,
    }),
  ]);

  return (
    <div>
      <GallUi
        abbr={abbr}
        postListData={postListData}
        currentPage={Number(page)}
        totalPage={postListData.total_page}
      />
    </div>
  );
}
