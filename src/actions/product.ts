import { supabase } from "../supabase/client";

export const getProducts = async () => {
  const { data: products, error } = await supabase
    .from("products")
    .select('*, variants(*)')
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

    return products;
};

export const getFilteredProducts = async ({page = 1, brands = []}) => {
  
}