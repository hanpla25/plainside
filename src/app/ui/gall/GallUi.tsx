import { Post } from "@/app/lib/definitions";
import PostList from "../post/PostList";
import PostSearchForm from "../post/PostSearchForm";
import Pagination from "../common/Pagination";
import GallButtons from "./GallButtons";

type Props = {
  abbr: string;
  postListData: Post[];
  currentPage: number;
  search: string;
  option: string;
  totalPages: number;
  query: string;
  like_count: number;
  mode: string;
};

export default function GallUi({
  abbr,
  postListData,
  currentPage,
  search,
  option,
  totalPages,
  query,
  like_count,
  mode,
}: Props) {
  return (
    <>
      <GallButtons abbr={abbr} like_count={like_count} />
      <PostList
        abbr={abbr}
        isAbbr={true}
        PostListData={postListData}
        query={query}
      />
      <GallButtons abbr={abbr} like_count={like_count} />
      <PostSearchForm />
      <Pagination
        href={`/gallery/${abbr}`}
        currentPage={currentPage}
        search={search}
        option={option}
        totalPages={totalPages}
        mode={mode}
      />
    </>
  );
}
