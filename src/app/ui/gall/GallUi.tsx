// --- 타입 ---
import { PostList } from "@/app/lib/definitions";

// --- UI ---
import GallPostList from "./GallPostList";
import GallSearchForm from "./GallSearchForm";
import Pagination from "../common/Pagination";

type Props = {
  abbr: string;
  postList: PostList[];
  currentPage: number;
  totalPage: number;
  queryString: string;
};

export default function GallUi({
  abbr,
  postList,
  currentPage,
  totalPage,
  queryString,
}: Props) {
  return (
    <div>
      <GallPostList abbr={abbr} postList={postList} queryString={queryString} />
      <GallSearchForm abbr={abbr} />
      <Pagination currentPage={currentPage} totalPage={totalPage} />
    </div>
  );
}
