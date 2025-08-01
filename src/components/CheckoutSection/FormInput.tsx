interface FormInputProps {
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: string;
}

export const FormInput = ({
  placeholder,
  value,
  onChange,
  type = "text",
}: FormInputProps) => {
  return (
    <div className="flex-1 shrink w-full basis-0 min-w-40 max-md:max-w-full">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="flex overflow-hidden items-center px-4 py-4 w-full bg-white rounded-xl border border-solid border-zinc-200 min-h-14 max-md:max-w-full text-base text-slate-500 placeholder:text-slate-500"
      />
    </div>
  );
};
