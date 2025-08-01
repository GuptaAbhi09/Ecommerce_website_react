import * as React from "react";
import { Link } from "react-router-dom";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-[480px] flex items-center justify-center px-5 py-20 text-white text-center max-md:py-10">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full rounded-lg overflow-hidden">
        <img
          src="https://api.builder.io/api/v1/image/assets/7cf3537fa35d4fc79e00032bb1e43a7a/b3865bf57e5403161e055d9de3923513b5df4913?placeholderIfAbsent=true"
          alt="Tech products background"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-xl">
        <h2 className="text-5xl font-bold leading-tight tracking-tight max-md:text-3xl">
          Upgrade Your Tech Today
        </h2>
        <p className="mt-4 text-base">
          Explore the latest in electronics and gadgets.
        </p>
        <Link
          to="/shopNow"
          className="inline-block mt-8 px-6 py-3 bg-sky-500 font-semibold text-base rounded-lg hover:bg-sky-600 transition text-white"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
};
