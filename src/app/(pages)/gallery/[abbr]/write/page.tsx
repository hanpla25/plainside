import { fetchGallName, getUserFromToken } from "@/app/lib/data/data";
import HeaderText from "@/app/ui/common/HeaderText";
import WriteForm from "@/app/ui/write/WriteForm";

type Params = Promise<{ abbr: string }>;

export default async function WritePage(props: { params: Params }) {
  const user = await getUserFromToken();
  const userName = user ? user.user_name : "ㅇㅇ";
  const params = await props.params;
  const abbr = params.abbr;
  const gallName = await fetchGallName(abbr);

  const userId = user ? user.user_id : null;

  const isLogin = user ? true : false;

  return (
    <>
      <HeaderText label={"글쓰기"} href={"#"} />
      <WriteForm
        abbr={abbr}
        gallName={gallName}
        userName={userName}
        userId={userId}
        isLogin={isLogin}
      />
    </>
  );
}
