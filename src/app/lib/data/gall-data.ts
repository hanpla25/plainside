import { createClient } from "@/app/utils/supabase/server";

// --- 타입 ---
import { Gall, PostListData } from "../definitions";
import { redirect } from "next/navigation";

// --- 상수 ---
import {
  POST_LIST_ITEM_PER_PAGE,
  POST_LIST_LIKE_CUT,
} from "@/app/constants/fetch-post-constants";

// --- 유틸 ---
import { maskIpAddress } from "@/app/utils/masking";

export async function fetchGallListData(
  sort?: "popular" | "newest",
  size?: number
): Promise<Gall[]> {
  const supabase = await createClient();

  const query = supabase.from("galls").select("abbr,name");

  if (sort === "newest") query.order("id", { ascending: false });
  if (sort === "popular") query.order("today_post_count", { ascending: false });
  if (size) query.limit(size);

  const { data, error } = await query;

  if (error) {
    console.error(error);

    return [];
  }

  return data ?? [];
}

export async function fetchGallName(abbr: string): Promise<string> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("galls")
    .select("name")
    .eq("abbr", abbr)
    .single();

  if (error) {
    console.error(error);
    redirect("/");
  }

  return data.name;
}

export async function fetchPostListData({
  abbr,
  page = 1,
  isPopular,
  search,
  option,
}: {
  abbr?: string;
  page: number;
  isPopular?: boolean;
  search?: string;
  option?: string;
}): Promise<PostListData> {
  const supabase = await createClient();

  const from = (page - 1) * POST_LIST_ITEM_PER_PAGE;
  const to = from + POST_LIST_ITEM_PER_PAGE - 1;

  const query = supabase
    .from("posts")
    .select(
      "id,title,user_name,abbr,gall_name,view_count,like_count,comment_count,ip_address,created_at,is_login",
      { count: "exact" }
    )
    .range(from, to)
    .order("id", { ascending: false });

  if (abbr) query.eq("abbr", abbr);
  if (isPopular) query.gte("like_count", POST_LIST_LIKE_CUT);
  if (search && option) query.ilike(option, `%${search}%`);

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    return {
      post_list: [],
      count: 0,
      total_page: 0,
    };
  }

  const total_page = count ? Math.ceil(count / POST_LIST_ITEM_PER_PAGE) : 0;

  const maskedData = data.map((item) => ({
    ...item,
    ip_address: maskIpAddress(item.ip_address),
  }));

  return {
    post_list: maskedData,
    count: count ?? 0,
    total_page,
  };
}
