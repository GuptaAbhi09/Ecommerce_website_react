import React from "react";

interface BreadcrumbItem {
  label: string;
  isActive?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav
      className="flex flex-wrap gap-2 content-start items-start self-stretch p-4"
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <div className="flex relative flex-col items-start">
            <span
              className={`self-stretch text-base leading-6 ${item.isActive ? "text-neutral-900" : "text-gray-500"}`}
            >
              {item.label}
            </span>
          </div>
          {index < items.length - 1 && (
            <div className="flex relative flex-col items-start">
              <span className="self-stretch text-base leading-6 text-gray-500">
                /
              </span>
            </div>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
