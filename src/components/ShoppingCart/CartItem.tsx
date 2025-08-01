import * as React from "react";

interface CartItemProps {
  image: string;
  name: string;
  quantity: number;
  price: string;
}

export const CartItem: React.FC<CartItemProps> = ({
  image,
  name,
  quantity,
  price,
}) => {
  return (
    <article className="flex items-center justify-between bg-white rounded-lg shadow-sm p-4 w-full">
      <div className="flex gap-4 items-center">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-lg object-contain"
        />
        <div>
          <h3 className="text-base font-medium text-neutral-900">{name}</h3>
          <p className="text-sm text-gray-500">Quantity: {quantity}</p>
        </div>
      </div>
      <div className="text-base font-medium text-neutral-900">${price}</div>
    </article>
  );
};
