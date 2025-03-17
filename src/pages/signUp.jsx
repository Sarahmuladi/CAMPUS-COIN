import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("Signing up with:", form);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#2E3A59]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#FF6F61]">Sign Up</h2>
        <form onSubmit={handleSignUp} className="mt-6">
          <div>
            <label className="block font-medium">Full Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#FF6F61]" required />
          </div>
          <div className="mt-4">
            <label className="block font-medium">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#FF6F61]" required />
          </div>
          <div className="mt-4">
            <label className="block font-medium">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#FF6F61]" required />
          </div>
          <button type="submit" className="w-full mt-6 bg-[#FF6F61] text-white py-2 rounded-md font-bold hover:bg-red-500">
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account? <Link to="/signin" className="text-[#2ECC71] hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
