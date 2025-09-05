import * as React from "react";
import { useCart } from "../../contexts/CartContext";
import { Plus, Minus, Trash2, X } from "lucide-react";

interface CartItemProps {
  id: string | number;
  image: string;
  name: string;
  quantity: number;
  price: number;
  description?: string;
}

export const CartItem: React.FC<CartItemProps> = ({
  id,
  image,
  name,
  quantity,
  price,
  description,
}) => {
  const { updateQuantity, removeFromCart } = useCart();
  const [isUpdating, setIsUpdating] = React.useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity <= 0) {
      await removeFromCart(id);
      return;
    }

    setIsUpdating(true);
    try {
      await updateQuantity(id, newQuantity);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    await removeFromCart(id);
  };

  const totalPrice = (price * quantity).toFixed(2);

  return (
    <article className="flex items-center gap-4 p-6 hover:bg-gray-50 transition-colors">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <img
          src={image}
          alt={name}
          className="w-20 h-20 rounded-lg object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-medium text-gray-900 truncate">{name}</h3>
        {description && (
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {description}
          </p>
        )}
        <p className="text-sm text-gray-600 mt-1">${price.toFixed(2)} each</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-3">
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={isUpdating || quantity <= 1}
            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center font-medium">
            {quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={isUpdating}
            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Price and Remove */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-lg font-semibold text-gray-900">${totalPrice}</p>
          {quantity > 1 && (
            <p className="text-sm text-gray-500">
              {quantity} × ${price.toFixed(2)}
            </p>
          )}
        </div>

        <button
          onClick={handleRemove}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Remove from cart"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </article>
  );
};
