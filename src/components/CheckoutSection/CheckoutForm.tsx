"use client";

import { useState } from "react";
import { BreadcrumbNav } from "./BreadcrumbNav";
import { ShippingForm } from "./ShippingForm";
import { BillingForm } from "./BillingForm";
import { PaymentMethodSelector } from "./PaymentMethodSelector";
import { CreditCardForm } from "./CreditCardForm";
import { OrderSummary } from "./OrderSummary";

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
  const [shippingData, setShippingData] = useState<ShippingData>({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
  });

  const [billingData, setBillingData] = useState<BillingData>({
    fullName: "",
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
    "credit",
  );

  const orderItems = [
    {
      id: "1",
      name: "Wireless Headphones",
      quantity: 1,
      image:
        "https://api.builder.io/api/v1/image/assets/7cf3537fa35d4fc79e00032bb1e43a7a/e6444b4d2f7917983a6a8cd822c16a58be0b0d60?placeholderIfAbsent=true",
    },
    {
      id: "2",
      name: "Portable Bluetooth Speaker",
      quantity: 2,
      image:
        "https://api.builder.io/api/v1/image/assets/7cf3537fa35d4fc79e00032bb1e43a7a/c13a0739cb7935e4746e9a7670463b5067c38463?placeholderIfAbsent=true",
    },
  ];

  const handleShippingChange = (field: string, value: string) => {
    setShippingData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBillingChange = (field: string, value: string) => {
    setBillingData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreditCardChange = (field: string, value: string) => {
    setCreditCardData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = () => {
    console.log("Order placed:", {
      shipping: shippingData,
      billing: sameAsShipping ? shippingData : billingData,
      payment: paymentMethod,
      creditCard: paymentMethod === "credit" ? creditCardData : null,
    });
  };

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
                  items={orderItems}
                  subtotal={199.98}
                  shipping={5.0}
                  tax={15.0}
                  total={219.98}
                />

                <div className="flex items-start self-stretch px-4 py-3 w-full text-base font-bold text-center text-white max-md:max-w-full">
                  <button
                    type="submit"
                    className="flex overflow-hidden flex-1 shrink justify-center items-center px-5 bg-sky-500 rounded-3xl basis-0 max-w-[480px] min-h-12 min-w-[84px] w-[480px] max-md:max-w-full hover:bg-sky-600 transition-colors"
                  >
                    <span className="overflow-hidden self-stretch my-auto w-[89px]">
                      Place Order
                    </span>
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
