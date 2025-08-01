"use client";

import React from "react";

interface ActionButtonsProps {
  onAddToCart?: () => void;
  onViewDetails?: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onAddToCart,
  onViewDetails,
}) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center items-center w-full max-w-md mx-auto">
      <button
        onClick={onAddToCart}
        className="w-full md:w-[220px] h-10 px-4 rounded-3xl bg-slate-300 text-sm font-semibold text-neutral-900 hover:bg-slate-400 transition"
      >
        Add to Cart
      </button>
      <button
        onClick={onViewDetails}
        className="w-full md:w-[220px] h-10 px-4 rounded-3xl bg-gray-100 text-sm font-semibold text-neutral-900 hover:bg-gray-200 transition"
      >
        View Details
      </button>
    </div>
  );
};
