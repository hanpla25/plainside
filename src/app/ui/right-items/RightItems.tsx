// --- 타입 ---
import { Gall } from "@/app/lib/definitions";

// --- UI ---
import GallList from "./gall-list";
import LoginBox from "./login-box";

type Props = {
  popularGallData: Gall[];
  newestGallData: Gall[];
};

const ItemWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-2 border border-neutral-400 hidden lg:block">
      {children}
    </div>
  );
};

export default async function RightItems({
  popularGallData,
  newestGallData,
}: Props) {
  return (
    <>
      <ItemWrapper>
        <LoginBox />
      </ItemWrapper>

      <ItemWrapper>
        <GallList label="인기 갤러리" gallData={popularGallData} />
      </ItemWrapper>

      <ItemWrapper>
        <GallList label="최신 갤러리" gallData={newestGallData} />
      </ItemWrapper>
    </>
  );
}
