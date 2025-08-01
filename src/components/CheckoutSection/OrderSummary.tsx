interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  image: string;
}

interface OrderSummaryProps {
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export const OrderSummary = ({
  items,
  subtotal,
  shipping,
  tax,
  total,
}: OrderSummaryProps) => {
  return (
    <section>
      <h2 className="self-stretch px-4 pt-4 pb-2 w-full text-lg font-bold leading-none min-h-[47px] text-neutral-900 max-md:max-w-full">
        Order Summary
      </h2>

      {items.map((item) => (
        <div
          key={item.id}
          className="flex flex-wrap gap-4 items-center self-stretch px-4 py-2 w-full bg-white min-h-[72px] max-md:max-w-full"
        >
          <img
            src={item.image}
            alt={item.name}
            className="object-contain shrink-0 self-stretch my-auto w-14 rounded-lg aspect-square"
          />
          <div className="flex flex-col justify-center self-stretch my-auto">
            <div className="overflow-hidden text-base font-medium text-neutral-900">
              {item.name}
            </div>
            <div className="overflow-hidden text-sm text-slate-500">
              Quantity: {item.quantity}
            </div>
          </div>
        </div>
      ))}

      <div className="self-stretch p-4 w-full text-sm whitespace-nowrap max-md:max-w-full">
        <div className="flex flex-wrap gap-10 justify-between items-start py-2 w-full max-md:max-w-full">
          <span className="text-slate-500">Subtotal</span>
          <span className="text-right text-neutral-900">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex flex-wrap gap-10 justify-between items-start py-2 w-full max-md:max-w-full">
          <span className="text-slate-500">Shipping</span>
          <span className="text-right text-neutral-900">
            ${shipping.toFixed(2)}
          </span>
        </div>

        <div className="flex flex-wrap gap-10 justify-between items-start py-2 w-full max-md:max-w-full">
          <span className="text-slate-500">Tax</span>
          <span className="text-right text-neutral-900">${tax.toFixed(2)}</span>
        </div>

        <div className="flex flex-wrap gap-10 justify-between items-start py-2 w-full max-md:max-w-full">
          <span className="text-slate-500">Total</span>
          <span className="text-right text-neutral-900">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>
    </section>
  );
};
