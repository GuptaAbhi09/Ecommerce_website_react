"use client";

import React, { useEffect, useState } from "react";
import { SearchInput } from "./SearchInput";
import { ProductCard } from "./ProductCard";
import { ActionButtons } from "./ActionButtons";
import { getAllProducts } from "../../api/productApi";

const categoryFilters = ["Smartphones", "Laptops", "Fragrances", "Skincare"];
const discountFilters = ["10% off", "20% off", "25% off", "30% off"];

export default function DealsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const handleAddToCart = () => {
    console.log("Add to cart clicked");
  };

  const handleViewDetails = () => {
    console.log("View details clicked");
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      searchTerm === "" ||
      product.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilters.every(
        (cat) => !activeFilters.includes(cat) || product.category.toLowerCase().includes(cat.toLowerCase())
      );

    const matchesDiscount =
      discountFilters.every(
        (discount) => {
          if (!activeFilters.includes(discount)) return true;
          const discountValue = parseInt(discount.replace("% off", ""));
          const actualDiscount = Math.round(
            ((product.price - (product.discountedPrice || product.price * (1 - product.discountPercentage / 100))) /
              product.price) *
              100
          );
          return actualDiscount >= discountValue;
        }
      );

    return matchesSearch && matchesCategory && matchesDiscount;
  });

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap"
      />
      <main className="flex flex-col items-start bg-white w-full max-w-screen-xl mx-auto">
        <div className="flex flex-col items-start self-stretch bg-white min-h-[800px]">
          <div className="flex flex-col items-start self-stretch">
            <div className="flex justify-center items-start self-stretch px-6 py-5 md:px-10">
              <div className="flex flex-col items-start flex-1 w-full max-w-6xl">
                {/* Header */}
                <header className="flex flex-wrap gap-y-3 justify-between items-center self-stretch p-4">
                  <h1 className="text-3xl font-bold text-neutral-900">Deals</h1>
                </header>

                {/* Search */}
                <section className="self-stretch px-4 py-3">
                  <SearchInput placeholder="Search Deals" onSearch={handleSearch} />
                </section>

                {/* Product Grid */}
                <section className="p-4">
                  {loading ? (
                    <p className="text-gray-500">Loading products...</p>
                  ) : filteredProducts.length === 0 ? (
                    <p className="text-gray-500">No products match your filters.</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  )}
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
