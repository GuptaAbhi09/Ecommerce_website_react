// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  {supabase}  from '../../utilsHelper/supabaseClient';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      toast.error(error.message)
    } else {
      toast.success("Login Successful!")
      navigate("/"); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
            <div className="text-right mt-1">
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-blue-600 hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
