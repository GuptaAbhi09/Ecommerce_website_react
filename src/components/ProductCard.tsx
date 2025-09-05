"use client";
import * as React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { ShoppingCart, Plus, Loader2 } from "lucide-react";

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
  const { addToCart, isInCart, isLoading } = useCart();
  const [isAdding, setIsAdding] = React.useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAdding(true);
    try {
      await addToCart(product);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="w-[180px] max-md:w-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all bg-white group">
      <Link to={`/product/${product.id}`} className="block">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="h-[150px] w-full object-cover"
        />

        <div className="p-4 flex flex-col gap-1">
          <h3
            className="text-base font-semibold truncate"
            title={product.title}
          >
            {product.title}
          </h3>

          <p
            className="text-xs text-gray-600 line-clamp-2"
            title={product.description}
          >
            {product.description}
          </p>

          <p className="text-md font-medium text-indigo-600 mt-2">
            ${product.price}
          </p>

          {product.rating !== undefined && (
            <p className="text-sm text-yellow-500">⭐ {product.rating}/5</p>
          )}
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className="px-4 pb-4">
        <button
          onClick={handleAddToCart}
          disabled={isAdding || isLoading}
          className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
            isInCart(product.id)
              ? "bg-green-100 text-green-700 border border-green-200"
              : "bg-blue-600 text-white hover:bg-blue-700"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isAdding || isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Adding...
            </>
          ) : isInCart(product.id) ? (
            <>
              <ShoppingCart className="h-4 w-4" />
              In Cart
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};
