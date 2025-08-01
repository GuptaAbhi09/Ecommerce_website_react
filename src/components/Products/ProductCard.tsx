"use client";
import * as React from "react";
import { Star } from "lucide-react";

interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  price: number;
  rating: number;
}

export function ProductCard({
  image,
  title,
  description,
  price,
  rating,
}: ProductCardProps) {
  return (
    <article className="flex relative flex-col gap-3 items-start pb-3 shadow-md p-2 hover:scale-105 transition-transform duration-200 rounded-xl bg-white">
      <img
        src={image}
        alt={title}
        className="relative self-stretch rounded-xl h-[166px] object-cover"
      />

      <div className="flex flex-col items-start self-stretch">
        <h3 className="text-base font-semibold text-neutral-900 line-clamp-1">{title}</h3>
        <p className="text-sm text-slate-500 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between w-full mt-2">
          <span className="text-base font-medium text-black">${typeof price === 'number' ? price.toFixed(2) : 'Price not available'}
</span>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="h-4 w-4 fill-yellow-500" />
            <span className="text-sm text-black">{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
