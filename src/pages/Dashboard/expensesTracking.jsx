import React, { useState } from "react";
import { FaPlus, FaChartPie, FaTrash } from "react-icons/fa";
import { Card, CardContent, Button } from "../../components/ui";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const ExpenseTracking = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, category: "Food", amount: 15000 },
    { id: 2, category: "Transport", amount: 10000 },
    { id: 3, category: "Shopping", amount: 20000 },
  ]);
  const [newExpense, setNewExpense] = useState({ category: "", amount: "" });

  const categories = ["Food", "Transport", "Shopping", "Entertainment", "Bills", "Other"];

  const addExpense = () => {
    if (newExpense.category && newExpense.amount) {
      setExpenses([...expenses, { id: Date.now(), ...newExpense, amount: parseFloat(newExpense.amount) }]);
      setNewExpense({ category: "", amount: "" });
    }
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const pieData = categories.map((cat) => ({
    name: cat,
    value: expenses.filter((e) => e.category === cat).reduce((sum, e) => sum + e.amount, 0),
  })).filter((d) => d.value > 0);

  const COLORS = ["#2ECC71", "#FF5733", "#3498DB", "#F1C40F", "#9B59B6", "#E67E22"];

  return (
    <div className="bg-[#2E3A59] min-h-screen text-white p-6">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-4">Expense Tracking</h2>

      {/* Add Expense Section */}
      <Card className="mb-6">
        <CardContent>
          <h3 className="text-lg font-semibold">Add New Expense</h3>
          <div className="flex gap-4 mt-4">
            <select
              className="p-2 text-black rounded"
              value={newExpense.category}
              onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Amount"
              className="p-2 text-black rounded"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            />
            <Button className="bg-green-500" onClick={addExpense}><FaPlus /></Button>
          </div>
        </CardContent>
      </Card>

      {/* Expenses List */}
      <Card className="mb-6">
        <CardContent>
          <h3 className="text-lg font-semibold">Expense List</h3>
          <ul className="mt-4">
            {expenses.map((exp) => (
              <li key={exp.id} className="flex justify-between items-center bg-gray-700 p-2 rounded mt-2">
                <span>{exp.category} - Tsh {exp.amount}</span>
                <Button className="bg-red-500" onClick={() => deleteExpense(exp.id)}><FaTrash /></Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold">Expense Overview</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={expenses}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#2ECC71" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Pie Chart */}
        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold">Expense Breakdown</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={80}>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExpenseTracking;