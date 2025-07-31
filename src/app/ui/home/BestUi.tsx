import { Post } from "@/app/lib/definitions";
import HeaderText from "../common/HeaderText";
import PostList from "../post/PostList";
import PostSearchForm from "../post/PostSearchForm";
import Pagination from "../common/Pagination";

type Props = {
  popularList: Post[];
  currentPage: number;
  search: string;
  option: string;
  totalPages: number;
  query: string;
};

export default function BestUi({
  popularList,
  currentPage,
  search,
  option,
  totalPages,
  query,
}: Props) {
  return (
    <>
      <HeaderText label="실시간 베스트" href="/" />
      <PostList PostListData={popularList} query={query} />
      <PostSearchForm />
      <Pagination
        href="/"
        currentPage={currentPage}
        search={search}
        option={option}
        totalPages={totalPages}
      />
    </>
  );
}
