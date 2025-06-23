import {
  fetchGalleries,
  fetchPosts,
  getUserData,
  getUserFromToken,
} from "../lib/data";
import { Gallery, Post, UserData, UserPayload } from "../lib/definition";
import LatestGallery from "../ui/home/latest-gallery/latest-gallery";
import MobilePopularGallery from "../ui/home/popular-gallery/mobile-popular-gallery";
import ProfileBox from "../ui/home/profile/profile-box";
import RealtimeBest from "../ui/home/realitme/realtime-best";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Home(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const { search = "", option = "title", page = "1" } = searchParams;

  let user: UserPayload | null = null;
  let userData: UserData | null = null;

  let realtimeBestData: {
    data: Post[];
    count: number;
    totalPages: number;
  } = {
    data: [],
    count: 0,
    totalPages: 1,
  };
  let latestGalleryData: Gallery[] = [];
  let popularGalleryData: Gallery[] = [];

  try {
    user = await getUserFromToken();
    if (user) {
      userData = await getUserData(user);
    }

    const [realtimeBest, latestGallery, popularGallery] = await Promise.all([
      fetchPosts({
        page: Number(page),
        search: search as string,
        option: option as "title" | "nickname",
        like_count: 10,
      }),
      fetchGalleries({ option: "latest" }),
      fetchGalleries({ option: "popular" }),
    ]);

    realtimeBestData = realtimeBest;
    latestGalleryData = latestGallery;
    popularGalleryData = popularGallery;
  } catch (error) {
    console.error("Home page 데이터 로딩 실패:", error);
  }

  return (
    <>
      <MobilePopularGallery galleryData={popularGalleryData} />
      <div className="flex gap-4">
        <div className="flex-3/4">
          <RealtimeBest realtimeBestData={realtimeBestData} />
        </div>

        <div className="hidden lg:block flex-1/4 pt-4">
          <ProfileBox userData={userData} />
          <LatestGallery latestGalleryData={latestGalleryData} />
        </div>
      </div>
    </>
  );
}
