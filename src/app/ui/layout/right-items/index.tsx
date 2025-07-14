import React from "react";
import LoginBox from "./login-box";
import LargePopularGall from "./LargePopularGall";
import { GallMeta, UserPayload } from "@/app/lib/definitions";
import LargeNewestGall from "./LagreNewestGall";

type Props = {
  user: UserPayload | null;
  popularGallData: GallMeta[];
  newestGallData: GallMeta[];
};

export default function RightItems({
  user,
  popularGallData,
  newestGallData,
}: Props) {
  return (
    <>
      <LoginBox user={user} />
      <LargeNewestGall newestGallData={newestGallData} />
      <LargePopularGall popularGallData={popularGallData} />
    </>
  );
}
