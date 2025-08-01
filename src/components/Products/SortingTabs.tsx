"use client";
import * as React from "react";

interface SortingTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function SortingTabs({ activeTab, onTabChange }: SortingTabsProps) {
  const tabs = [
    { id: "popularity", label: "Popularity" },
    { id: "rating", label: "Customer Rating" },
    { id: "price-low", label: "Price (Low to High)" },
    { id: "price-high", label: "Price (High to Low)" },
  ];

  return (
    <div className="flex flex-wrap gap-4 border-b border-zinc-200 px-4 py-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`text-sm font-semibold pb-2 border-b-2 transition-all duration-200 ${
            activeTab === tab.id
              ? "text-neutral-900 border-neutral-900"
              : "text-slate-500 border-transparent"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
