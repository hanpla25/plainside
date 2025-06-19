import { createClient } from "../utils/supabase/server";
import { Gallery } from "./definition";

export async function fetchGalleries(): Promise<Gallery[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("galleries").select("*");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}
