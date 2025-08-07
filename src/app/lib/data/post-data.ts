import { redirect } from "next/navigation";
import { createClient } from "../../utils/supabase/server";

// --- Types ---
import { Post } from "../definitions";

// --- Utils ---
import { maskIpAddress } from "../../utils/masking";


export async function fetchPostData({
  postId,
}: {
  postId: number;
}): Promise<Post> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select(
      "id,user_name,title,content,abbr,gall_name,view_count,like_count,dislike_count,comment_count,ip_address,created_at,is_login"
    )
    .eq("id", postId)
    .single();

  if (error) {
    console.error(error);

    redirect("/");
  }

  const maskedIp = maskIpAddress(data.ip_address);

  return {
    id: data.id,
    user_name: data.user_name,
    title: data.title,
    content: data.content,
    abbr: data.abbr,
    gall_name: data.gall_name,
    view_count: data.view_count,
    like_count: data.like_count,
    dislike_count: data.dislike_count,
    comment_count: data.comment_count,
    created_at: data.created_at,
    is_login: data.is_login,
    ip_address: maskedIp,
  };
}
