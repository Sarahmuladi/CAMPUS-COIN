import React from 'react'
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useSignUp from '../Hooks/useSignUp';
import { AuthContext } from '../components/Context/AuthContext';

export default function SignUp() {
 
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const { isLoading } = useSignUp()

  const {signup: userRegister} = useContext(AuthContext);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const user = await userRegister(fullName, email, password);
      console.log(user);
      
    } catch (error) {
      console.error("Register failed:", error);
      
      const errorMessage = error.response?.data?.message || error.message || "Registration failed. Please try again.";
      setError(errorMessage);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#2E3A59]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#FF6F61]">Sign Up</h2>
       
        <form onSubmit={handleSignUp} className="mt-6">
          <div>
            <label className="block font-medium">Full Name</label>
            <input type="text" name="name" value={fullName} onChange= {(e) =>setFullName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#FF6F61]" required />
          </div>
          <div className="mt-4">
            <label className="block font-medium">Email</label>
            <input type="email" name="email" value={email} onChange={(e) =>setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#FF6F61]" required />
          </div>
          <div className="mt-4">
            <label className="block font-medium">Password</label>
            <input type="password" name="password" value={password} onChange={(e) =>setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#FF6F61]" required />
          </div>
          <button 
          disabled={isLoading}
          type="submit" 
          className="w-full mt-6 bg-[#FF6F61] text-white py-2 rounded-md font-bold hover:bg-red-500">
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </button>
          {error && <div className='text-red-600'>{error}</div>}
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account? <Link to="/signin" className="text-[#2ECC71] hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
