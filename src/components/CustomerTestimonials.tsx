import * as React from "react";
import { TestimonialCard } from "./TestimonialCard";

export const CustomerTestimonials: React.FC = () => {
  const testimonials = [
    {
      imageUrl:
        "https://api.builder.io/api/v1/image/assets/7cf3537fa35d4fc79e00032bb1e43a7a/ec1ee87cb1ea27780a2164bc5ad3f585542ae434?placeholderIfAbsent=true",
      name: "Sarah M.",
      testimonial: '"Great products and fast shipping!"',
    },
    {
      imageUrl:
        "https://api.builder.io/api/v1/image/assets/7cf3537fa35d4fc79e00032bb1e43a7a/ce5cce7593f592b599a68659f03c7178ed3b1106?placeholderIfAbsent=true",
      name: "David L.",
      testimonial: '"Excellent customer service and quality gadgets."',
    },
    {
      imageUrl:
        "https://api.builder.io/api/v1/image/assets/7cf3537fa35d4fc79e00032bb1e43a7a/c59e54d1d9bc0f50a35fc7be33c6dd97cd1f47cf?placeholderIfAbsent=true",
      name: "Emily R.",
      testimonial: '"Highly recommend for all your tech needs."',
    },
  ];

  return (
    <section>
      <header className="px-4 pt-5 pb-3 w-full text-2xl font-bold leading-none min-h-[60px] text-neutral-900 max-md:max-w-full">
        <h2 className="max-md:max-w-full">Customer Testimonials</h2>
      </header>
      <div className="flex items-start w-full max-md:max-w-full">
        <div className="flex flex-wrap gap-6 justify-center p-4">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              imageUrl={testimonial.imageUrl}
              name={testimonial.name}
              testimonial={testimonial.testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
