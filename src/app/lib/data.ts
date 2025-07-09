import { cookies } from "next/headers";
import {
  Comment,
  Gall,
  Post,
  UserCommentsData,
  UserData,
  UserPayload,
  UserPostData,
} from "./definitions";
import jwt from "jsonwebtoken";
import { createClient } from "../utils/supabase/server";
import { redirect } from "next/navigation";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function getUserFromToken(): Promise<UserPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as UserPayload;

    return {
      user_id: decoded.user_id,
      user_name: decoded.user_name,
      created_at: decoded.created_at,
    };
  } catch (err) {
    console.warn("JWT decode 실패", err);
    return null;
  }
}

export async function getUserData(user: UserPayload): Promise<UserData | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", user.user_id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function fetchGallList({
  sort,
  limit = 10,
}: {
  sort: string;
  limit?: number;
}): Promise<Gall[]> {
  const supabase = await createClient();

  let query = supabase.from("galleries").select("*").limit(limit);

  if (sort === "newest") {
    query = query.order("id", { ascending: false });
  } else {
    query = query.order("today_post_count", { ascending: false });
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching galleries:", error.message);
    return [];
  }

  return data ?? [];
}

export async function fetchGallName(abbr: string): Promise<string> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("galleries")
    .select("gall_name")
    .eq("abbr", abbr)
    .single();

  if (error) {
    console.error("갤러리 이름 가져오기 에러", error);
    redirect("/");
  }

  return data.gall_name;
}

export async function fetchPostData({
  item_per_page = 10,
  page = 1,
  search,
  option,
  abbr,
  like_count = 0,
  user_id,
}: {
  item_per_page?: number;
  page?: number;
  search?: string;
  option?: "title" | "nickname";
  abbr?: string;
  like_count?: number;
  user_id?: string;
} = {}): Promise<{ data: Post[]; count: number; totalPages: number }> {
  const supabase = await createClient();

  const from = (page - 1) * item_per_page;
  const to = from + item_per_page - 1;

  let query = supabase
    .from("posts")
    .select("*", { count: "exact" })
    .gte("like_count", like_count)
    .order("id", { ascending: false })
    .range(from, to);

  if (abbr) {
    query = query.eq("abbr", abbr);
  }

  if (search && option) {
    query = query.ilike(option, `%${search}%`);
  }

  if (user_id) {
    query = query.eq("user_id", user_id);
  }

  const { data, count, error } = await query;

  const totalPages = Math.ceil(Number(count) / item_per_page);

  if (error) {
    console.error("패치 포스트 에러:", error);
    return { data: [], count: 0, totalPages: 1 };
  }

  return { data: data ?? [], count: count ?? 0, totalPages: totalPages || 1 };
}

export async function fetchCommentsData({
  item_per_page = 10,
  page = 1,
  abbr,
  user_id,
}: {
  item_per_page?: number;
  page?: number;
  abbr?: string;
  user_id?: string;
} = {}): Promise<{ data: Comment[]; count: number; totalPages: number }> {
  const supabase = await createClient();

  const from = (page - 1) * item_per_page;
  const to = from + item_per_page - 1;

  let query = supabase
    .from("comments")
    .select("*", { count: "exact" })
    .order("id", { ascending: false })
    .range(from, to);

  if (abbr) {
    query = query.eq("abbr", abbr);
  }

  if (user_id) {
    query = query.eq("user_id", user_id);
  }

  const { data, count, error } = await query;

  const totalPages = Math.ceil(Number(count) / item_per_page);

  if (error) {
    console.error("패치 포스트 에러:", error);
    return { data: [], count: 0, totalPages: 1 };
  }
  return { data: data ?? [], count: count ?? 0, totalPages: totalPages || 1 };
}

export async function getProfileData({
  user,
  currentPage,
  item_per_page = 5,
}: {
  user: UserPayload;
  currentPage?: number;
  item_per_page?: number;
}) {
  let posts: UserPostData = { data: [], count: 0, totalPages: 1 };
  let comments: UserCommentsData = { data: [], count: 0, totalPages: 1 };

  try {
    const [userPosts, userComments] = await Promise.all([
      fetchPostData({
        item_per_page: item_per_page,
        user_id: user.user_id,
        page: Number(currentPage) || 1,
      }),
      fetchCommentsData({
        item_per_page: item_per_page,
        user_id: user.user_id,
        page: Number(currentPage) || 1,
      }),
    ]);
    posts = userPosts;
    comments = userComments;
  } catch (error) {
    console.error(error);
  }

  return { posts, comments };
}
