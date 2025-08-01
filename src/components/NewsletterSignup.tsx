"use client";
import * as React from "react";
import { useState } from "react";
import { supabase } from "../utilsHelper/supabaseClient"; // Make sure this path is correct

export const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    if (!email) {
      setStatus("error");
      setMessage("Please enter a valid email.");
      return;
    }

    const { data, error } = await supabase.from("subscribers").insert([{ email }]);

    if (error) {
      setStatus("error");
      if (error.code === "23505") {
        setMessage("You are already subscribed.");
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } else {
      setStatus("success");
      setMessage("You're subscribed!");
      setEmail(""); // reset input
    }
  };

  return (
    <section className="w-full bg-white px-4 py-16 md:px-10">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
          Stay Updated
        </h2>
        <p className="text-base text-neutral-600">
          Sign up for our newsletter to receive the latest news and exclusive offers.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        {message && (
          <p className={`mt-4 text-sm ${status === "success" ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}
      </div>
    </section>
  );
};
