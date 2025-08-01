"use client";
import React from "react";
import { FilterSection } from "./FilterSection";
import { CheckboxFilter } from "./CheckboxFilter";
import { PriceRangeSlider } from "./PriceRangeSlider";

interface ProductFiltersProps {
  filters: {
    categories: string[];
    brands: string[];
    maxPrice: number;
  };
  onChange: (filters: ProductFiltersProps["filters"]) => void;
}

const categoryOptions = [
  { id: "smartphones", label: "Smartphones" },
  { id: "laptops", label: "Laptops" },
  { id: "fragrances", label: "Fragrances" },
  { id: "skincare", label: "Skincare" },
  { id: "groceries", label: "Groceries" },
];



export function ProductFilters({ filters, onChange }: ProductFiltersProps) {
  const updateCategory = (id: string, checked: boolean) => {
    const categories = checked
      ? [...filters.categories, id]
      : filters.categories.filter((cat) => cat !== id);
    onChange({ ...filters, categories });
  };

  const updateBrand = (id: string, checked: boolean) => {
    const brands = checked
      ? [...filters.brands, id]
      : filters.brands.filter((b) => b !== id);
    onChange({ ...filters, brands });
  };

  const updatePrice = (value: number) => {
    onChange({ ...filters, maxPrice: value });
  };

  return (
    <aside className="w-full md:w-1/4 px-4 py-4 border-r border-zinc-200">
      <h1 className="text-xl font-bold text-neutral-900 mb-4">Filters</h1>

      <FilterSection title="Category">
        {categoryOptions.map((option) => (
          <CheckboxFilter
            key={option.id}
            id={option.id}
            label={option.label}
            checked={filters.categories.includes(option.id)}
            onChange={updateCategory}
          />
        ))}
      </FilterSection>

      <FilterSection title="Price Range">
        <PriceRangeSlider value={filters.maxPrice} onChange={updatePrice} />
      </FilterSection>

      
    </aside>
  );
}
