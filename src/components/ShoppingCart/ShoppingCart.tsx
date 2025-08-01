import * as React from "react";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";

const ShoppingCart: React.FC<{ cartItems: any[] }> = ({ cartItems }) => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <main className="bg-white min-h-screen px-4 md:px-8 py-6">
      <div className="max-w-5xl mx-auto w-full">
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">
            Shopping Cart
          </h1>
        </header>

        <section className="space-y-4 mb-6">
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </section>

        <CartSummary subtotal={`$${subtotal.toFixed(2)}`} />
      </div>
    </main>
  );
};

export default ShoppingCart;