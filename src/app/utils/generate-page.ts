export default function generatePagination(
  currentPage: number,
  totalPages: number
) {
  const groupSize = 5;

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
