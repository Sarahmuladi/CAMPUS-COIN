import React from 'react'
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useSignIn from '../Hooks/useSignIn';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../components/Context/AuthContext';



export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isLoading} = useSignIn();
  const [error, setError] = useState(null);
  const { setUser, signin: userLogin } = useContext(AuthContext);
  
  

  const navigate = useNavigate();

  const {user} = useContext(AuthContext);
  

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);
  
     try {

       const user = await userLogin( email, password)
       console.log(user);
      
     } catch (error) {
       console.error("Login failed:", error);
       // Display error message on the page
      setError(error.message);
     }

    
    
  };

 

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#2E3A59]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#FF6F61]">Sign In</h2>
        <form onSubmit={handleSignIn}className="mt-6">
          <div>
            <label className="block font-medium">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#FF6F61]" required />
          </div>
          <div className="mt-4">
            <label className="block font-medium">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#FF6F61]" required />
          </div>
          <button
          disabled={isLoading} 
          type="submit" 
          className="w-full mt-6 bg-[#FF6F61] text-white py-2 rounded-md font-bold hover:bg-red-500">
            Sign In
          </button>
          {error && <div className='text-red-600'>{error}</div>}
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account? <Link to="/signup" className="text-[#2ECC71] hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
