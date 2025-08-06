// --- Types ---
import { PostListData } from "@/app/lib/definitions";

// --- Ui ---
import GallPostList from "./GallPostList";
import GallSearchForm from "./GallSearchForm";
import Pagination from "../common/Pagination";

type Props = {
  abbr: string;
  postListData: PostListData;
  currentPage: number;
  totalPage: number;
  queryString: string;
};

export default function GallUi({
  abbr,
  postListData,
  currentPage,
  totalPage,
  queryString,
}: Props) {
  return (
    <>
      <GallPostList
        abbr={abbr}
        postList={postListData.post_list}
        queryString={queryString}
      />
      <GallSearchForm abbr={abbr} />
      <Pagination currentPage={currentPage} totalPage={totalPage} />
    </>
  );
}
