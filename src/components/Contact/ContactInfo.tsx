import * as React from "react";

export const ContactInfo: React.FC = () => {
  return (
    <section className="space-y-4 mt-10">
      <h2 className="text-xl font-semibold text-neutral-900">Our Contact Information</h2>
      <div className="space-y-2 text-sm text-neutral-800">
        <p>📍 Address: 123 Tech Street, Innovation City, CA 91234</p>
        <p>📞 Phone: (555) 123-4567</p>
        <p>✉️ Email: support@example.com</p>
      </div>
    </section>
  );
};
