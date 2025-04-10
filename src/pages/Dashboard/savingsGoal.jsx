import React, { useState, useEffect, useContext } from "react";
import { FaDollarSign, FaCalendarAlt, FaCheckCircle, FaTrashAlt, FaClock, FaTachometerAlt, FaLock, FaCog, FaBars, FaTimes } from "react-icons/fa";
import { Button, Card, CardContent } from "../../components/ui";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../components/Context/AuthContext";

const SavingsGoal = () => {
  const [goalName, setGoalName] = useState("");
  const [goalAmount, setGoalAmount] = useState();
  const [currentAmount, setCurrentAmount] = useState();
  const [goalDeadline, setGoalDeadline] = useState();
  const [goals, setGoals] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get("https://campus-coin-backend.onrender.com/api/savingsGoal/get");
        setGoals(response.data);
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };

    fetchGoals();
  }, []);

  const handleAddGoal = async () => {
    if (goalName && goalAmount > 0 && currentAmount >= 0 && goalDeadline) {
      const newGoal = {
        userId: user._id,
        goalName: goalName,
        goalAmount: Number(goalAmount),
        currentAmount: Number(currentAmount),
        goalDeadline: new Date(goalDeadline).toISOString()
      };

      try {
        const response = await axios.post(
          "https://campus-coin-backend.onrender.com/api/savingsGoal/create",
          { newGoal },
          { headers: { "Content-Type": "application/json" } }
        );

        const addedGoal = response.data;
        setGoals(prevGoals => [...prevGoals, addedGoal]);
        resetForm();
      } catch (error) {
        console.error("Error adding goal:", error);
      }
    }
  };

  const handleDeleteGoal = async (id) => {
    try {
      await axios.delete(`https://campus-coin-backend.onrender.com/api/savingsGoal/delete/${id}`);
      setGoals(goals.filter((goal) => goal._id !== id));
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  const resetForm = () => {
    setGoalName("");
    setGoalAmount("");
    setCurrentAmount("");
    setGoalDeadline("");
  };

  const calculateProgress = (goalAmount, currentAmount) => {
    return (currentAmount / goalAmount) * 100;
  };

  return (
    <div className="bg-[#2E3A59] min-h-screen text-white flex flex-col lg:flex-row">
      {/* Mobile Nav Toggle */}
      <div className="lg:hidden p-4 flex justify-between items-center bg-[#1F2A3A]">
        <h2 className="text-xl font-semibold">Savings Goal</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white text-2xl">
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <nav
        className={`${
          sidebarOpen ? "block" : "hidden"
        } lg:block w-full lg:w-64 bg-[#1F2A3A] h-full p-6 lg:fixed z-10 lg:z-auto`}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold">Menu</h2>
        </div>
        <ul className="space-y-4">
          <li>
            <Button onClick={() => navigate("/dashboard")} className="text-white flex items-center gap-2 w-full">
              <FaTachometerAlt /> Dashboard
            </Button>
          </li>
          <li>
            <Button onClick={() => navigate("/savingsLock")} className="text-white flex items-center gap-2 w-full">
              <FaLock /> Savings Lock
            </Button>
          </li>
          <li>
            <Button onClick={() => navigate("/settings")} className="text-white flex items-center gap-2 w-full">
              <FaCog /> Settings
            </Button>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="w-full lg:ml-64 p-6">
        <section className="text-center my-6">
          <h2 className="text-2xl font-semibold">Set Your Savings Goals</h2>
          <p className="text-lg mt-2">Track your progress and achieve your financial dreams.</p>
        </section>

        {/* Add New Goal */}
        <section className="mt-6 flex justify-center">
          <Card className="w-full max-w-lg">
            <CardContent>
              <div className="text-center">
                <h3 className="text-lg font-semibold">Add New Savings Goal</h3>
                <input
                  type="text"
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                  className="w-full mt-4 p-2 text-black rounded"
                  placeholder="Goal Name"
                />
                <input
                  type="number"
                  value={goalAmount}
                  onChange={(e) => setGoalAmount(e.target.value)}
                  className="w-full mt-4 p-2 text-black rounded"
                  placeholder="Target Amount"
                />
                <input
                  type="number"
                  value={currentAmount}
                  onChange={(e) => setCurrentAmount(e.target.value)}
                  className="w-full mt-4 p-2 text-black rounded"
                  placeholder="Current Savings"
                />
                <input
                  type="date"
                  value={goalDeadline}
                  onChange={(e) => setGoalDeadline(e.target.value)}
                  className="w-full mt-4 p-2 text-black rounded"
                />
                <Button
                  onClick={handleAddGoal}
                  className="mt-4 w-full bg-[#FF5733]"
                  disabled={!goalName || goalAmount <= 0 || currentAmount < 0 || !goalDeadline}
                >
                  Add Goal
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Display Goals */}
        <section className="mt-8">
          <h3 className="text-xl font-semibold text-center">Your Goals</h3>
          <div className="mt-6 space-y-4">
            {goals.length === 0 ? (
              <div className="text-center text-lg text-gray-300">No goals added yet.</div>
            ) : (
              goals.map((goal) => (
                <Card key={goal._id} className="p-4 flex justify-between items-center bg-[#1F2A3A]">
                  <div className="flex flex-col">
                    <h4 className="text-lg font-semibold">{goal.name || goal.goalName}</h4>
                    <p className="text-sm text-gray-300">Target: Tsh {goal.goalAmount}</p>
                    <p className="text-sm text-gray-300">Current: Tsh {goal.currentAmount}</p>
                    <p className="text-sm text-gray-300">
                      Deadline: {goal.goalDeadline ? new Date(goal.goalDeadline).toLocaleDateString() : "Invalid Date"}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="w-32 h-2 bg-gray-300 rounded-full mt-2">
                      <div
                        className="h-full bg-[#2ECC71] rounded-full"
                        style={{
                          width: `${calculateProgress(goal.goalAmount, goal.currentAmount)}%`,
                        }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-300 mt-2">
                      {Math.floor(calculateProgress(goal.goalAmount, goal.currentAmount))}% completed
                    </div>
                    <Button onClick={() => handleDeleteGoal(goal._id)} className="mt-4 text-red-500 hover:bg-transparent">
                      <FaTrashAlt /> Delete Goal
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        </section>

        {/* Footer */}
        <section className="mt-6 text-center text-sm text-gray-300">
          <p>&copy; 2025 Campus Coin. All rights reserved.</p>
        </section>
      </div>
    </div>
  );
};

export default SavingsGoal;
