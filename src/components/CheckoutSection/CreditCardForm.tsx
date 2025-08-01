"use client";

import { FormInput } from "./FormInput";

interface CreditCardFormProps {
  formData: {
    cardNumber: string;
    expirationDate: string;
    cvv: string;
  };
  onChange: (field: string, value: string) => void;
  isVisible: boolean;
}

export const CreditCardForm = ({
  formData,
  onChange,
  isVisible,
}: CreditCardFormProps) => {
  if (!isVisible) return null;

  return (
    <div>
      <div className="flex flex-wrap gap-4 items-end px-4 py-3 max-w-full text-base text-slate-500 w-[480px]">
        <FormInput
          placeholder="Card Number"
          value={formData.cardNumber}
          onChange={(value) => onChange("cardNumber", value)}
        />
      </div>

      <div className="flex flex-wrap gap-4 items-end px-4 py-3 max-w-full text-base text-slate-500 w-[480px]">
        <FormInput
          placeholder="Expiration Date (MM/YY)"
          value={formData.expirationDate}
          onChange={(value) => onChange("expirationDate", value)}
        />
      </div>

      <div className="flex flex-wrap gap-4 items-end px-4 py-3 max-w-full text-base whitespace-nowrap text-slate-500 w-[480px]">
        <FormInput
          placeholder="CVV"
          value={formData.cvv}
          onChange={(value) => onChange("cvv", value)}
        />
      </div>
    </div>
  );
};
