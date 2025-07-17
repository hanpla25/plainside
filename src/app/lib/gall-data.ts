import { fetchGallName, fetchPostListData } from "./data";

export async function getGallPageData(
  abbr: string,
  searchParams: {
    search?: string | string[];
    option?: string | string[];
    page?: string | string[];
  }
) {
  const { search = "", option = "title", page = "1" } = searchParams;

  const [gallName, postListData] = await Promise.all([
    fetchGallName(abbr),
    fetchPostListData({
      item_per_page: 1,
      page: Number(page),
      search: search as string,
      option: option as "title" | "nickname",
      like_count: 10,
      abbr: abbr,
    }),
  ]);

  return {
    gallName,
    postListData,
  };
}
