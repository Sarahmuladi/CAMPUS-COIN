import React, { useState, useEffect } from "react";
import { FaLock, FaMoneyBillWave, FaClock, FaCheckCircle } from "react-icons/fa";
import { Button, Card, CardContent } from "../../components/ui";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; 

const SavingsLock = () => {
  const [lockAmount, setLockAmount] = useState();
  const [locked, setLocked] = useState(false);
  const [timer, setTimer] = useState(0);
  const [goalReached, setGoalReached] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [lockDuration, setLockDuration] = useState(1); 
  const [lockUnit, setLockUnit] = useState("weeks"); 
  const [startDate, setStartDate] = useState(null);

  const navigate = useNavigate();

  const handleLockSavings = async () => {
    if (lockAmount > 0 && lockDuration > 0) {
      const durationInMilliseconds = lockUnit === "weeks" 
        ? lockDuration * 7 * 24 * 60 * 60 * 1000 // Convert weeks to milliseconds
        : lockDuration * 30 * 24 * 60 * 60 * 1000; // Convert months to milliseconds

      const calculatedEndTime = new Date().getTime() + durationInMilliseconds;
      setLocked(true);
      setStartTime(Date.now());
      setEndTime(calculatedEndTime);
      setStartDate(new Date().toLocaleString());
      startCountdown(durationInMilliseconds);

      // Save the lock data to the backend 
      try {

        const lockUntil = new Date(calculatedEndTime).toLocaleString();
        const body = {
          amount: lockAmount,
          lockDuration,
          lockUnit,
          startTime: Date.now(),
          lockUntil,
          
        };


         const response = await axios.post('https://campus-coin-backend.onrender.com/api/lockedSavings/create', body);

         if (response.status === 200) {
           console.log('Savings lock data saved successfully!');
         } else {
           console.error('Failed to save savings lock data');
         }
      } catch (error) {
        console.error('Error saving savings lock data:', error);
      }
    }
  };

  const startCountdown = (duration) => {
    const interval = setInterval(() => {
      const remainingTime = Math.max(0, Date.now() - endTime );
      //console.log(remainingTime);
      setTimer(remainingTime);
      if (remainingTime === 0) {
        clearInterval(interval);
        setGoalReached(true);

        // Update backend about completion 
        axios.post('https://campus-coin-backend.onrender.com/api/lockedSavings/complete', { lockedUntil: Date.now() })
          .then(response => console.log('Savings lock completed in backend'))
          .catch(error => console.error('Error updating backend completion:', error));
      }
    }, 1000);
  };

  useEffect(() => {
    if (goalReached) {
      alert("Congratulations! Your savings lock period is complete.");
    }
  }, [goalReached]);

  const formatRemainingTime = (remaining) => {
    const seconds = Math.floor((remaining / 1000) % 60);
    const minutes = Math.floor((remaining / 1000 / 60) % 60);
    const hours = Math.floor((remaining / 1000 / 3600) % 24);
    const days = Math.floor(remaining / (1000 * 3600 * 24));
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="bg-[#2E3A59] min-h-screen text-white p-6">
      {/* Side Navigation */}
      <nav className="w-64 bg-[#1F2A3A] fixed inset-0 top-0 left-0 h-full py-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-white">Savings Lock</h2>
        </div>
        <ul className="space-y-4">
          <li><Button onClick={() => navigate("/dashboard")} className="text-white flex items-center gap-2"><FaMoneyBillWave /> Dashboard</Button></li>
          <li><Button onClick={() => navigate("/savingsLock")} className="text-white flex items-center gap-2"><FaLock /> Savings Lock</Button></li>
          <li><Button onClick={() => navigate("/settings")} className="text-white flex items-center gap-2"><FaClock /> Settings</Button></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="ml-64 p-6">
        <section className="text-center my-6">
          <h2 className="text-2xl font-semibold">Lock Your Savings</h2>
          <p className="text-lg mt-2">Secure your money and watch your savings grow.</p>
        </section>

        {/* Lock Savings Amount */}
        <section className="mt-6 flex justify-center">
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
                <div className="flex justify-center items-center">
                  <input
                    type="number"
                    value={lockDuration}
                    onChange={(e) => setLockDuration(Number(e.target.value))}
                    className="w-1/4 mt-4 p-2 text-black rounded"
                    placeholder="Duration"
                  />
                  <select
                    value={lockUnit}
                    onChange={(e) => setLockUnit(e.target.value)}
                    className="ml-4 p-2 text-black rounded"
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

        {/* Timer & Progress Bar */}
        {locked && (
          <section className="mt-8">
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
                  <div className="flex justify-between">
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
        <section className="mt-6 text-center text-sm text-gray-300">
          <p>&copy; 2025 Campus Coin. All rights reserved.</p>
        </section>
      </div>
    </div>
  );
};

export default SavingsLock;

