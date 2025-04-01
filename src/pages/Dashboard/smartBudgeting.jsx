import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaExclamationTriangle } from "react-icons/fa";
import { Button, Card, CardContent } from "../../components/ui";
import { PieChart, Pie, Cell, Tooltip } from "recharts";


const SmartBudgeting = () => {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [budgetData, setBudgetData] = useState(null); 

  const COLORS = ["#FF5733", "#2ECC71", "#FFC300", "#3498DB", "#8E44AD"];

  // Fetch data on component mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/savings/get")
      .then((response) => {
        const data = response.data[0] || {}; 
        setIncome(data.income || "");
        setExpenses(data.expenses || []);
      })
      .catch((error) => {
        console.error("Error fetching budget data", error);
      });
  }, []);

  const addExpense = () => {
    if (category && amount > 0) {
      setExpenses([...expenses, { category, amount: Number(amount) }]);
      setCategory("");
      setAmount("");
    }
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const balance = income - totalExpenses;

  const data = expenses.map((exp, index) => ({
    name: exp.category,
    value: exp.amount,
    color: COLORS[index % COLORS.length],
  }));

  const saveBudget = () => {
    const budget = {
      income,
      expenses,
      
    };

    axios
      .post("http://localhost:5000/api/savings/add", budget)
      .then((response) => {
        console.log("Budget saved successfully", response.data);
      })
      .catch((error) => {
        console.error("Error saving budget data", error);
      });
      alert("budget saved successfully")
  };

  return (
    <div className="bg-[#2E3A59] min-h-screen text-white p-6">
      <div className="text-center my-6">
        <h2 className="text-2xl font-semibold">Smart Budgeting</h2>
        <p className="text-lg mt-2">Manage your budget and track your spending wisely.</p>
      </div>

      <section className="mt-6 flex justify-center">
        <Card className="w-full max-w-lg">
          <CardContent>
            <h3 className="text-lg font-semibold">Set Your Income</h3>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="w-full mt-4 p-2 text-black rounded"
              placeholder="Enter your monthly income"
            />
          </CardContent>
        </Card>
      </section>

      <section className="mt-6 flex justify-center">
        <Card className="w-full max-w-lg">
          <CardContent>
            <h3 className="text-lg font-semibold">Add Expenses</h3>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full mt-4 p-2 text-black rounded"
              placeholder="Expense Category (e.g., Rent, Food)"
            />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full mt-4 p-2 text-black rounded"
              placeholder="Amount"
            />
            <Button onClick={addExpense} className="mt-4 w-full bg-[#FF5733]">
              <FaPlus /> Add Expense
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="mt-6 text-center">
        <h3 className="text-xl font-semibold">Budget Overview</h3>
        <p className="text-lg mt-2">Total Expenses: Tsh {totalExpenses} | Balance: Tsh {balance}</p>
        {balance < 0 && (
          <div className="text-red-500 flex items-center justify-center mt-2">
            <FaExclamationTriangle /> Warning! You have exceeded your budget.
          </div>
        )}
      </section>

      <section className="mt-6 flex justify-center">
        <Card className="w-full max-w-lg">
          <CardContent>
            <h3 className="text-lg font-semibold">Spending Breakdown</h3>
            {expenses.length > 0 ? (
              <PieChart width={300} height={300}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            ) : (
              <p className="text-gray-300 text-center">No expenses added yet.</p>
            )}
          </CardContent>
        </Card>
      </section>

      <section className="mt-6 text-center">
        <Button onClick={saveBudget} className="w-full bg-[#FF5733]">
          Save Budget
        </Button>
      </section>
    </div>
  );
};

export default SmartBudgeting;

