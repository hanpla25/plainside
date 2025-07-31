import { GallMeta, UserPayload } from "@/app/lib/definitions";
import React from "react";
import Profile from "./Profile-box";
import NewestGallList from "./gall-list/NewestGallList";
import PopularGallList from "./gall-list/PopularGallList";

type Props = {
  user: UserPayload | null;
  newestGallMeta: GallMeta[];
  popularGallMeta: GallMeta[];
};

export default function RightItems({
  user,
  newestGallMeta,
  popularGallMeta,
}: Props) {
  return (
    <>
      <Profile user={user} />
      <PopularGallList popularGallMeta={popularGallMeta} />
      <NewestGallList newestGallMeta={newestGallMeta} />
    </>
  );
}
