"use client";
import * as React from "react";

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}

export function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col w-full px-4 py-2">
      <h2 className="text-lg font-semibold text-neutral-900 mb-2">{title}</h2>
      {children}
    </section>
  );
}
