"use client";
import * as React from "react";

interface FormFieldProps {
  label: string;
  type: "text" | "email" | "textarea";
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  required = false,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => onChange(e.target.value);

  const inputStyles =
    "w-full bg-transparent text-sm text-slate-700 outline-none resize-none";

  return (
    <div className="w-full space-y-1">
      <label className="text-sm font-medium text-neutral-800">{label}</label>
      <div className="bg-white border border-zinc-200 rounded-lg px-4 py-3">
        {type === "textarea" ? (
          <textarea
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className={`${inputStyles} h-32`}
            required={required}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className={`${inputStyles} h-10`}
            required={required}
          />
        )}
      </div>
    </div>
  );
};
