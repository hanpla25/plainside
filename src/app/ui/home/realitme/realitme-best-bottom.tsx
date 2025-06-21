import RealtimeBestPagination from "./realtime-best-pagination";
import RealtimeBestSearchForm from "./realtime-best-search-form";

export default function RealtimeBestBottom({
  totalPages,
}: {
  totalPages: number;
}) {
  return (
    <div className="border-t border-neutral-300 py-2">
      <RealtimeBestSearchForm />
      <RealtimeBestPagination totalPages={totalPages} />
    </div>
  );
}
