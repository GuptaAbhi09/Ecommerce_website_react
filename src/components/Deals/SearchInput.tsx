"use client";
import { IoSearch } from "react-icons/io5";

import React from "react";

interface SearchInputProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search Deals",
  onSearch,
}) => {
  return (
    <div className="w-full max-w-md">
      <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2">
        <IoSearch />
        <input
          type="text"
          placeholder={placeholder}
          onChange={(e) => onSearch?.(e.target.value)}
          className="ml-2 w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-500"
        />
      </div>
    </div>
  );
};
