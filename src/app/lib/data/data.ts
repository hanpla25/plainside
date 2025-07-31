import jwt from "jsonwebtoken";
import {
  Comment,
  Gall,
  Post,
  PostListData,
  UserData,
  UserPayload,
} from "../definitions";
import { cookies } from "next/headers";
import { createClient } from "../../utils/supabase/server";
import { redirect } from "next/navigation";

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error("JWT_SECRET 환경 변수 없음");
}
const JWT_SECRET: string = jwtSecret;

export async function getUserFromToken(): Promise<UserPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (
      typeof decoded === "object" &&
      "user_id" in decoded &&
      "user_name" in decoded
    ) {
      const { user_id, user_name, created_at } = decoded as UserPayload;
      return { user_id, user_name, created_at };
    }

    return null;
  } catch (err) {
    console.warn("JWT decode 실패", err);
    cookieStore.delete("token");
    return null;
  }
}

export async function fetchUserData(user: UserPayload): Promise<UserData> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select("id,name,write_count,comment_count,created_at")
    .eq("id", user.user_id)
    .single();

  if (error) {
    console.error(error);
    redirect("/");
  }

  return data;
}

export async function fetchGallListData({
  sort = "name",
  size,
}: {
  sort?: "name" | "newest" | "popular";
  size?: number;
} = {}): Promise<Gall[]> {
  const supabase = await createClient();

  const sortColumns = {
    name: "name",
    newest: "id",
    popular: "today_post_count",
  } as const;

  const ascending = sort === "name";

  const query = supabase
    .from("galleries")
    .select("*")
    .order(sortColumns[sort], { ascending });

  if (size) {
    query.limit(size);
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
    .select("name")
    .eq("abbr", abbr)
    .single();

  if (error) {
    console.error("갤러리 이름 가져오기 에러", error);
    redirect("/");
  }

  return data.name;
}

export async function fetchPostListData({
  item_per_page = 10,
  page = 1,
  abbr,
  search,
  option,
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
} = {}): Promise<PostListData> {
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
    return { postList: [], count: 0, totalPages: 1 };
  }

  return {
    postList: data ?? [],
    count: count ?? 0,
    totalPages: totalPages || 1,
  };
}

export async function fetchPostData(
  post_id: number,
  like_count?: number
): Promise<Post | null> {
  const supabase = await createClient();

  let query = supabase.from("posts").select("*").eq("id", post_id);

  if (like_count !== undefined) {
    query = query.gte("like_count", like_count);
  }

  const { data, error } = await query.single();

  if (error) {
    console.error("게시글 데이터를 불러오는 중 오류 발생:", error.message);
    return null;
  }

  await supabase.rpc("increment_post_views", { post_id: post_id });

  return data;
}

export async function fetchCommentListData(
  postId: number
): Promise<Comment[] | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("comments")
    .select(
      "id,post_id,user_name,content,ip_address,created_at,first_comment_id,user_id"
    )
    .eq("post_id", postId);

  if (error || !data) {
    console.error(error);
    return null;
  }

  const maskedData = data.map((comment) => ({
    ...comment,
    ip_address: comment.ip_address.split(".").slice(0, 2).join("."),
  }));

  return maskedData;
}
