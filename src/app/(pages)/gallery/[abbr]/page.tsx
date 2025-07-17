import { getGallPageData } from "@/app/lib/gall-data";
import HeaderText from "@/app/ui/common/HeaderText";
import Pagination from "@/app/ui/common/Pagination";
import PostList from "@/app/ui/post/PostList";
import PostSearchForm from "@/app/ui/post/PostSearchForm";

type Params = Promise<{ abbr: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function GallPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const { search = "", option = "title", page = "1" } = searchParams;

  const params = await props.params;
  const abbr = params.abbr;

  const { gallName, postListData } = await getGallPageData(abbr, searchParams);

  return (
    <>
      <HeaderText label={gallName} href={abbr} />
      <PostList PostListData={postListData.data} />
      <PostSearchForm />
      <Pagination
        href={`/gallery/${abbr}`}
        currentPage={Number(page)}
        search={search as string}
        option={option as string}
        totalPages={postListData.totalPages}
      />
    </>
  );
}
