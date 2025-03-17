import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import AboutUs from './pages/aboutUs'
import Dashboard from './pages/dashboard'
import SignIn from './pages/signIn'
import SignUp from './pages/signUp'
import PrivacyPolicy from './pages/privacyPolicy'
import TermsAndConditions from './pages/termsAndConditions'
import Features from './pages/features'
import UserProfile from './pages/userProfile'


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aboutUs" element={<AboutUs />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
      <Route path="/termsAndConditions" element={<TermsAndConditions />} />
      <Route path="/features" element={<Features />} />
      <Route path="/userProfile" element={<UserProfile />} />
    </Routes>
    </BrowserRouter>
    
  )
}

export default App;