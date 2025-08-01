"use client";

import { FormInput } from "./FormInput";

interface BillingFormProps {
  formData: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  sameAsShipping: boolean;
  onChange: (field: string, value: string) => void;
  onSameAsShippingChange: (checked: boolean) => void;
}

export const BillingForm = ({
  formData,
  sameAsShipping,
  onChange,
  onSameAsShippingChange,
}: BillingFormProps) => {
  return (
    <section>
      <h2 className="self-stretch px-4 pt-4 pb-2 w-full text-lg font-bold leading-none min-h-[47px] text-neutral-900 max-md:max-w-full">
        Billing Information
      </h2>

      <div className="self-stretch px-4 w-full text-base text-neutral-900 max-md:max-w-full">
        <label className="flex flex-wrap flex-1 gap-3 items-start py-3 size-full max-md:max-w-full cursor-pointer">
          <input
            type="checkbox"
            checked={sameAsShipping}
            onChange={(e) => onSameAsShippingChange(e.target.checked)}
            className="shrink-0 w-5 h-5 rounded border-2 border-solid border-zinc-200"
          />
          <span className="w-[229px]">Same as shipping information</span>
        </label>
      </div>

      {!sameAsShipping && (
        <>
          <div className="flex flex-wrap gap-4 items-end px-4 py-3 max-w-full text-base text-slate-500 w-[480px]">
            <FormInput
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(value) => onChange("fullName", value)}
            />
          </div>

          <div className="flex flex-wrap gap-4 items-end px-4 py-3 max-w-full text-base whitespace-nowrap text-slate-500 w-[480px]">
            <FormInput
              placeholder="Address"
              value={formData.address}
              onChange={(value) => onChange("address", value)}
            />
          </div>

          <div className="flex flex-wrap gap-4 items-end px-4 py-3 max-w-full text-base whitespace-nowrap text-slate-500 w-[480px]">
            <FormInput
              placeholder="City"
              value={formData.city}
              onChange={(value) => onChange("city", value)}
            />
          </div>

          <div className="flex flex-wrap gap-4 items-end px-4 py-3 max-w-full text-base whitespace-nowrap text-slate-500 w-[480px]">
            <FormInput
              placeholder="State"
              value={formData.state}
              onChange={(value) => onChange("state", value)}
            />
          </div>

          <div className="flex flex-wrap gap-4 items-end px-4 py-3 max-w-full text-base text-slate-500 w-[480px]">
            <FormInput
              placeholder="Zip Code"
              value={formData.zipCode}
              onChange={(value) => onChange("zipCode", value)}
            />
          </div>
        </>
      )}
    </section>
  );
};
