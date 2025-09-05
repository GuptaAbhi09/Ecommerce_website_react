import * as React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ShoppingCart, CreditCard, Truck } from "lucide-react";

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  shipping,
  tax,
  total,
  itemCount,
}) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
        <p className="text-sm text-gray-500 mt-1">
          {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="p-6 space-y-4">
        {/* Pricing Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium">
              {shipping === 0 ? (
                <span className="text-green-600">FREE</span>
              ) : (
                `$${shipping.toFixed(2)}`
              )}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>

          <div className="border-t border-gray-200 pt-3">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Shipping Info */}
        {shipping === 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-green-800">
              <Truck className="h-4 w-4" />
              <span className="text-sm font-medium">Free Shipping!</span>
            </div>
            <p className="text-xs text-green-700 mt-1">
              You qualify for free shipping on orders over $100
            </p>
          </div>
        )}

        {/* Checkout Button */}
        <div className="space-y-3">
          {isAuthenticated ? (
            <Link
              to="/checkout"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <CreditCard className="h-5 w-5" />
              Proceed to Checkout
            </Link>
          ) : (
            <div className="space-y-2">
              <Link
                to="/login"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                <CreditCard className="h-5 w-5" />
                Sign In to Checkout
              </Link>
              <p className="text-xs text-gray-500 text-center">
                You need to be signed in to complete your purchase
              </p>
            </div>
          )}
        </div>

        {/* Security Badge */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            </div>
            <span>Secure checkout with 256-bit SSL encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};
