"use client";
import React, { useState } from "react";

interface PaginationProps {
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalPages = 10,
  currentPage = 1,
  onPageChange,
}) => {
  const [activePage, setActivePage] = useState(currentPage);

  const handlePageChange = (page: number) => {
    setActivePage(page);
    onPageChange?.(page);
  };

  const handlePrevious = () => {
    if (activePage > 1) {
      handlePageChange(activePage - 1);
    }
  };

  const handleNext = () => {
    if (activePage < totalPages) {
      handlePageChange(activePage + 1);
    }
  };

  return (
    <nav
      className="flex relative gap-2 justify-center items-center self-stretch p-4 max-sm:flex-wrap max-sm:gap-1"
      aria-label="Pagination"
    >
      <button
        onClick={handlePrevious}
        disabled={activePage === 1}
        className="flex relative justify-center items-center w-10 h-10 max-sm:w-9 max-sm:h-9 disabled:opacity-50"
        aria-label="Previous page"
      >
        <div className="flex relative flex-col items-start">
          <div className="relative flex-[1_0_0] w-[18px]">
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[18px] h-[18px]"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.32766 12.227C7.54745 12.4468 7.54745 12.8032 7.32766 13.023C7.10786 13.2428 6.75151 13.2428 6.53172 13.023L0.906719 7.39797C0.801094 7.29246 0.741745 7.14929 0.741745 7C0.741745 6.85071 0.801094 6.70754 0.906719 6.60203L6.53172 0.977031C6.75151 0.757239 7.10786 0.757239 7.32766 0.977031C7.54745 1.19682 7.54745 1.55318 7.32766 1.77297L2.09992 7L7.32766 12.227Z"
                fill="#121417"
              />
            </svg>
          </div>
        </div>
      </button>

      <button
        onClick={() => handlePageChange(1)}
        className={`flex relative justify-center items-center w-10 h-10 rounded-3xl max-sm:w-9 max-sm:h-9 ${activePage === 1 ? "bg-gray-100" : ""}`}
        aria-label="Page 1"
        aria-current={activePage === 1 ? "page" : undefined}
      >
        <span
          className={`text-sm leading-5 text-neutral-900 max-sm:text-xs ${activePage === 1 ? "font-bold" : ""}`}
        >
          1
        </span>
      </button>

      <button
        onClick={() => handlePageChange(2)}
        className="flex relative justify-center items-center w-10 h-10 rounded-3xl max-sm:w-9 max-sm:h-9"
        aria-label="Page 2"
        aria-current={activePage === 2 ? "page" : undefined}
      >
        <span className="text-sm leading-5 text-neutral-900 max-sm:text-xs">
          2
        </span>
      </button>

      <button
        onClick={() => handlePageChange(3)}
        className="flex relative justify-center items-center w-10 h-10 rounded-3xl max-sm:w-9 max-sm:h-9"
        aria-label="Page 3"
        aria-current={activePage === 3 ? "page" : undefined}
      >
        <span className="text-sm leading-5 text-neutral-900 max-sm:text-xs">
          3
        </span>
      </button>

      <div className="flex relative justify-center items-center rounded-3xl">
        <span className="text-sm leading-5 text-neutral-900 max-sm:text-xs">
          ...
        </span>
      </div>

      <button
        onClick={() => handlePageChange(totalPages)}
        className="flex relative justify-center items-center w-10 h-10 rounded-3xl max-sm:w-9 max-sm:h-9"
        aria-label={`Page ${totalPages}`}
        aria-current={activePage === totalPages ? "page" : undefined}
      >
        <span className="text-sm leading-5 text-neutral-900 max-sm:text-xs">
          {totalPages}
        </span>
      </button>

      <button
        onClick={handleNext}
        disabled={activePage === totalPages}
        className="flex relative justify-center items-center w-10 h-10 max-sm:w-9 max-sm:h-9 disabled:opacity-50"
        aria-label="Next page"
      >
        <div className="flex relative flex-col items-start">
          <div className="relative flex-[1_0_0] w-[18px]">
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[18px] h-[18px]"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.09328 7.39797L1.46828 13.023C1.24849 13.2428 0.892136 13.2428 0.672344 13.023C0.452552 12.8032 0.452552 12.4468 0.672344 12.227L5.90008 7L0.672344 1.77297C0.452552 1.55318 0.452552 1.19682 0.672344 0.977031C0.892136 0.757239 1.24849 0.757239 1.46828 0.977031L7.09328 6.60203C7.19891 6.70754 7.25826 6.85071 7.25826 7C7.25826 7.14929 7.19891 7.29246 7.09328 7.39797V7.39797Z"
                fill="#121417"
              />
            </svg>
          </div>
        </div>
      </button>
    </nav>
  );
};
