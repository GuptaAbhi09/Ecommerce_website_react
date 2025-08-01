"use client";
import * as React from "react";
import { FormField } from "./FormField";
import {supabase } from "../../utilsHelper/supabaseClient"
import toast from "react-hot-toast";

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange =
    (field: keyof typeof formData) => (value: string) =>
      setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, message } = formData;

    const { error } = await supabase.from("contact_submissions").insert([
      { name, email, message },
    ]);

    if (error) {
      console.error("Error submitting message:", error.message);
      toast.error("Error submitting message")
    } else {
      toast.success("Message submitted successfully!");
      setFormData({ name: "", email: "", message: "" }); // reset form
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        label="Name"
        type="text"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange("name")}
        required
      />
      <FormField
        label="Email"
        type="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange("email")}
        required
      />
      <FormField
        label="Message"
        type="textarea"
        placeholder="Your Message"
        value={formData.message}
        onChange={handleChange("message")}
        required
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-semibold py-2 px-6 rounded-full transition-colors"
      >
        Submit
      </button>
    </form>
  );
};
