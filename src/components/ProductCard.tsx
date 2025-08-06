"use client";
import * as React from "react";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  price: string;
  rating?: number;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`}>
      <div
      className="w-[180px] max-md:w-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all bg-white"
      aria-label={`Product card for ${product.title}`}
    >
      <img
        src={product.imageUrl}
        alt={product.title}
        className="h-[150px] w-full object-cover"
      />

      <div className="p-4 flex flex-col gap-1">
        <h3 className="text-base font-semibold truncate" title={product.title}>
          {product.title}
        </h3>

        <p className="text-xs text-gray-600 line-clamp-2" title={product.description}>
          {product.description}
        </p>

        <p className="text-md font-medium text-indigo-600 mt-2">
          ${product.price}
        </p>

        {product.rating !== undefined && (
          <p className="text-sm text-yellow-500">⭐ {product.rating}/5</p>
        )}
      </div>
    </div>
    </Link>
  );
};
