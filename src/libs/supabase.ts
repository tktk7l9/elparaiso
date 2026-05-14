import { createClient } from "@supabase/supabase-js";

export const client = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "placeholder_anon_key"
);
