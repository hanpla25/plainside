import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import { Gallery, Post } from "./definition";

export async function fetchGalleries(): Promise<Gallery[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("galleries").select("*");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
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

export async function fetchRealtimePosts(): Promise<Post[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .gte("like_count", 10)
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}
