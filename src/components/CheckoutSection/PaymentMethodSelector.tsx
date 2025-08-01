"use client";

interface PaymentMethodSelectorProps {
  selectedMethod: "credit" | "paypal";
  onChange: (method: "credit" | "paypal") => void;
}

export const PaymentMethodSelector = ({
  selectedMethod,
  onChange,
}: PaymentMethodSelectorProps) => {
  return (
    <section>
      <h2 className="self-stretch px-4 pt-4 pb-2 w-full text-lg font-bold leading-none min-h-[47px] text-neutral-900 max-md:max-w-full">
        Payment Method
      </h2>

      <div className="self-stretch p-4 w-full max-md:max-w-full">
        <label className="flex flex-wrap gap-4 items-center p-4 w-full rounded-xl border border-solid border-zinc-200 max-md:max-w-full cursor-pointer">
          <div className="flex overflow-hidden flex-col grow shrink justify-center self-stretch px-1 py-2 my-auto w-4 rounded-xl border-2 border-solid border-neutral-900">
            {selectedMethod === "credit" && (
              <div className="flex shrink-0 w-2 rounded bg-neutral-900 h-[7px]" />
            )}
          </div>
          <input
            type="radio"
            name="paymentMethod"
            value="credit"
            checked={selectedMethod === "credit"}
            onChange={() => onChange("credit")}
            className="sr-only"
          />
          <span className="grow shrink self-stretch my-auto text-sm font-medium min-w-60 text-neutral-900 w-[856px] max-md:max-w-full">
            Credit Card
          </span>
        </label>

        <label className="flex flex-wrap gap-4 items-center p-4 mt-3 w-full text-sm font-medium whitespace-nowrap rounded-xl border border-solid border-zinc-200 text-neutral-900 max-md:max-w-full cursor-pointer">
          <div className="flex grow shrink self-stretch my-auto w-4 h-5 rounded-xl border-2 border-solid border-zinc-200">
            {selectedMethod === "paypal" && (
              <div className="flex shrink-0 w-2 rounded bg-neutral-900 h-[7px] m-auto" />
            )}
          </div>
          <input
            type="radio"
            name="paymentMethod"
            value="paypal"
            checked={selectedMethod === "paypal"}
            onChange={() => onChange("paypal")}
            className="sr-only"
          />
          <span className="grow shrink self-stretch my-auto min-w-60 w-[856px] max-md:max-w-full">
            PayPal
          </span>
        </label>
      </div>
    </section>
  );
};
