import React from "react";

interface ContactItemProps {
  label: string;
  value: string;
  className?: string;
}

const ContactItem: React.FC<ContactItemProps> = ({
  label,
  value,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col flex-1 items-start px-0 py-4 border-t border-gray-200 ${className}`}
    >
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-sm text-neutral-900">{value}</p>
    </div>
  );
};

export const ContactInfo: React.FC = () => {
  return (
    <section className="flex flex-col gap-6 p-4 w-full max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <ContactItem label="Email" value="support@techhaven.com" />
        <ContactItem label="Phone" value="+1 (555) 123-4567" />
      </div>
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <ContactItem label="Address" value="123 Tech Street, Innovation City, CA 90001" />
      </div>
    </section>
  );
};
