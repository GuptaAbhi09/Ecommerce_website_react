import * as React from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  imageUrl: string;
  title: string;
  price: string;
  rating?: number;
  popularity?: number;
  imageAspectRatio?: string;
  imageWidth?: string;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    id,
    imageUrl,
    title,
    price,
    rating,
    popularity,
    imageAspectRatio = "aspect-[1.77]",
    imageWidth = "w-[161px]",
  } = product;

  return (
    <Link to={`/product/${id}`}>
      <article className="flex-1 shrink rounded-lg shadow-md p-4 basis-0 min-w-40 hover:scale-105 transition-transform duration-200 bg-white">
        <img
          src={imageUrl}
          alt={title}
          className={`object-contain rounded-lg ${imageAspectRatio} ${imageWidth}`}
        />
        <div className="mt-4 w-full space-y-1">
          <h3 className="text-base font-medium text-neutral-900">{title}</h3>
          <p className="text-sm text-slate-500">{price}</p>

          {rating !== undefined && (
            <div className="flex items-center gap-1 text-yellow-500 text-sm">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={i < Math.round(rating) ? "currentColor" : "none"}
                  stroke="currentColor"
                />
              ))}
              <span className="text-neutral-700 ml-1">({rating.toFixed(1)})</span>
            </div>
          )}

          {popularity !== undefined && (
            <p className="text-xs text-gray-400">Popularity: {popularity}</p>
          )}
        </div>
      </article>
    </Link>
  );
};
