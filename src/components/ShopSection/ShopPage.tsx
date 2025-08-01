"use client";
import React, { useEffect, useState } from "react";
import { Breadcrumb } from "./Breadcrumb";
import { CategoryFilter } from "./CategoryFilter";
import { ProductGrid } from "./ProductGrid";
import { Pagination } from "./Pagination";
import { getProductsByCategoryAndPage } from "../../api/productApi";

const breadcrumbItems = [
  { label: "Home", isActive: false },
  { label: "Shop", isActive: true },
];

const categories = ["All", "Laptops", "Smartphones", "Accessories"];

export const ShopPage: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProductsByCategoryAndPage(
          selectedCategory,
          currentPage,
          8
        );

        const mapped = data.map((p: any) => ({
          id: p.id,
          title: p.title,
          image: p.thumbnail,
          price: p.price,
          rating: p.rating,
        }));

        setProducts(mapped);
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, currentPage]);

  return (
    <div className="flex flex-col items-start bg-white w-[1280px] max-sm:w-full">
      <div className="flex relative flex-col items-start self-stretch bg-white min-h-[800px]">
        <div className="flex relative flex-col items-start self-stretch">
          <div className="flex relative justify-center items-start self-stretch px-40 py-5 flex-[1_0_0] max-md:px-10 max-md:py-5 max-sm:px-4 max-sm:py-5">
            <div className="flex relative flex-col items-start flex-[1_0_0] max-w-[960px] max-md:max-w-full">
              <Breadcrumb items={breadcrumbItems} />

              <header className="flex relative flex-col items-start self-stretch px-4 pt-5 pb-3 h-[67px]">
                <h1 className="self-stretch text-3xl font-bold leading-9 text-neutral-900">
                  Shop All
                </h1>
              </header>

              <CategoryFilter
                categories={categories}
                onCategoryChange={handleCategoryChange}
              />

              {loading ? (
                <p className="px-4 py-10">Loading products...</p>
              ) : (
                <ProductGrid products={products} />
              )}

              <Pagination
                totalPages={10}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
