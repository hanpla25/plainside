import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";

export async function fetchGalleryName(abbr: string): Promise<string> {
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
