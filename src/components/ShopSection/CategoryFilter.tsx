"use client";
import React, { useState } from "react";

interface CategoryFilterProps {
  categories: string[];
  onCategoryChange?: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  onCategoryChange,
}) => {
  const [activeCategory, setActiveCategory] = useState(categories[0] || "All");

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    onCategoryChange?.(category);
  };

  return (
    <div className="flex relative gap-3 items-start self-stretch p-3 max-sm:flex-wrap">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className="flex relative gap-2 justify-center items-center px-4 py-0 h-8 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
          aria-pressed={activeCategory === category}
        >
          <span className="flex relative flex-col items-start flex-[1_0_0]">
            <span className="self-stretch text-sm leading-5 text-neutral-900">
              {category}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
};
