import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/home'
import AboutUs from './pages/aboutUs'
import Dashboard from './pages/dashboard'
import SignIn from './pages/signIn'
import SignUp from './pages/signUp'
import PrivacyPolicy from './pages/privacyPolicy'
import TermsAndConditions from './pages/termsAndConditions'
import Features from './pages/features'
import UserProfile from './pages/Dashboard/userProfile'
import SavingsLock from './pages/Dashboard/savingsLock'
import SavingsGoal from './pages/Dashboard/savingsGoal'
import SmartBudgeting from './pages/Dashboard/smartBudgeting'
import ExpenseTracking from './pages/Dashboard/expensesTracking'
import ProgressTracking from './pages/Dashboard/progressTracking'
import MobileMoney from './pages/Dashboard/mobileMoneyIntegration'
import Settings from './pages/Dashboard/settings'
import { useAuthContext } from './Hooks/useAuthContext'
//import { ProtectedRoute } from './pages/protectedRoutes';
import { AuthProvider } from './components/Context/AuthContext'
import { ProtectedRoute } from './pages/protectedRoutes'


const App = () => {

  const {user} = useAuthContext();

  return (
    //<BrowserRouter>
    <AuthProvider>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aboutUs" element={<AboutUs />} />
      <Route path="/dashboard" element={ <ProtectedRoute><Dashboard/></ProtectedRoute>} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
      <Route path="/termsAndConditions" element={<TermsAndConditions />} />
      <Route path="/features" element={<Features />} />
      <Route path="/userProfile" element={<UserProfile />} />
      <Route path="/savingsLock" element={<SavingsLock />} />
      <Route path="/savingsGoal" element={<SavingsGoal />} />
      <Route path="/smartBudgeting" element={<SmartBudgeting />} />
      <Route path="/expensesTracking" element={<ExpenseTracking />} />
      <Route path="/progressTracking" element={<ProgressTracking />} />
      <Route path="/mobileMoneyIntegration" element={<MobileMoney />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
    </AuthProvider>
    //</BrowserRouter>
    
  )
}

export default App;