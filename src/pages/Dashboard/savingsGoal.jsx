import React, { useState } from "react";
import { FaDollarSign, FaCalendarAlt, FaCheckCircle, FaTrashAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { Button, Card, CardContent } from "../../components/ui";
import { useNavigate } from "react-router-dom";

const SavingsGoal = () => {
  const [goalName, setGoalName] = useState("");
  const [goalAmount, setGoalAmount] = useState();
  const [currentAmount, setCurrentAmount] = useState();
  const [goals, setGoals] = useState([]);
  const [goalDeadline, setGoalDeadline] = useState("");
  const navigate = useNavigate();

  const handleAddGoal = () => {
    if (goalName && goalAmount > 0 && currentAmount >= 0 && goalDeadline) {
      const newGoal = {
        name: goalName,
        goalAmount,
        currentAmount,
        deadline: goalDeadline,
        id: Date.now(),
      };
      setGoals([...goals, newGoal]);
      resetForm();
    }
  };

  const handleDeleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const resetForm = () => {
    setGoalName("");
    setGoalAmount();
    setCurrentAmount();
    setGoalDeadline("");
  };

  const calculateProgress = (goalAmount, currentAmount) => {
    return (currentAmount / goalAmount) * 100;
  };

  return (
    <div className="bg-[#2E3A59] min-h-screen text-white p-6">
      {/* Side Navigation */}
      <nav className="w-64 bg-[#1F2A3A] fixed inset-0 top-0 left-0 h-full py-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-white">Savings Goal</h2>
        </div>
        <ul className="space-y-4">
          <li><Button onClick={() => navigate("/dashboard")} className="text-white flex items-center gap-2"><FaDollarSign /> Dashboard</Button></li>
          <li><Button onClick={() => navigate("/savingsLock")} className="text-white flex items-center gap-2"><FaCalendarAlt /> Savings Lock</Button></li>
          <li><Button onClick={() => navigate("/settings")} className="text-white flex items-center gap-2"><FaClock /> Settings</Button></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="ml-64 p-6">
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
                  onChange={(e) => setGoalAmount((e.target.value))}
                  className="w-full mt-4 p-2 text-black rounded"
                  placeholder="Target Amount"
                />
                <input
                  type="number"
                  value={currentAmount}
                  onChange={(e) => setCurrentAmount((e.target.value))}
                  className="w-full mt-4 p-2  text-black rounded"
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
                <Card key={goal.id} className="p-4 flex justify-between items-center bg-[#1F2A3A]">
                  <div className="flex flex-col">
                    <h4 className="text-lg font-semibold">{goal.name}</h4>
                    <p className="text-sm text-gray-300">Target: Tsh {goal.goalAmount}</p>
                    <p className="text-sm text-gray-300">Current: Tsh {goal.currentAmount}</p>
                    <p className="text-sm text-gray-300">Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
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
                    <Button
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="mt-4 text-red-500 hover:bg-transparent"
                    >
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
