import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import { Gallery, Post, UserData, UserPayload } from "./definition";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function fetchGalleries({
  option,
}: {
  option?: "popular" | "latest";
}): Promise<Gallery[]> {
  const supabase = await createClient();

  let query = supabase.from("galleries").select("*");

  if (option === "popular") {
    query = query.order("today_post_count", { ascending: false });
  } else if (option === "latest") {
    query = query.order("id", { ascending: false });
  }

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
    .from("galleries")
    .select("gall_name")
    .eq("abbr", abbr)
    .single();

  if (error) {
    console.error(error);
    redirect("/");
  }

  return data.gall_name;
}

const ITEM_PER_PAGE = 20;
export async function fetchPosts({
  page = 1,
  search,
  option,
  abbr,
  like_count = 0,
}: {
  page?: number;
  search?: string;
  option?: "title" | "nickname";
  abbr?: string;
  like_count?: number;
} = {}): Promise<{ data: Post[]; count: number; totalPages: number }> {
  const supabase = await createClient();

  const from = (page - 1) * ITEM_PER_PAGE;
  const to = from + ITEM_PER_PAGE - 1;

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

  const { data, count, error } = await query;

  const totalPages = Math.ceil(Number(count) / ITEM_PER_PAGE);

  if (error) {
    console.error("Failed to fetch posts:", error);
    return { data: [], count: 0, totalPages: 1 };
  }

  return { data: data ?? [], count: count ?? 0, totalPages: totalPages || 1 };
}

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
  } catch {
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
