import { fetchGallData, getUserFromToken } from "./data";

export async function getLayoutData() {
  const [user, gallList, newestGallData, popularGallData] = await Promise.all([
    getUserFromToken(),
    fetchGallData({ sort: "newest" }),
    fetchGallData({ sort: "newest", size: 5 }),
    fetchGallData({ sort: "popular", size: 5 }),
  ]);

  const gallMeta = gallList.map((g) => ({
    abbr: g.abbr,
    name: g.name,
  }));

  const newestGallMeta = newestGallData.map((g) => ({
    abbr: g.abbr,
    name: g.name,
  }));

  const popularGallMeta = popularGallData.map((g) => ({
    abbr: g.abbr,
    name: g.name,
  }));

  return {
    user,
    gallMeta,
    newestGallMeta,
    popularGallMeta,
  };
}
