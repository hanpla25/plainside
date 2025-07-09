import { fetchGallList } from "./data";

export async function getHomeData() {
  try {
    const [popularGallList] = await Promise.all([
      fetchGallList({ sort: "today_post_count", limit: 5 }),
    ]);

    const gallMeta = popularGallList.map((g) => ({
      abbr: g.abbr,
      name: g.gall_name,
    }));

    return { popularGallList, gallMeta };
  } catch (error) {
    console.error("getLayoutData 실패:", error);
    return {
      popularGallList: [],
      gallMeta: [],
    };
  }
}
