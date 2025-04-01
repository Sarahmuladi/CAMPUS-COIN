import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../../components/ui";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Progress } from "@/components/ui/progress";
import axios from "axios"; 

const ProgressTracking = () => {
  const [savingsData, setSavingsData] = useState([]);
  const [goalProgress, setGoalProgress] = useState(0);
  const [milestones, setMilestones] = useState([]);

  // Fetch savings data, goal progress, and milestones from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch savings data, goal progress, and milestones
        const response = await axios.get("/api/savings-progress");
        if (response.status === 200) {
          setSavingsData(response.data.savingsData);
          setGoalProgress(response.data.goalProgress);
          setMilestones(response.data.milestones || []); 
        } else {
          console.error("Failed to fetch savings progress data");
        }
      } catch (error) {
        console.error("Error fetching savings progress data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-[#2E3A59] min-h-screen text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Progress Tracking</h1>

      {/* Savings Growth Chart */}
      <Card className="mb-6">
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Savings Growth Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={savingsData}>
              <XAxis dataKey="month" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#2ECC71" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Progress Bar */}
      <Card className="mb-6">
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Savings Goal Completion</h3>
          <p className="text-sm">You have achieved {goalProgress}% of your savings goal!</p>
          <Progress value={goalProgress} className="h-4 bg-[#FF5733] mt-3" />
        </CardContent>
      </Card>

      {/* Milestone Achievements */}
      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Milestone Achievements</h3>
          {/* Check if milestones is an array before rendering */}
          <ul className="list-disc pl-5 text-sm">
            {milestones.length > 0 ? (
              milestones.map((milestone, index) => (
                <li key={index}>{milestone}</li>
              ))
            ) : (
              <li>No milestones yet.</li> 
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressTracking;

