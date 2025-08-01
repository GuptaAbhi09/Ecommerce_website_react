import React from "react";

interface ProductCardProps {
  image: string;
  altText: string;
  title: string;
  originalPrice: string;
  discountedPrice: string;
  discountPercentage: string;
  rating: number;  // ⭐ added
  price: number;   // 💰 actual price if needed
}

export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  altText,
  title,
  originalPrice,
  discountedPrice,
  discountPercentage,
  rating,
  price,
}) => {
  return (
    <article className="flex flex-col gap-3 items-start p-3 shadow-md w-55 max-md:min-w-40 max-md:w-[calc(50%_-_6px)] max-sm:w-full max-sm:max-w-[280px]">
      <img
        src={image}
        alt={altText}
        className="self-stretch h-44 rounded-xl max-sm:h-[200px] object-cover"
      />
      <div className="flex flex-col items-start self-stretch">
        <h3 className="self-stretch text-base font-medium leading-6 text-neutral-900">
          {title}
        </h3>

        <p className="text-sm leading-5 text-gray-500">
          Original Price: {originalPrice}
        </p>

        <p className="text-sm leading-5 text-green-600">
          Discounted Price: {discountedPrice}
        </p>

        <p className="text-sm leading-5 text-red-500">
          {discountPercentage}
        </p>

        <p className="text-sm text-yellow-600">
          ⭐ Rating: {rating}/5
        </p>
      </div>
    </article>
  );
};
