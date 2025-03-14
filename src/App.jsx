import React, {useState} from 'react'
import { FaUser, FaPiggyBank, FaChartLine, FaLock } from 'react-icons/fa'
import { FaSquareXTwitter, FaSquareFacebook, FaSquareInstagram } from 'react-icons/fa6'




const App = () => {

  // State to track if the menu is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };



  return (
    <>
    <div>
      {/* NAVIGATION BAR */}
        <nav className='bg-primary text-white p-4'>
          <div className='container mx-auto flex justify-between items-center'>
            <a href='#' className='text-2xl font-bold'><span><h3>CAMPUS COIN</h3></span></a>
            {/* Navigation links hidden on mobile, shown on larger screens */}
          <ul className='hidden md:flex space-x-6'>
          <li><a href="/">Home</a></li>
          <li><a href="/aboutUs">About Us</a></li>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/signIn">Sign In</a></li>
          </ul>

          {/* Mobile menu button */}
          <button id='menu-btn' onClick={toggleMenu}
       className='md:hidden text-2xl'>&#9776;</button>

          </div>

          {/* Mobile Menu */}
          <ul 
          id="mobile-menu"
          className={`${isMenuOpen ? 'flex' : 'hidden'}
           md:hidden flex-col items-center space-y-4 mt-4`}
           >
         <li><a href="/" className="block py-2 hover:text-text-secondary">Home</a></li>
         <li><a href="/aboutUs" className="block py-2 hover:text-text-secondary">About Us</a></li>
         <li><a href="/dashboard" className="block py-2 hover:text-text-secondary">Dashboard</a></li>
         <li><a href="/signIn" className="block py-2 hover:text-text-secondary">Sign In</a></li>
         </ul>
        </nav>
        

      {/* Hero Section */}
      <div className="bg-[url('/Images/img1.jpg')] bg-cover bg-no-repeat bg-center h-screen w-screen">
        <div><span>Your Campus, Your Coin</span></div>
        <div><span>Smart Savings for Student Life</span></div>
        {/* <div><img src="/Images/img1.jpg"/></div> */}
        <button>Get Started</button>
        <button>Learn More</button>
      </div>

      {/* Feature Cards */}
      <div>
        <h3>KEY FEATURES</h3>
        <div className="bg-[url('/Images/img2.jpg')] bg-contain bg-no-repeat bg-center h-screen w-full">
          <h4>Savings Goal</h4>
          <p>Set and track your savings goals, like a new laptop or dream trip, and watch your progress grow</p>
        </div>

        <div className="bg-[url('/Images/img9.jpg')] bg-contain bg-no-repeat bg-center h-screen w-full">
          <h4>Savings Lock</h4>
          <p>Lock your savings for a set time to avoid impulsive spending and stay on track with your goals</p>
        </div>

        <div className="bg-[url('/Images/img8.jpg')] bg-contain bg-no-repeat bg-center h-screen w-full">
          <h4>Budgeting</h4>
          <p>Plan your spending with monthly budgets for food, transport, and more, so you never overspend</p>
        </div>

        <div className="bg-[url('/Images/img7.jpg')] bg-contain bg-no-repeat bg-center h-screen w-full">
          <h4>Tracking Expenses</h4>
          <p>Log your daily expenses and see exactly where your money goes, helping you stay within your budget</p>
        </div>

        <div className="bg-[url('/Images/img10.jpg')] bg-contain bg-no-repeat bg-center h-screen w-full">
          <h4>Mobile Money Integration</h4>
          <p>Deposit, withdraw and manage your money seamlessly with M-Pesa, Airtel Money and more</p>
        </div>
      </div>

      {/* How it Works */}
      <div>
        <h3>HOW CAMPUS COIN WORKS</h3>
        <p>Saving smarter is just a few steps away</p>
        <div>
          <FaUser/>
          <h4>Create Your Account</h4>
          <p>Sign up in minutes with your email or mobile number</p>
        </div>

        <div>
          <FaPiggyBank/>
          <h4>Set Savings Goals</h4>
          <p>Define your goals, like saving for a laptop or trip</p>
        </div>

        <div>
          <FaChartLine/>
          <h4>Track Expenses</h4>
          <p>Log your daily expenses and stay within your budget</p>
        </div>

        <div>
          <FaLock/>
          <h4>Watch your savings grow</h4>
          <p>Use Savings Lock to avoid spending and achieve your goals faster</p>
        </div>

        <button>Get Started</button>
      </div>

      {/* Footer */}
      <div>
        <ul>
          <li>
            <div>
            <h4>CAMPUS COIN</h4>
            <FaSquareFacebook/>
            <FaSquareInstagram/>
            <FaSquareXTwitter/>
            </div>
            </li>

          <li>
          <div>
            <h4>CONTACT US</h4>
            <p>+255 767946838</p>
            <p>info@campuscoin.com</p>
            </div>
          </li>

          <li>
          <div>
            <h4>QUICK LINKS</h4>
            <p><a>About</a></p>
            <p><a>Features</a></p>
            <p><a>Privacy Policy</a></p>
            <p><a>Terms and Conditions</a></p>
            </div>
          </li>
        </ul>
      </div>

      <div>
        <p>&copy; 2025 Campus Coin. All rights reserved.</p>
      </div>





    </div>
    </>
    
  )
}


export default App;