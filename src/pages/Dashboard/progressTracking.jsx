import React from "react";
import { Card, CardContent } from "../../components/ui";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Progress } from "@/components/ui/progress";

const savingsData = [
  { month: "Jan", amount: 50000 },
  { month: "Feb", amount: 120000 },
  { month: "Mar", amount: 200000 },
  { month: "Apr", amount: 350000 },
  { month: "May", amount: 500000 },
];

const ProgressTracking = () => {
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
          <p className="text-sm">You have achieved 70% of your savings goal!</p>
          <Progress value={70} className="h-4 bg-[#FF5733] mt-3" />
        </CardContent>
      </Card>

      {/* Milestone Achievements */}
      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Milestone Achievements</h3>
          <ul className="list-disc pl-5 text-sm">
            <li>🎉 Reached Tsh 100,000 in February</li>
            <li>🚀 Saved 50% of goal by April</li>
            <li>🏆 On track to reach target by June</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressTracking;
