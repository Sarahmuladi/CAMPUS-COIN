import React from 'react'
export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#F4F7FA] p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-[#2E3A59]">Privacy Policy</h1>
        <p className="mt-2 text-gray-700">
          Your privacy is important to us. This Privacy Policy explains how <span className="text-[#2ECC71]">Campus Coin</span> collects, uses, and protects your personal information.
        </p>

        <h2 className="mt-6 text-2xl font-semibold text-[#2E3A59]">1. Information We Collect</h2>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Personal details (name, email, phone number)</li>
          <li>Transaction history and savings goals</li>
          <li>Device and usage data for security</li>
        </ul>

        <h2 className="mt-6 text-2xl font-semibold text-[#2E3A59]">2. How We Use Your Information</h2>
        <p className="text-gray-700">
          We use your data to provide a seamless savings experience, including:
        </p>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Tracking your savings goals</li>
          <li>Securing transactions</li>
          <li>Sending notifications and updates</li>
        </ul>

        <h2 className="mt-6 text-2xl font-semibold text-[#2E3A59]">3. Security Measures</h2>
        <p className="text-gray-700">
          We take your security seriously, using encryption and multi-layered protection.
        </p>

        <h2 className="mt-6 text-2xl font-semibold text-[#2E3A59]">4. Your Rights</h2>
        <p className="text-gray-700">
          You have the right to access, modify, or delete your data at any time.
        </p>

        <button className="mt-6 w-full bg-[#FF6F61] text-white py-2 rounded-md font-bold hover:bg-red-500">
          Accept & Continue
        </button>
      </div>
    </div>
  );
}
