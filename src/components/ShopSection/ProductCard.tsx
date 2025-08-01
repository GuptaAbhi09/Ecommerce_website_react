import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  rating: number;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`}>
      <article className="flex relative flex-col gap-3 items-start pb-3 shadow-md p-2 hover:scale-105 transition-transform duration-200 rounded-xl bg-white w-[240px]">
        <img
          src={product.image || "/fallback-image.png"}
          alt={product.title || "Product Image"}
          className="w-full h-40 object-cover rounded-xl"
          loading="lazy"
        />

        <div className="flex flex-col items-start self-stretch">
          <h3 className="text-base font-semibold text-neutral-900 line-clamp-1">
            {product.title}
          </h3>

          <p className="text-sm text-slate-500 line-clamp-2">{product.description}</p>

          <div className="flex items-center justify-between w-full mt-2">
            <span className="text-base font-medium text-black">
              ${typeof product.price === 'number' ? product.price.toFixed(2) : 'N/A'}
            </span>

            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="h-4 w-4 fill-yellow-500" />
              <span className="text-sm text-black">
                {typeof product.rating === 'number' ? product.rating.toFixed(1) : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};
