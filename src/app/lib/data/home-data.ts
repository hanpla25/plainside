import { fetchGallListData, fetchPostListData } from "./data";

type Props = {
  search: string;
  option: string;
  page: string;
};

export default async function getHomeData({ search, option, page }: Props) {
  const [popularGallList, bestPostListData] = await Promise.all([
    fetchGallListData({ sort: "popular", size: 10 }),
    fetchPostListData({
      item_per_page: 10,
      page: Number(page),
      search: search as string,
      option: option as "title" | "nickname",
      like_count: 10,
    }),
  ]);

  const popularGallMeta = popularGallList.map((g) => ({
    abbr: g.abbr,
    name: g.name,
  }));

  return { popularGallMeta, bestPostListData };
}
