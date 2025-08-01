"use client";
import * as React from "react";
import { ContactForm } from "./ContactForm";
import { ContactInfo } from "./ContactInfo";

export const ContactPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-white px-4 py-10 md:px-20">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-neutral-900">Contact Us</h1>
          <p className="text-slate-500 text-sm">
            We're here to help! Reach out to us with any questions or concerns.
          </p>
        </header>

        <ContactForm />
        <ContactInfo />
      </div>
    </div>
  );
};

export default ContactPage;
