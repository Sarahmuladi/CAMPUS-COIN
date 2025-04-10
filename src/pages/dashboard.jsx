import React, { useContext, useState, useEffect } from "react";
import 
{ FaUser, FaCog, FaSignOutAlt, FaChartPie, FaChartBar, FaMoneyBillWave, FaBell, FaTachometerAlt, FaLock, FaPiggyBank, FaCalculator, FaFileInvoiceDollar } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { Button, Card, CardContent } from "../components/ui";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from 'react-router-dom';
import { useSignOut } from "../Hooks/useSignOut";
import { useAuthContext } from "../Hooks/useAuthContext";
import { AuthContext } from "../components/Context/AuthContext";
import axios from "axios";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [savingsGoal, setSavingsGoal] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const { signout } = useSignOut();
  const { user, accessToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = accessToken || localStorage.getItem("accessToken");
        if (!token) {
          console.log("No access token available");
          return;
        }
        const response = await axios.get("https://campus-coin-backend.onrender.com/api/dashboard/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setBalance(response.data.balance);
        setSavingsGoal(response.data.savingsGoal);
        setTransactions(response.data.transactions);
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    if (user) {
      fetchDashboardData();
    }
  }, [user, accessToken, navigate]); 

  const data = [
    { name: "Saved", value: balance },
    { name: "Remaining", value: savingsGoal - balance },
  ];
  const COLORS = ["#2ECC71", "#FF5733"];

  const handleUserProfile = () => navigate('/userProfile');
  const handleLogout = () => { signout(); navigate('/signIn'); };

  return (
    <div className="bg-[#2E3A59] min-h-screen text-white flex">
      {/* Sidebar Navigation */}
      <nav className="bg-[#1F2A3A] h-full p-4 fixed top-0 left-0 flex flex-col items-center md:w-64 w-20 transition-all duration-300">
        <h2 className="text-xl font-semibold text-white hidden md:block mb-6">Campus Coin</h2>
        <ul className="space-y-3 w-full">
          <li><Button onClick={() => navigate("/dashboard")} className="text-white flex items-center gap-2 justify-center md:justify-start"><FaTachometerAlt /> <span className="hidden md:inline">Dashboard</span></Button></li>
          <li><Button onClick={() => navigate("/savingsLock")} className="text-white flex items-center gap-2 justify-center md:justify-start"><FaLock /> <span className="hidden md:inline">Savings Lock</span></Button></li>
          <li><Button onClick={() => navigate("/savingsGoal")} className="text-white flex items-center gap-2 justify-center md:justify-start"><FaPiggyBank /> <span className="hidden md:inline">Savings Goal</span></Button></li>
          <li><Button onClick={() => navigate("/smartBudgeting")} className="text-white flex items-center gap-2 justify-center md:justify-start"><FaCalculator /> <span className="hidden md:inline">Smart Budgeting</span></Button></li>
          <li><Button onClick={() => navigate("/expensesTracking")} className="text-white flex items-center gap-2 justify-center md:justify-start"><FaFileInvoiceDollar /> <span className="hidden md:inline">Expenses Tracking</span></Button></li>
          <li><Button onClick={() => navigate("/progressTracking")} className="text-white flex items-center gap-2 justify-center md:justify-start"><FaChartBar /> <span className="hidden md:inline">Progress Tracking</span></Button></li>
          <li><Button onClick={() => navigate("/mobileMoneyIntegration")} className="text-white flex items-center gap-2 justify-center md:justify-start"><FaMoneyBillWave /> <span className="hidden md:inline">Mobile Money</span></Button></li>
          <li><Button onClick={() => navigate("/settings")} className="text-white flex items-center gap-2 justify-center md:justify-start"><FaCog /> <span className="hidden md:inline">Settings</span></Button></li>
          <li><Button onClick={handleUserProfile} className="text-white flex items-center gap-2 justify-center md:justify-start"><FaUser /> <span className="hidden md:inline">Profile</span></Button></li>
          <li><Button onClick={handleLogout} className="text-white flex items-center gap-2 justify-center md:justify-start"><TbLogout /> <span className="hidden md:inline">Logout</span></Button></li>
        </ul>
      </nav>
      
      {/* Main Content */}
      <div className="flex-1 p-6 ml-20 md:ml-64">
        <section className="text-center my-6">
          {user && <h2 className="text-xl font-semibold">Welcome, {user?.fullName || "Guest"}!</h2>}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card><CardContent><h3 className="text-lg font-semibold">Current Savings</h3><p className="text-2xl">Tsh {balance}</p></CardContent></Card>
          <Card><CardContent><h3 className="text-lg font-semibold">Savings Goal Progress</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart><Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>{data.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}</Pie></PieChart>
            </ResponsiveContainer>
          </CardContent></Card>
        </section>

        <section className="mt-6"><h3 className="text-lg font-semibold flex"><FaBell /><span>Notifications</span></h3>
          <ul>{notifications.length > 0 ? (notifications.map((notification, index) => (<li key={index} className="bg-gray-700 p-2 my-2 rounded">{notification.message}</li>))) : (<p>No new notifications</p>)}</ul>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
