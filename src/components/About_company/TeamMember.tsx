import React from "react";

interface TeamMemberProps {
  name: string;
  title: string;
  imageUrl: string;
  altText?: string;
}

export const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  title,
  imageUrl,
  altText = "",
}) => {
  return (
    <article className="flex flex-col items-center gap-3 w-full max-w-xs mx-auto">
      <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden">
        <img
          src={imageUrl}
          alt={altText}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-center">
        <h3 className="text-base font-medium text-neutral-900">{name}</h3>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
    </article>
  );
};
