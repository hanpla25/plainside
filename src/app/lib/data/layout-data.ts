import { fetchGallListData, getUserFromToken } from "./data";

export default async function getLayoutData() {
  const [user, gallList, newestGallList, popularGallList] = await Promise.all([
    getUserFromToken(),
    fetchGallListData(),
    fetchGallListData({ sort: "newest", size: 5 }),
    fetchGallListData({ sort: "popular", size: 5 }),
  ]);

  const gallMeta = gallList.map((g) => ({
    abbr: g.abbr,
    name: g.name,
  }));

  const newestGallMeta = newestGallList.map((g) => ({
    abbr: g.abbr,
    name: g.name,
  }));

  const popularGallMeta = popularGallList.map((g) => ({
    abbr: g.abbr,
    name: g.name,
  }));

  return { user, gallMeta, newestGallMeta, popularGallMeta };
}
