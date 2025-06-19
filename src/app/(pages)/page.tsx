import RealtimeBest from "../ui/home/realtime-best";

export default function Home() {
  return (
    <div className="flex">
      {/* 왼쪽 영역 */}
      <div className="flex-2/3">
        <RealtimeBest />
      </div>

      {/* 오른쪽 영역 */}
      <div className="hidden lg:block flex-1/3">오른쪽</div>
    </div>
  );
}
