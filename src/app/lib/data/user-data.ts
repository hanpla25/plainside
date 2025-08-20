"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { createClient } from "@/app/utils/supabase/server";

// --- 타입 ---
import { UserData, UserPayload } from "../definitions";

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error("JWT_SECRET 환경 변수 없음");
}
const JWT_SECRET: string = jwtSecret;

export async function getUserToken(): Promise<UserPayload | null> {
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
    return null;
  }
}

export async function fetchUserData(
  user?: UserPayload | null
): Promise<UserData | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select("name,write_count,comment_count,created_at")
    .eq("id", user?.user_id)
    .single();

  if (error) {
    console.error(error);
  }

  return data ?? null;
}

export async function fetchCurrentUserData() {
  const user = await getUserToken();
  if (!user) return null;

  return await fetchUserData(user);
}
