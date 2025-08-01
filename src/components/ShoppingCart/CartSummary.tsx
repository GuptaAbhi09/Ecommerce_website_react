import * as React from "react";
import { Link } from "react-router-dom";

interface CartSummaryProps {
  subtotal: string;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ subtotal }) => {
  return (
    <section className="bg-gray-50 rounded-lg p-4 space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-neutral-900">Subtotal</h2>
        <p className="text-sm text-gray-500">
          Estimated total. Shipping and taxes calculated at checkout.
        </p>
      </div>

      <div className="flex justify-between items-center text-base font-medium">
        <span>Subtotal</span>
        <span>{subtotal}</span>
      </div>

      <button className="w-full bg-orange-500 text-white text-sm font-semibold py-2 rounded-xl hover:bg-orange-600 transition-colors">
        <Link to="/checkout">Proceed to Checkout</Link>
      </button>
    </section>
  );
};
