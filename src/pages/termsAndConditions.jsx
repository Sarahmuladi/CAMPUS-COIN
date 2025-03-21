import React from 'react'
import { useNavigate } from 'react-router-dom';






export default function TermsAndConditions() {

const navigate = useNavigate();

const handleClick = () => {
  navigate('/signUp')
}

  return (
    <div className="min-h-screen bg-[#F4F7FA] p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-[#2E3A59]">Terms & Conditions</h1>
        <p className="mt-2 text-gray-700">
          By using <span className="text-[#2ECC71]">Campus Coin</span>, you agree to the following terms.
        </p>

        <h2 className="mt-6 text-2xl font-semibold text-[#2E3A59]">1. Account Registration</h2>
        <p className="text-gray-700">
          You must provide accurate details to create and maintain an account.
        </p>

        <h2 className="mt-6 text-2xl font-semibold text-[#2E3A59]">2. User Responsibilities</h2>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Keep your login details secure.</li>
          <li>Use the platform only for personal savings.</li>
          <li>Follow legal and ethical usage guidelines.</li>
        </ul>

        <h2 className="mt-6 text-2xl font-semibold text-[#2E3A59]">3. Payment & Transactions</h2>
        <p className="text-gray-700">
          Transactions are secured, and any unauthorized activity should be reported immediately.
        </p>

        <h2 className="mt-6 text-2xl font-semibold text-[#2E3A59]">4. Termination</h2>
        <p className="text-gray-700">
          Violation of these terms may result in account suspension or termination.
        </p>

        <button 
        onClick={handleClick}
        className="mt-6 w-full bg-[#FF6F61] text-white py-2 rounded-md font-bold hover:bg-red-500">
        Accept & Continue
        </button>
      </div>
    </div>
  );
}
