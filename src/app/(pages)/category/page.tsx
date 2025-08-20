import { Suspense } from "react";
import Link from "next/link";

// --- UI ---
import HeaderText from "@/app/ui/common/HeaderText";
import CategoryList from "@/app/ui/category/CaregoryList";

export default function CategoryPage() {
  return (
    <>
      <div className="lg:mx-0 mx-2 flex items-center justify-between mb-1">
        <HeaderText text="전체 갤러리" />
        <Link
          href={"/create"}
          className="text-white border rounded-2xl text-xs px-2 py-1 bg-neutral-600"
        >
          갤러리 생성
        </Link>
      </div>
      <Suspense fallback={null}>
        <CategoryList />
      </Suspense>
    </>
  );
}
