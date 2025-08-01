"use client";
import React, { useState } from "react";
import { ProductFilters } from "./ProductFilters";
import { ProductGrid } from "./ProductGrid";

export default function ProductCatalog() {
  const [filters, setFilters] = useState({
    categories: [] as string[],
    brands: [] as string[],
    maxPrice: 100,
  });

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-white">
      <ProductFilters filters={filters} onChange={handleFilterChange} />
      <ProductGrid
        selectedCategories={filters.categories}
        priceRange={[0, filters.maxPrice]}
      />
    </div>
  );
}
