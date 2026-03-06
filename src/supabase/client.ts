import { createClient } from "@supabase/supabase-js";
import type { Database } from "./supabase";

const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);