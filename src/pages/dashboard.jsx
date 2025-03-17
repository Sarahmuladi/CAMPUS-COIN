import React, { useState } from "react";
import { FaUser, FaCog, FaSignOutAlt, FaChartPie, FaChartBar, FaMoneyBillWave, FaBell } from "react-icons/fa";
import { Button, Card, CardContent } from "../components/ui";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [balance, setBalance] = useState(100000);
  const [savingsGoal, setSavingsGoal] = useState(500000);
  const transactions = [
    { name: "Food", amount: 5000 },
    { name: "Transport", amount: 8000 },
    { name: "Shopping", amount: 12000 },
    { name: "Entertainment", amount: 6000 },
  ];

  const data = [
    { name: "Saved", value: balance },
    { name: "Remaining", value: savingsGoal - balance },
  ];

  const COLORS = ["#2ECC71", "#FF5733"];

  const navigate = useNavigate();

  const handleUserProfile = () => {
    navigate('/userProfile');
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
        <ul className="space-y-4">
          <li><Button onClick={() => navigate("/dashboard")} className="text-white flex items-center gap-2"><FaChartPie /> Dashboard</Button></li>
          <li><Button onClick={() => navigate("/savingsLock")} className="text-white flex items-center gap-2"><FaMoneyBillWave /> Savings Lock</Button></li>
          <li><Button onClick={() => navigate("/savingsGoal")} className="text-white flex items-center gap-2"><FaChartBar /> Savings Goal</Button></li>
          <li><Button onClick={() => navigate("/smartBudgeting")} className="text-white flex items-center gap-2"><FaChartPie /> Smart Budgeting</Button></li>
          <li><Button onClick={() => navigate("/expensesTracking")} className="text-white flex items-center gap-2"><FaMoneyBillWave /> Expenses Tracking</Button></li>
          <li><Button onClick={() => navigate("/progressTracking")} className="text-white flex items-center gap-2"><FaChartBar /> Progress Tracking</Button></li>
          <li><Button onClick={() => navigate("/mobileMoneyIntegration")} className="text-white flex items-center gap-2"><FaMoneyBillWave /> Mobile Money Integration</Button></li>
          <li><Button onClick={() => navigate("/settings")} className="text-white flex items-center gap-2"><FaCog /> Settings</Button></li>
          <li><Button onClick={() => handleUserProfile()} className="text-white flex items-center gap-2"><FaUser /> Profile</Button></li>
          <li><Button onClick={() => navigate("/login")} className="text-white flex items-center gap-2"><FaCog /> Logout</Button></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="ml-64 p-6">
        {/* Welcome Section */}
        <section className="text-center my-6">
          <h2 className="text-xl font-semibold">Welcome, User!</h2>
        </section>

        {/* Current Balance & Savings Progress */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent>
              <h3 className="text-lg font-semibold">Current Balance</h3>
              <p className="text-2xl">Tsh {balance}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3 className="text-lg font-semibold">Savings Goal Progress</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
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

        {/* Mobile Money Integration */}
        <section className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {["M-Pesa", "Airtel Money", "HaloPesa", "Mixx by Yas"].map((service) => (
            <Card key={service}>
              <CardContent className="text-center">
                <h4 className="text-lg font-semibold">{service}</h4>
                <Button className="bg-[#FF5733] mt-2">Deposit</Button>
                <Button className="bg-[#2ECC71] mt-2">Withdraw</Button>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Notifications */}
        <section className="mt-6">
          <Card>
            <CardContent>
              <h3 className="text-lg font-semibold">Notifications</h3>
              <FaBell className="text-4xl mx-auto" />
              <p className="text-center mt-2">No new notifications</p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;

