"use client";
import React from "react";

interface PriceRangeSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function PriceRangeSlider({ value, onChange }: PriceRangeSliderProps) {
  return (
    <div className="flex flex-col gap-3 px-4 py-2 w-full">
      <label className="text-base text-neutral-900">Price (up to)</label>
      <input
        type="range"
        min="0"
        max="2000"
        step="50"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer"
      />
      <span className="text-sm text-slate-500">Up to ${value}</span>
    </div>
  );
}
