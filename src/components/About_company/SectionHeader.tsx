import React from "react";

interface SectionHeaderProps {
  title: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  className = "",
}) => {
  return (
    <header
      className={`flex flex-col items-start px-4 pt-5 pb-3 w-full ${className}`}
    >
      <h2 className="text-2xl font-bold text-neutral-900">
        {title}
      </h2>
    </header>
  );
};
