import * as React from "react";
import { ProductCard } from "./ProductCard";

interface Product {
  id: string;
  imageUrl: string;
  title: string;
  price: string;
  imageAspectRatio?: string;
  imageWidth?: string;
}

interface ProductGridProps {
  title: string;
  products: Product[];
  containerClassName?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  title,
  products,
  containerClassName = "flex flex-wrap gap-3 p-4 min-w-60 max-md:max-w-full",
}) => {
  return (
    <section>
      <header className="px-4 pt-5 pb-3 w-full text-2xl font-bold leading-none min-h-[60px] text-neutral-900 max-md:max-w-full">
        <h2 className="max-md:max-w-full">{title}</h2>
      </header>
      <div className="flex items-start w-full max-md:max-w-full">
        <div className={containerClassName}>
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} />

          ))}
        </div>
      </div>
    </section>
  );
};
