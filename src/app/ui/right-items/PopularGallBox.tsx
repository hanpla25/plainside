import { Gall } from "@/app/lib/definitions";
import React from "react";
import PopularGallList from "../popular-gall/PopularGallList";

type Props = {
  popularGallData: Gall[];
};
export default function PopularGallBox({ popularGallData }: Props) {
  return (
    <div className=" space-y-2">
      <h2>인기 갤러리</h2>
      <PopularGallList popularGallData={popularGallData} />
    </div>
  );
}
