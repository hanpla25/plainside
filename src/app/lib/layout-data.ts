import { fetchGallList, getUserFromToken } from "./data";

export async function getLayoutData() {
  try {
    const [user, gallList, popularGallList] = await Promise.all([
      getUserFromToken(),
      fetchGallList({ sort: "newest" }),
      fetchGallList({ sort: "today_post_count", limit: 5 }),
    ]);

    const gallMeta = gallList.map((g) => ({
      abbr: g.abbr,
      name: g.gall_name,
    }));

    return { user, gallList, popularGallList, gallMeta };
  } catch (error) {
    console.error("getLayoutData 실패:", error);
    return {
      user: null,
      gallList: [],
      popularGallList: [],
      gallMeta: [],
    };
  }
}
