"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { BreadcrumbNav } from "./BreadcrumbNav";
import { ShippingForm } from "./ShippingForm";
import { BillingForm } from "./BillingForm";
import { PaymentMethodSelector } from "./PaymentMethodSelector";
import { CreditCardForm } from "./CreditCardForm";
import { OrderSummary } from "./OrderSummary";
import { Loader2, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

interface ShippingData {
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
}

interface BillingData {
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

interface CreditCardData {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
}

export const CheckoutForm = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotals, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [shippingData, setShippingData] = useState<ShippingData>({
    fullName: user?.user_metadata?.name || "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
  });

  const [billingData, setBillingData] = useState<BillingData>({
    fullName: user?.user_metadata?.name || "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [creditCardData, setCreditCardData] = useState<CreditCardData>({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const [sameAsShipping, setSameAsShipping] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"credit" | "paypal">(
    "credit"
  );

  const totals = getCartTotals();

  // Redirect if not authenticated or cart is empty
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
      return;
    }

    if (cartItems.length === 0) {
      navigate("/cart", { replace: true });
      return;
    }
  }, [isAuthenticated, cartItems.length, navigate]);

  const handleShippingChange = (field: string, value: string) => {
    setShippingData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBillingChange = (field: string, value: string) => {
    setBillingData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreditCardChange = (field: string, value: string) => {
    setCreditCardData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    try {
      // Simulate order processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create order data
      const orderData = {
        id: `ORD-${Date.now()}`,
        userId: user?.id,
        userEmail: user?.email,
        items: cartItems,
        shipping: shippingData,
        billing: sameAsShipping ? shippingData : billingData,
        payment: paymentMethod,
        creditCard: paymentMethod === "credit" ? creditCardData : null,
        totals: totals,
        status: "confirmed",
        createdAt: new Date().toISOString(),
      };

      console.log("Order placed:", orderData);

      // Clear cart after successful order
      clearCart();
      setOrderPlaced(true);

      toast.success("Order placed successfully!");

      // Redirect to success page after 3 seconds
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 3000);
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Show order success page
  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. You'll receive a confirmation email
            shortly.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/")}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </button>
            <p className="text-sm text-gray-500">
              Redirecting to home page in a few seconds...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="overflow-hidden w-full bg-white min-h-[800px] max-md:max-w-full">
        <div className="w-full max-md:max-w-full">
          <div className="flex flex-1 justify-center items-start px-40 py-5 size-full max-md:px-5 max-md:max-w-full">
            <div className="flex overflow-hidden flex-col flex-1 shrink items-start w-full basis-0 max-w-[960px] min-w-60 max-md:max-w-full">
              <BreadcrumbNav />

              <header className="flex flex-wrap gap-3 justify-between items-start self-stretch p-4 w-full text-3xl font-bold leading-none whitespace-nowrap text-neutral-900 max-md:max-w-full">
                <h1 className="w-72 min-w-72">Checkout</h1>
              </header>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handlePlaceOrder();
                }}
              >
                <ShippingForm
                  formData={shippingData}
                  onChange={handleShippingChange}
                />

                <BillingForm
                  formData={billingData}
                  sameAsShipping={sameAsShipping}
                  onChange={handleBillingChange}
                  onSameAsShippingChange={setSameAsShipping}
                />

                <PaymentMethodSelector
                  selectedMethod={paymentMethod}
                  onChange={setPaymentMethod}
                />

                <CreditCardForm
                  formData={creditCardData}
                  onChange={handleCreditCardChange}
                  isVisible={paymentMethod === "credit"}
                />

                <OrderSummary
                  items={cartItems}
                  subtotal={totals.subtotal}
                  shipping={totals.shipping}
                  tax={totals.tax}
                  total={totals.total}
                />

                <div className="flex items-start self-stretch px-4 py-3 w-full text-base font-bold text-center text-white max-md:max-w-full">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="flex overflow-hidden flex-1 shrink justify-center items-center px-5 bg-sky-500 rounded-3xl basis-0 max-w-[480px] min-h-12 min-w-[84px] w-[480px] max-md:max-w-full hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        <span className="overflow-hidden self-stretch my-auto">
                          Processing Order...
                        </span>
                      </>
                    ) : (
                      <span className="overflow-hidden self-stretch my-auto w-[89px]">
                        Place Order
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
