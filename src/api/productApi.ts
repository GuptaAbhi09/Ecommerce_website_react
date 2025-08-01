import axios from "axios";

const API_BASE = "https://dummyjson.com";

export const getTopDeals = async () => {
  return await axios.get(`${API_BASE}/products?limit=4`);
};

export const getNewArrivals = async () => {
  return await axios.get(`${API_BASE}/products?skip=4&limit=4`);
};

// New function to fetch all products with optional filters
export const getAllProducts = async () => {
  return await axios.get(`${API_BASE}/products?limit=100`);
};

// New function to fetch products by multiple categories
export const getProductsByCategories = async (categories: string[]) => {
  let allProducts = [];
  for (const category of categories) {
    const res = await axios.get(`${API_BASE}/products/category/${category}`);
    allProducts = allProducts.concat(res.data.products);
  }
  return allProducts;
};

export const getProductsByCategoryAndPage = async (
  category: string,
  page: number,
  limit: number = 8
) => {
  const skip = (page - 1) * limit;
  const url =
    category === "All"
      ? `${API_BASE}/products?limit=${limit}&skip=${skip}`
      : `${API_BASE}/products/category/${category.toLowerCase()}?limit=${limit}&skip=${skip}`;

  const res = await axios.get(url);
  return res.data.products;
};
