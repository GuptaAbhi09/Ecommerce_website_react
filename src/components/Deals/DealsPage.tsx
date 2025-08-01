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
        const response = await getAllProducts();
        setProducts(response.data.products); // if axios response
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
            ((product.price - product.discountedPrice || product.price * (1 - product.discountPercentage / 100)) /
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
      <main className="flex flex-col items-start bg-white w-[1280px] max-md:w-full max-md:max-w-screen-lg max-sm:w-full">
        <div className="flex flex-col items-start self-stretch bg-white min-h-[800px]">
          <div className="flex flex-col items-start self-stretch">
            <div className="flex justify-center items-start self-stretch px-40 py-5 flex-[1_0_0] max-md:px-10 max-md:py-5 max-sm:px-5 max-sm:py-4">
              <div className="flex flex-col items-start flex-[1_0_0] max-w-[960px] max-md:max-w-full">
                {/* Header */}
                <header className="flex flex-wrap gap-y-3 justify-between content-start items-start self-stretch p-4 max-sm:p-3">
                  <div className="flex flex-col items-start w-72 min-w-72">
                    <h1 className="self-stretch text-3xl font-bold leading-10 text-neutral-900 max-sm:text-3xl max-sm:leading-9">
                      Deals
                    </h1>
                  </div>
                </header>

                {/* Search */}
                <section className="flex flex-col items-start self-stretch px-4 py-3 max-sm:px-3 max-sm:py-2">
                  <SearchInput placeholder="Search Deals" onSearch={handleSearch} />
                </section>

            

                {/* Product Grid */}
                <section className="flex flex-col gap-3 items-start self-stretch p-4 max-sm:p-3">
                  {loading ? (
                    <p className="text-gray-500">Loading products...</p>
                  ) : filteredProducts.length === 0 ? (
                    <p className="text-gray-500">No products match your filters.</p>
                  ) : (
                    <div className="flex flex-wrap gap-3 justify-start w-full">
                      {filteredProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          image={product.thumbnail}
                          altText={product.title}
                          title={product.title}
                          originalPrice={`$${product.price}`}
                          discountedPrice={`$${Math.round(
                            product.price * (1 - product.discountPercentage / 100)
                          )}`}
                          discountPercentage={`${product.discountPercentage}% off`}
                          rating={product.rating}               // ✅ Add this
                          price={product.price}                 // ✅ Add this if you need to show it separately
                        />

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
