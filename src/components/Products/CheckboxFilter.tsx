"use client";
import React from "react";

interface CheckboxFilterProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (id: string, checked: boolean) => void;
}

export function CheckboxFilter({ id, label, checked, onChange }: CheckboxFilterProps) {
  return (
    <div className="flex gap-3 items-start px-0 py-2">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(id, e.target.checked)}
        className="w-5 h-5 border-2 border-zinc-300 rounded-sm accent-indigo-500"
      />
      <label htmlFor={id} className="text-base text-neutral-900 cursor-pointer">
        {label}
      </label>
    </div>
  );
}
