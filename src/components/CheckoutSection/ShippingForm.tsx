"use client";

import { FormInput } from "./FormInput";

interface ShippingFormProps {
  formData: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
  };
  onChange: (field: string, value: string) => void;
}

export const ShippingForm = ({ formData, onChange }: ShippingFormProps) => {
  return (
    <section>
      <h2 className="self-stretch px-4 pt-4 pb-2 w-full text-lg font-bold leading-none min-h-[47px] text-neutral-900 max-md:max-w-full">
        Shipping Information
      </h2>

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

      <div className="flex flex-wrap gap-4 items-end px-4 py-3 max-w-full text-base text-slate-500 w-[480px]">
        <FormInput
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={(value) => onChange("phoneNumber", value)}
        />
      </div>
    </section>
  );
};
