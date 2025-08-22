// --- 데이터 ---
import { fetchGallName } from "@/app/lib/data/gall-data";
import { getUserToken } from "@/app/lib/data/user-data";

// --- UI ---
import WriteForm from "@/app/ui/write/WriteForm";

type Params = Promise<{ abbr: string }>;

export default async function WritePage(props: { params: Params }) {
  const params = await props.params;
  const abbr = params.abbr;
  const gallNamePromise = fetchGallName(abbr);
  const userTokenPromise = getUserToken();

  const [gallName, userToken] = await Promise.all([
    gallNamePromise,
    userTokenPromise,
  ]);

  const isLogin = userToken ? true : false;
  const userName = userToken ? userToken.user_name : "ㅇㅇ";

  return (
    <>
      <WriteForm
        abbr={abbr}
        gallName={gallName}
        isLogin={isLogin}
        userName={userName}
      />
    </>
  );
}
