// src/components/ForgotPassword.jsx
import React, { useState } from 'react';
import { supabase } from '../../utilsHelper/supabaseClient';
import toast from 'react-hot-toast';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://localhost:5173/update-password', // 🔁 after clicking email link
  });

  if (error) {
    toast.error(error.message);
  } else {
    toast.success(`Password reset link has been sent to your ${email}`)
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
