import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent } from "../../components/ui";
import { FaTachometerAlt, FaLock, FaCog, FaCheckCircle, FaClock } from "react-icons/fa";

const SavingsLock = () => {
  const [lockAmount, setLockAmount] = useState(0);
  const [lockDuration, setLockDuration] = useState(0);
  const [lockUnit, setLockUnit] = useState("weeks");
  const [timer, setTimer] = useState(0);
  const [locked, setLocked] = useState(false);
  const [goalReached, setGoalReached] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  // Load lock data from localStorage when component mounts
  useEffect(() => {
    const savedLockData = localStorage.getItem('savingsLockData');
    if (savedLockData) {
      const data = JSON.parse(savedLockData);
      setLockAmount(data.lockAmount);
      setLocked(data.locked);
      setStartDate(data.startDate);
      setStartTime(data.startTime);
      setEndTime(data.endTime);
      setGoalReached(Date.now() >= data.endTime);
    }
  }, []);

  const handleLockSavings = () => {
    const now = Date.now();
    const durationInMs =
      lockUnit === "weeks"
        ? lockDuration * 7 * 24 * 60 * 60 * 1000
        : lockDuration * 30 * 24 * 60 * 60 * 1000;
    const end = now + durationInMs;

    const lockData = {
      lockAmount,
      locked: true,
      startDate: new Date(now).toLocaleString(),
      startTime: now,
      endTime: end,
    };

    // Save to localStorage
    localStorage.setItem('savingsLockData', JSON.stringify(lockData));

    setStartDate(lockData.startDate);
    setStartTime(lockData.startTime);
    setEndTime(lockData.endTime);
    setTimer(durationInMs);
    setLocked(true);
    setGoalReached(false);
  };

  useEffect(() => {
    if (locked) {
      const interval = setInterval(() => {
        const now = Date.now();
        const remaining = endTime - now;

        if (remaining <= 0) {
          clearInterval(interval);
          setTimer(0);
          setGoalReached(true);
          // Clear localStorage when lock period is complete
          localStorage.removeItem('savingsLockData');
        } else {
          setTimer(remaining);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [locked, endTime]);

  const formatRemainingTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000) % 60;
    const minutes = Math.floor(milliseconds / (1000 * 60)) % 60;
    const hours = Math.floor(milliseconds / (1000 * 60 * 60)) % 24;
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="bg-[#2E3A59] min-h-screen text-white p-4 md:p-6">
      {/* Sidebar */}
      <nav className="w-16 md:w-64 bg-[#1F2A3A] fixed inset-0 top-0 left-0 h-full py-6 transition-all duration-300">
        <div className="text-center mb-8 hidden md:block">
          <h2 className="text-2xl font-semibold text-white">Savings Lock</h2>
        </div>
        <ul className="space-y-4 flex flex-col items-center md:items-start">
          <li>
            <Button onClick={() => navigate("/dashboard")} className="text-white flex items-center justify-center md:justify-start gap-0 md:gap-2">
              <FaTachometerAlt />
              <span className="hidden md:inline">Dashboard</span>
            </Button>
          </li>
          <li>
            <Button onClick={() => navigate("/savingsLock")} className="text-white flex items-center justify-center md:justify-start gap-0 md:gap-2">
              <FaLock />
              <span className="hidden md:inline">Savings Lock</span>
            </Button>
          </li>
          <li>
            <Button onClick={() => navigate("/settings")} className="text-white flex items-center justify-center md:justify-start gap-0 md:gap-2">
              <FaCog />
              <span className="hidden md:inline">Settings</span>
            </Button>
          </li>
        </ul>
      </nav>

      {/* Main content */}
      <div className="ml-16 md:ml-64 pt-6 px-4 sm:px-6">
        <section className="text-center my-6">
          <h2 className="text-2xl font-semibold">Lock Your Savings</h2>
          <p className="text-lg mt-2">Secure your money and watch your savings grow.</p>
        </section>

        {/* Lock form */}
        <section className="mt-6 flex justify-center px-2">
          <Card className="w-full max-w-sm">
            <CardContent>
              <div className="text-center">
                <h3 className="text-lg font-semibold">Enter Amount to Lock</h3>
                <input
                  type="number"
                  value={lockAmount}
                  onChange={(e) => setLockAmount(Number(e.target.value))}
                  className="w-full mt-4 p-2 text-black rounded"
                  placeholder="Enter amount"
                />
                <h3 className="text-lg font-semibold mt-6">Select Lock Duration</h3>
                <div className="flex flex-col sm:flex-row justify-center items-center">
                  <input
                    type="number"
                    value={lockDuration}
                    onChange={(e) => setLockDuration(Number(e.target.value))}
                    className="w-full sm:w-1/4 mt-4 p-2 text-black rounded"
                    placeholder="Duration"
                  />
                  <select
                    value={lockUnit}
                    onChange={(e) => setLockUnit(e.target.value)}
                    className="w-full sm:w-auto mt-2 sm:mt-4 sm:ml-4 p-2 text-black rounded"
                  >
                    <option value="weeks">Weeks</option>
                    <option value="months">Months</option>
                  </select>
                </div>
                <Button
                  onClick={handleLockSavings}
                  className="mt-4 w-full bg-[#FF5733]"
                  disabled={lockAmount <= 0 || lockDuration <= 0 || locked}
                >
                  Lock Savings
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Timer */}
        {locked && (
          <section className="mt-8 px-2">
            <Card>
              <CardContent>
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-4">Savings Lock Progress</h3>
                  <div className="relative w-full h-4 bg-gray-300 rounded-full mb-6">
                    <div
                      className="h-full bg-[#2ECC71] rounded-full"
                      style={{ width: `${(100 - (timer / (endTime - startTime) * 100))}%` }}
                    ></div>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between text-sm sm:text-base">
                    <span>Locked Amount: Tsh {lockAmount}</span>
                    <span>{formatRemainingTime(timer)}</span>
                  </div>
                  <div className="mt-4">
                    {goalReached ? (
                      <div className="flex justify-center items-center text-lg font-semibold text-green-500">
                        <FaCheckCircle className="mr-2" />
                        <p>Your savings lock is complete!</p>
                      </div>
                    ) : (
                      <div className="flex justify-center items-center text-lg font-semibold text-yellow-500">
                        <FaClock className="mr-2" />
                        <p>Lock in progress...</p>
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <p>Start Date: {startDate}</p>
                    <p>End Date: {new Date(endTime).toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Footer */}
        <section className="mt-6 text-center text-sm text-gray-300 px-2">
          <p>&copy; 2025 Campus Coin. All rights reserved.</p>
        </section>
      </div>
    </div>
  );
};

export default SavingsLock;
