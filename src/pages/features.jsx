import React from 'react'
import { FaPiggyBank, FaChartLine, FaLock, FaBell, FaUsers } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function Features() {

const navigate = useNavigate();

const handleGetStarted = () => {
    navigate('/signIn')
}

  return (
    <div className="bg-[#2E3A59] text-white min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-[url('/Images/features-bg.jpg')] bg-cover bg-center h-80 flex items-center justify-center">
        <div className="bg-white bg-opacity-50 p-6 rounded-md text-center">
          <h1 className="text-4xl font-bold text-[#FF6F61]">Explore Our Features</h1>
          <p className="text-text-secondary mt-2">Designed to help students save smarter and manage finances with ease</p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 py-12 px-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-[#2ECC71] text-[#2E3A59] p-6 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
          >
            <div className="text-4xl">{feature.icon}</div>
            <h3 className="text-xl font-bold mt-4">{feature.title}</h3>
            <p className="text-sm mt-2">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-[#FF6F61]">Start Saving Smarter Today!</h2>
        <p className="text-gray-300 mt-2">Join thousands of students using Campus Coin.</p>
        <button 
        className="mt-4 bg-[#FF6F61] text-text px-6 py-3 rounded-lg font-bold hover:bg-red-500 transition-all"
        onClick={handleGetStarted}
        >
        Get Started
        </button>
      </div>
    </div>
  );
}

// Features Data
const features = [
  {
    icon: <FaPiggyBank />,
    title: "Savings Goal",
    description: "Set and track your savings goals, like a laptop or trip, and monitor your progress.",
  },
  {
    icon: <FaChartLine />,
    title: "Expense Tracking",
    description: "Keep an eye on where your money goes and stay within budget.",
  },
  {
    icon: <FaLock />,
    title: "Savings Lock",
    description: "Lock your savings for a specific time to prevent unnecessary spending.",
  },
  {
    icon: <FaBell />,
    title: "Smart Alerts",
    description: "Receive reminders and alerts for upcoming expenses and savings goals.",
  },
];
