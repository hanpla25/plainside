import { Gall, UserPayload } from "@/app/lib/definitions";
import LoginBox from "./login-box";
import PopularGallBox from "./PopularGallBox";
import NewestGallBox from "./newest-gall-box";

type Props = {
  user: UserPayload | null;
  isLogin: boolean;
  gallList: Gall[];
  popularGallData: Gall[];
};

export default function RightItems({
  user,
  isLogin,
  gallList,
  popularGallData,
}: Props) {
  return (
    <div className="lg:basis-1/4 hidden lg:flex flex-col gap-16">
      <LoginBox user={user} isLogin={isLogin} />
      <PopularGallBox popularGallData={popularGallData} />
      <NewestGallBox gallList={gallList} />
    </div>
  );
}
