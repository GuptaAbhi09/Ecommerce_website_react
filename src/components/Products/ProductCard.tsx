"use client";
import * as React from "react";
import { Star, Plus, ShoppingCart, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";

interface Product {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  rating: number;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
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
    <article className="flex relative flex-col gap-3 items-start pb-3 shadow-md p-2 hover:scale-105 transition-transform duration-200 rounded-xl bg-white group">
      <Link to={`/product/${product.id}`} className="w-full">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="relative self-stretch rounded-xl h-[166px] object-cover"
        />

        <div className="flex flex-col items-start self-stretch">
          <h3 className="text-base font-semibold text-neutral-900 line-clamp-1">
            {product.title}
          </h3>
          <p className="text-sm text-slate-500 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between w-full mt-2">
            <span className="text-base font-medium text-black">
              $
              {typeof product.price === "number"
                ? product.price.toFixed(2)
                : "N/A"}
            </span>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="h-4 w-4 fill-yellow-500" />
              <span className="text-sm text-black">
                {product.rating?.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className="w-full px-2">
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
    </article>
  );
}
