import React, { useContext, useState, useEffect } from "react";
import { FaUser, FaCog, FaSignOutAlt, FaChartPie, FaChartBar, FaMoneyBillWave, FaBell } from "react-icons/fa";
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
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Fetch the token from localStorage or context
    const token = localStorage.getItem("token");  

    // Make API call with Authorization header
    axios.get("http://localhost:5000/api/dashboard/get", {
      headers: {
        Authorization: token ? `Bearer ${token}` : ""
      }
    })
    .then(response => {
      setBalance(response.data.balance);
      setSavingsGoal(response.data.savingsGoal);
      setTransactions(response.data.transactions);
      setNotifications(response.data.notifications);
    })
    .catch(error => {
      console.error("Error fetching dashboard data:", error);
      if (error.response && error.response.status === 401) {
        // Handle unauthorized access
        //navigate("/signIn");
      }
    });
  }, [navigate]);

  const data = [
    { name: "Saved", value: balance },
    { name: "Remaining", value: savingsGoal - balance },
  ];

  const COLORS = ["#2ECC71", "#FF5733"];

  const handleUserProfile = () => {
    navigate('/userProfile');
  };

  const handleLogout = () => {
    signout();
    navigate('/signIn');
  };

  return (
    <div className="bg-[#2E3A59] min-h-screen text-white p-6">
      {/* Side Navigation */}
      <nav className="w-64 bg-[#1F2A3A] fixed inset-0 top-0 left-0 h-full py-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-white">
            <span className="text-blue-800">Campus</span>
            <span className="text-secondary">Coin</span>
          </h2>
        </div>
        <ul className="space-y-3">
          <li><Button onClick={() => navigate("/dashboard")} className="text-white flex items-center gap-2"><FaChartPie /> Dashboard</Button></li>
          <li><Button onClick={() => navigate("/savingsLock")} className="text-white flex items-center gap-2"><FaMoneyBillWave /> Savings Lock</Button></li>
          <li><Button onClick={() => navigate("/savingsGoal")} className="text-white flex items-center gap-2"><FaChartBar /> Savings Goal</Button></li>
          <li><Button onClick={() => navigate("/smartBudgeting")} className="text-white flex items-center gap-2"><FaChartPie /> Smart Budgeting</Button></li>
          <li><Button onClick={() => navigate("/expensesTracking")} className="text-white flex items-center gap-2"><FaMoneyBillWave /> Expenses Tracking</Button></li>
          <li><Button onClick={() => navigate("/progressTracking")} className="text-white flex items-center gap-2"><FaChartBar /> Progress Tracking</Button></li>
          <li><Button onClick={() => navigate("/mobileMoneyIntegration")} className="text-white flex items-center gap-2"><FaMoneyBillWave /> Mobile Money</Button></li>
          <li><Button onClick={() => navigate("/settings")} className="text-white flex items-center gap-2"><FaCog /> Settings</Button></li>
          <li><Button onClick={handleUserProfile} className="text-white flex items-center gap-2"><FaUser /> Profile</Button></li>
          <li><Button onClick={handleLogout} className="text-white flex items-center gap-2"><TbLogout /> Logout</Button></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="ml-60 mr-40 p-6">
        {/* Welcome Section */}
        <section className="text-center my-6">
          {user && <h2 className="text-xl font-semibold">Welcome, {user?.name || "Guest"}!</h2>}
        </section>

        {/* Current Balance & Savings Progress */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent>
              <h3 className="text-lg font-semibold">Current Savings</h3>
              <p className="text-2xl">Tsh {balance}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3 className="text-lg font-semibold">Savings Goal Progress</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>

        {/* Expense Tracking */}
        <section className="mt-6">
          <h3 className="text-lg font-semibold">Expense Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={transactions}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#2ECC71" />
            </BarChart>
          </ResponsiveContainer>
        </section>

        {/* Notifications Section */}
        <section className="mt-6">
          <h3 className="text-lg font-semibold flex"><FaBell/><span>Notifications</span></h3>
          <ul>
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <li key={index} className="bg-gray-700 p-2 my-2 rounded">{notification.message}</li>
              ))
            ) : (
              <p>No new notifications</p>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
