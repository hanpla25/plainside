import { fetchGallData, fetchPostListData } from "./data";

export async function getHomeData(searchParams: {
  search?: string | string[];
  option?: string | string[];
  page?: string | string[];
}) {
  const { search = "", option = "title", page = "1" } = searchParams;

  const [popularGallData, popularPostData] = await Promise.all([
    fetchGallData({ sort: "popular" }),
    fetchPostListData({
      item_per_page: 10,
      page: Number(page),
      search: search as string,
      option: option as "title" | "nickname",
      like_count: 10,
    }),
  ]);

  const popularGallMeta = popularGallData.map((g) => ({
    abbr: g.abbr,
    name: g.name,
  }));

  return {
    popularGallMeta,
    popularPostData,
  };
}
