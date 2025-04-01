import React from 'react'
import { FaUsers, FaLightbulb, FaShieldAlt, FaHandshake } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function AboutUs() {

const navigate = useNavigate();

const handleGetStarted = () => {
  navigate('/signUp')
}

  return (
    <div className="bg-[#2E3A59] text-white min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-[url('/Images/about-bg.jpg')] bg-cover bg-center h-80 flex items-center justify-center">
        <div className="bg-white  p-6 rounded-md text-center">
          <h1 className="text-4xl font-bold text-[#FF6F61]">About Campus Coin</h1>
          <p className="text-text-secondary mt-2">Your Campus, Your Coin – Smart Savings for Students</p>
        </div>
      </div>

      {/* Company Overview */}
      <div className="max-w-4xl mx-auto text-center py-12 px-6">
        <h2 className="text-3xl font-bold text-[#2ECC71]">Who We Are</h2>
        <p className="text-gray-300 mt-4">
          Campus Coin is a student-centric financial platform designed to help students save, track expenses, and 
          achieve their financial goals effortlessly. Our mission is to promote financial responsibility among students.
        </p>
      </div>

      {/* Core Values Section */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6 py-12 px-6">
        {coreValues.map((value, index) => (
          <div key={index} className="bg-[#2ECC71] text-[#2E3A59] p-6 rounded-lg text-center">
            <div className="text-3xl">{value.icon}</div>
            <h3 className="text-xl font-bold mt-4">{value.title}</h3>
            <p className="text-sm mt-2">{value.description}</p>
          </div>
        ))}
      </div>

      {/* Meet the Team */}
      <div className="text-center py-12 px-6">
        <h2 className="text-3xl font-bold text-[#FF6F61]">Meet the Team</h2>
        <p className="text-gray-300 mt-2">The passionate people behind Campus Coin</p>
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-[#2ECC71] text-[#2E3A59] p-6 rounded-lg w-64 text-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full border-4 border-white  bg-cover"
              />
              <h3 className="text-lg font-bold mt-4">{member.name}</h3>
              <p className="text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-[#2ECC71]">Join the Campus Coin Community</h2>
        <p className="text-gray-300 mt-2">Start saving smarter today and achieve your financial goals.</p>
        <button 
        className="mt-4 bg-[#FF6F61] text-white px-6 py-3 rounded-lg font-bold hover:bg-red-500 transition-all"
        onClick={handleGetStarted}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

// Core Values Data
const coreValues = [
  {
    icon: <FaUsers />,
    title: "Student Focused",
    description: "Designed to meet students' financial needs.",
  },
  {
    icon: <FaLightbulb />,
    title: "Innovation",
    description: "Smart features to help students save effortlessly.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Security",
    description: "Your money and data are safe with us.",
  },
  {
    icon: <FaHandshake />,
    title: "Community",
    description: "Empowering students to take control of their finances.",
  },
];

// Team Members Data (Replace Images with Real Paths)
const teamMembers = [
  {
    name: "Sarah M. Muradi",
    role: "Founder & CEO, Lead Developer",
    image: "/Images/img13.JPG",
  },
  // {
  //   name: "Basilisa Kitani",
  //   role: "Supervisor",
  //   image: "/Images/team2.jpg",
  // },
  // {
  //   name: "Samwel Muladi",
  //   role: "Head of Marketing",
  //   image: "/Images/team3.jpg",
  // },
  // {
  //   name: "Caleb Muladi",
  //   role: "Senior Developer",
  //   image: "/Images/team4.jpg",
  // },
];
