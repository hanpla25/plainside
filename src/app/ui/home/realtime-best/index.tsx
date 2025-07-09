import { Post } from "@/app/lib/definitions";
import RealtimeBestHeader from "./RealtimeBestHeader";
import RealtimeBestList from "./RealtimeBestList";
import RealtimeBestBottom from "./RealtimeBestBottom";

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

export default function RealtimeBest({
  realtimeBestData,
  currentPage,
  search,
  option,
}: Props) {
  return (
    <div>
      <RealtimeBestHeader />
      <RealtimeBestList realtimeBestData={realtimeBestData} />
      <RealtimeBestBottom
        realtimeBestData={realtimeBestData}
        currentPage={currentPage}
        search={search}
        option={option}
      />
    </div>
  );
}
