import React from "react";
import { ProductCard } from "./ProductCard";
import { Product } from "./ProductCard"; // reuse correct interface

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const firstRowProducts = products.slice(0, 5);
  const secondRowProducts = products.slice(5, 8);

  return (
    <section className="flex relative flex-col gap-3 items-start self-stretch p-4">
      <div className="flex relative gap-3 items-start self-stretch max-md:flex-wrap max-md:justify-center max-sm:flex-col max-sm:items-center">
        {firstRowProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex relative gap-3 items-start self-stretch max-md:flex-wrap max-md:justify-center max-sm:flex-col max-sm:items-center">
        {secondRowProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
