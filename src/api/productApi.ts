import { supabase } from "../utilsHelper/supabaseClient";


export const getTopDeals = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .limit(4);
  if (error) throw error;
  return data;
};

export const getNewArrivals = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .range(4, 7); // skip 4, get 4
  if (error) throw error;
  return data;
};

export const getAllProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*");
  if (error) throw error;
  return data;
};

export const getProductsByCategories = async (categories: string[]) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .in("category", categories);
  if (error) throw error;
  return data;
};

export const getProductsByCategoryAndPage = async (
  category: string,
  page: number,
  limit: number = 8
) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase.from("products").select("*").range(from, to);

  if (category !== "All") {
    query = query.eq("category", category);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
};
