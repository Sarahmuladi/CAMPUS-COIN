import React, {useState} from 'react'
import { FaUser, FaPiggyBank, FaChartLine, FaLock } from 'react-icons/fa'
import { FaSquareXTwitter, FaSquareFacebook, FaSquareInstagram } from 'react-icons/fa6'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const Home = () => {

  // State to track if the menu is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  //swiper
  const features = [
    {
      title: "Savings Goal",
      image: "/Images/img2.jpg",
      description: "Set and track your savings goals, like a new laptop or dream trip, and watch your progress grow."
    },
    {
      title: "Savings Lock",
      image: "/Images/img9.jpg",
      description: "Lock your savings for a set time to avoid impulsive spending and stay on track with your goals"
    },
    {
      title: "Smart Budgeting",
      image: "/Images/img8.jpg",
      description: "Plan your spending with monthly budgets for food, transport, and more, so you never overspend"
    },
    {
      title: "Tracking Expenses",
      image: "/Images/img7.jpg",
      description: "Log your daily expenses and see exactly where your money goes, helping you stay within your budget"
    },
    {
      title: "Progress Tracking",
      image: "/Images/img11.jpg",
      description: "Visualize your savings progress with graphs and charts to stay motivated."
    },
    {
      title: "Mobile Money Integration",
      image: "/Images/img10.jpg",
      description: "Deposit, withdraw, and manage your money seamlessly with M-Pesa, Airtel Money, and more"
    }
  ];

  //how it works
  const steps = [
    {
      icon: <FaUser />,
      title: "Create Your Account",
      description: "Sign up in minutes with your email or mobile number."
    },
    {
      icon: <FaPiggyBank />,
      title: "Set Savings Goals",
      description: "Define your goals, like saving for a laptop or trip."
    },
    {
      icon: <FaChartLine />,
      title: "Track Expenses",
      description: "Log your daily expenses and stay within your budget."
    },
    {
      icon: <FaLock />,
      title: "Watch Your Savings Grow",
      description: "Use Savings Lock to avoid spending and achieve your goals faster."
    }
  ];

  //buttons
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signIn')
  }

  const handleLearnMore = () => {
    navigate('/features')
  }



  return (
    <>
    <div className="overflow-x-hidden max-w-[100vw]">
      {/* NAVIGATION BAR */}
        <nav className='bg-primary text-white p-4'>
          <div className='container mx-auto flex justify-between items-center'>
            <a href='#' className='text-2xl font-bold'><span><h3>CAMPUS COIN</h3></span></a>
            {/* Navigation links hidden on mobile, shown on larger screens */}
          <ul className='hidden md:flex space-x-6'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/aboutUs">About Us</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/signIn">Sign In</Link></li>
          </ul>

          {/* Mobile menu button */}
          <button 
          id='menu-btn' 
          onClick={toggleMenu}
          className='md:hidden text-2xl'>&#9776;
          </button>

          </div>

          {/* Mobile Menu */}
          <ul 
          id="mobile-menu"
          className={`${isMenuOpen ? 'flex' : 'hidden'}
           md:hidden flex-col items-center space-y-4 mt-4`}
           >
         <li><Link to="/" className="block py-2 border-0 hover:text-[#2ECC71] transition-all">Home</Link></li>
         <li><Link to="/aboutUs" className="block py-2 hover:text-text-secondary">About Us</Link></li>
         <li><Link to="/dashboard" className="block py-2 hover:text-text-secondary">Dashboard</Link></li>
         <li><Link to="/signIn" className="block py-2 hover:text-text-secondary">Sign In</Link></li>
         </ul>
        </nav>
        

      {/* HERO SECTION */}
<div className="relative h-screen w-screen bg-cover bg-no-repeat bg-center" 
     style={{ backgroundImage: "url('/Images/img1.jpg')" }}>
  
  {/* Overlay for better text contrast */}
  <div className="absolute inset-0 bg-opacity-70"></div>

  {/* Content Container */}
  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
    
    <h1 className="text-4xl md:text-5xl font-bold text-cream-900 drop-shadow-xl">
      Your Campus, Your Coin
    </h1>
    
    <p className="text-lg md:text-2xl mt-3 text-cream-400 shadow-xl">
      Smart Savings for Student Life
    </p>

    {/* Buttons */}
    <div className="mt-6 flex gap-4">
      <button 
      className="px-6 py-3 bg-cream text-gray-900 font-semibold rounded-lg shadow-md hover:bg-red-500 transition-all"
      onClick={handleGetStarted}
      >
      Get Started
      </button>

      <button 
      className="px-6 py-3 bg-transparent border border-cream text-cream font-semibold rounded-lg hover:bg-cream hover:text-gray-900 transition"
      onClick={handleLearnMore}
      >
      Learn More
      </button>
    </div>
    
  </div>
</div>


      {/* FEATURE CARDS */}
      <div className="w-full py-10 bg-gray-100">
      <h3 className="text-4xl font-bold text-center text-gray-900 mb-8">Key Features</h3>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        className="w-full max-w-4xl mx-auto"
      >
        {features.map((feature, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[500px] w-full bg-cover bg-center rounded-xl shadow-lg flex flex-col items-center justify-center text-white px-6"
              style={{ backgroundImage: `url(${feature.image})` }}>
              
              <div className="absolute inset-0 bg-opacity-50 rounded-xl"></div>

              <div className="relative z-10 text-center">
                <h4 className="text-2xl font-semibold text-text drop-shadow-lg">{feature.title}</h4>
                <p className="mt-3 text-lg drop-shadow-md text-text-secondary">{feature.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

      {/* How it Works */}
      <div className="bg-gray-100 py-16 px-6 text-center">
      <h3 className="text-4xl font-bold text-gray-900 mb-4">How CampusCoin Works</h3>
      <p className="text-lg text-gray-700 mb-10">Saving smarter is just a few steps away</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {steps.map((step, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center transition-transform transform hover:scale-105">
            <div className="text-4xl text-cream bg-gray-200 p-4 rounded-full mb-4">{step.icon}</div>
            <h4 className="text-xl font-semibold text-gray-800">{step.title}</h4>
            <p className="text-gray-600 mt-2">{step.description}</p>
          </div>
        ))}
      </div>

      <button 
      className="mt-10 px-6 py-3 bg-cream text-text font-semibold rounded-xl shadow-md hover:bg-red-500 transition-all"
      onClick={handleGetStarted}
      >
      Get Started
      </button>
    </div>

      {/* FOOTER */}
    <footer className="bg-[#2E3A59] text-white py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        
        {/* Logo & Social Icons */}
        <div className="mb-6 md:mb-0">
          <h4 className="text-2xl font-bold">CAMPUS COIN</h4>
          <div className="flex justify-center md:justify-start gap-4 mt-3">
            <FaSquareFacebook className="text-2xl hover:text-[#2ECC71] transition-all cursor-pointer" />
            <FaSquareInstagram className="text-2xl hover:text-[#2ECC71] transition-all cursor-pointer" />
            <FaSquareXTwitter className="text-2xl hover:text-[#2ECC71] transition-all cursor-pointer" />
          </div>
        </div>

        {/* Contact Section */}
        <div className="mb-6 md:mb-0">
          <h4 className="text-lg font-semibold">CONTACT US</h4>
          <p className="text-gray-300 mt-2">+255 767 946 838</p>
          <p className="text-gray-300">info@campuscoin.com</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold">QUICK LINKS</h4>
          <ul className="mt-2 space-y-2">
          <li><Link to="/aboutUs" className="hover:text-[#2ECC71] transition-all">About</Link></li>
          <li><Link to="/features" className="hover:text-[#2ECC71] transition-all">Features</Link></li>
          <li><Link to="/privacyPolicy" className="hover:text-[#2ECC71] transition-all">Privacy Policy</Link></li>
          <li><Link to="/termsAndConditions" className="hover:text-[#2ECC71] transition-all">Terms and Conditions</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center mt-8 border-t border-gray-500 pt-4 text-gray-300 text-sm">
        &copy; 2025 Campus Coin. All rights reserved.
      </div>
    </footer>




    </div>
    </>
    
  )
}


export default Home;