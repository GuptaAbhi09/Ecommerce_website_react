"use client";
import React, { useEffect, useState } from "react";
import { SortingTabs } from "./SortingTabs";
import { ProductCard } from "./ProductCard";
import { getProductsByCategories } from "../../api/productApi";

interface Product {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  rating: number;
  category: string;
}

interface ProductGridProps {
  selectedCategories: string[];
  priceRange: [number, number]; // [min, max]
}

export function ProductGrid({ selectedCategories, priceRange }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("popularity");

  const categories = ["laptops", "smartphones", "skincare", "fragrances", "groceries"]; // etc

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const cats = selectedCategories.length > 0 ? selectedCategories : ["laptops", "smartphones", "skincare", "fragrances", "groceries"];
        const allProducts = await getProductsByCategories(cats);
        setProducts(allProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategories]);

  const applyFilters = (products: Product[]) => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.category);

      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesCategory && matchesPrice;
    });
  };

  const getSortedProducts = () => {
    let filtered = applyFilters(products);

    switch (sortBy) {
      case "rating":
        return filtered.sort((a, b) => b.rating - a.rating);
      case "price-low":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-high":
        return filtered.sort((a, b) => b.price - a.price);
      case "popularity":
      default:
        return filtered;
    }
  };

  return (
    <section className="flex flex-col flex-1 max-w-[960px] w-full">
      <header className="p-4">
        <h1 className="text-3xl font-bold text-neutral-900">Featured Products</h1>
      </header>

      <SortingTabs activeTab={sortBy} onTabChange={setSortBy} />

      {loading ? (
        <p className="p-4">Loading products...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
          {getSortedProducts().map((product) => (
            <ProductCard
              key={product.id}
              image={product.thumbnail}
              title={product.title}
              description={product.description}
              price={product.price}
              rating={product.rating}
            />
          ))}
        </div>
      )}
    </section>
  );
}
