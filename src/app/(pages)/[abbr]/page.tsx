// --- Data ---
import { getAbbrPageData } from "@/app/lib/abbr-page-helper";

/// --- UI ---
import GallUi from "@/app/ui/gall/GallUi";

type Params = Promise<{ abbr: string }>;
type SearchParams = Promise<{ [key: string]: string }>;

export default async function AbbrPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { sort } = searchParams;
  const isPopular = sort ? true : false;

  const abbr = params.abbr;

  const data = await getAbbrPageData({
    abbr,
    searchParams,
    isPopular: isPopular,
  });

  return (
    <div>
      <GallUi
        abbr={abbr}
        postListData={data.postListData}
        currentPage={data.currentPage}
        totalPage={data.totalPage}
        queryString={data.queryString}
      />
    </div>
  );
}
