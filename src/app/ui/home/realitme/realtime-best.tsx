import { Post } from "@/app/lib/definition";
import RealtimeBestList from "./realtime-best-list";
import Link from "next/link";
import RealtimeBestBottom from "./realitme-best-bottom";

type Props = {
  realtimeBestData: {
    data: Post[];
    count: number;
    totalPages: number;
  };
};

export default function RealtimeBest({ realtimeBestData }: Props) {
  return (
    <div>
      <h1 className="p-2 text-sm font-extrabold mt-2">
        <Link href={"/gallery/realtimebest"}>실시간 베스트</Link>
      </h1>
      <RealtimeBestList realtimeBestData={realtimeBestData} />
      <RealtimeBestBottom totalPages={realtimeBestData.totalPages} />
    </div>
  );
}
