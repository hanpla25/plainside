import { Post } from "@/app/lib/definitions";
import RealtimeBestPagination from "./RealtimeBestPagination";
import RealtimeBestSearchform from "./RealtimeBestSearchform";

type Props = {
  realtimeBestData: {
    data: Post[];
    count: number;
    totalPages: number;
  };
  currentPage: number;
  search?: string;
  option?: string;
};

export default function RealtimeBestBottom({
  realtimeBestData,
  currentPage,
  search,
  option,
}: Props) {
  return (
    <div>
      <RealtimeBestSearchform />
      <RealtimeBestPagination
        totalPages={realtimeBestData.totalPages}
        currentPage={currentPage}
        search={search}
        option={option}
      />
    </div>
  );
}
