export const BreadcrumbNav = () => {
  return (
    <nav className="flex flex-wrap gap-2 items-start self-stretch p-4 w-full text-base font-medium whitespace-nowrap text-slate-500 max-md:max-w-full">
      <span className="w-[34px]">Cart</span>
      <span className="w-[7px]">/</span>
      <span className="text-neutral-900 w-[75px]">Checkout</span>
    </nav>
  );
};
