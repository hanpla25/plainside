export function getRecentGalleries(): RecentGallery[] {
  const stored = localStorage.getItem("recent-gall");
  if (stored) {
    try {
      const parsed: RecentGallery[] = JSON.parse(stored);
      return parsed;
    } catch (err) {
      console.error("최근 방문 갤러리 파싱 오류:", err);
    }
  }
  return [];
}

export function setRecentGalleries(newItem: RecentGallery) {
  try {
    const stored = localStorage.getItem("recent-gall");
    let items: RecentGallery[] = [];

    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        items = parsed;
      }
    }

    items = items.filter((item) => item.abbr !== newItem.abbr);

    const newItems = [newItem, ...items];

    localStorage.setItem("recent-gall", JSON.stringify(newItems));

    return newItems;
  } catch (error) {
    console.error("최근 방문 갤러리 저장 오류:", error);
    return [];
  }
}
