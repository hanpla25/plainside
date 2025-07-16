import { Post } from "@/app/lib/definitions";
import HeaderText from "../common/HeaderText";
import PostList from "../common/PostList";
import PostSearchForm from "../common/PostSearchForm";
import Pagination from "../common/Pagination";

type PopularPostData = {
  data: Post[];
  count: number;
  totalPages: number;
};

type Props = {
  popularPostData: PopularPostData;
  currentPage: number;
  search: string;
  option: string;
};

export default function RealtimeBest({
  currentPage,
  search,
  option,
  popularPostData,
}: Props) {
  return (
    <>
      <HeaderText label="실시간 베스트" href="/best" />
      <PostList PostListData={popularPostData.data} />
      <PostSearchForm />
      <Pagination
        currentPage={currentPage}
        search={search}
        option={option}
        totalPages={popularPostData.totalPages}
      />
    </>
  );
}
