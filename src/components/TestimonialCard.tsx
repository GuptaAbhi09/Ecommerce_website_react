import * as React from "react";

interface TestimonialCardProps {
  imageUrl: string;
  name: string;
  testimonial: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  imageUrl,
  name,
  testimonial,
}) => {
  return (
    <article className="flex flex-col items-center p-4 bg-white rounded-xl shadow-md max-w-sm w-full">
      <img
        src={imageUrl}
        alt={name}
        className="w-20 h-20 object-cover rounded-full mb-4"
      />
      <h3 className="text-base font-semibold text-neutral-900 text-center">
        {name}
      </h3>
      <p className="text-sm text-slate-600 text-center">{testimonial}</p>
    </article>
  );
};
