export type PaginationResult = {
  pages: number[];
  hasPrev: boolean;
  hasNext: boolean;
  prevPage: number;
  nextPage: number;
};

export default function generatePagination(
  currentPage: number,
  totalPages: number,
  groupSize: number = 5
): PaginationResult {
  const currentGroup = Math.floor((currentPage - 1) / groupSize);
  const groupStart = currentGroup * groupSize + 1;
  const groupEnd = Math.min(groupStart + groupSize - 1, totalPages);

  const pages = Array.from(
    { length: groupEnd - groupStart + 1 },
    (_, i) => groupStart + i
  );

  const hasPrev = groupStart > 1;
  const hasNext = groupEnd < totalPages;

  return {
    pages,
    hasPrev,
    hasNext,
    prevPage: groupStart - 1,
    nextPage: groupEnd + 1,
  };
}
